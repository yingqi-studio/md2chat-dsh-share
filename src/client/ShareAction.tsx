/**
 * The Share entry in an assistant reply's action strip, and its dialog.
 *
 * A target is not a single fixed clipboard format anymore: WeChat / WeCom run
 * the delivery policy (text / ordered segments / long image), Email copies
 * editable HTML, and Word asks the Host half for a .docx built by the skill.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IconShareOutlineRegular, Modal, Toast, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import {
  chooseMode,
  convert,
  copyChatRich,
  copyLongImage,
  copyMode,
  copyRich,
  copyPlainText,
  copySegment,
  makeWord,
  TARGETS,
  type Delivery,
  type Payload,
  type PluginTarget,
} from './convert.ts'
import type { ShareKey } from './locales.ts'

type Translate = (key: ShareKey, params?: Record<string, unknown>) => string

/** Injected face of the assistant-actions entry. */
export interface ShareInjected {
  /** Markdown of the reply's final assistant message, read on click. */
  getMarkdown: (messageId: string) => string
}

export type ShareActionProps = { messageId: string; t: Translate } & ShareInjected

type Conversion =
  | { kind: 'converting' }
  | { kind: 'ready'; payload: Payload }
  | { kind: 'failed'; message: string }

const errorMessage = (error: unknown) => (error instanceof Error ? error.message : String(error))

export function ShareAction({ messageId, getMarkdown, t }: ShareActionProps) {
  const [source, setSource] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const open = useCallback(() => { setSource(getMarkdown(messageId)) }, [getMarkdown, messageId])
  const close = useCallback(() => { setSource(null) }, [])
  const copied = useCallback((text: string) => { setSource(null); setToast(text) }, [])

  return (
    <>
      <Tooltip label={t('action.share')} side="bottom">
        <button type="button" className="md2chat-share-action" aria-label={t('action.share')} onClick={open}>
          <IconShareOutlineRegular />
        </button>
      </Tooltip>
      {source !== null && <ShareDialog source={source} t={t} onClose={close} onCopied={copied} />}
      {toast !== null && <Toast text={toast} tone="success" holdMs={4000} onDone={() => { setToast(null) }} />}
    </>
  )
}

function ShareDialog({ source, t, onClose, onCopied }: {
  source: string
  t: Translate
  onClose: () => void
  onCopied: (toast: string) => void
}) {
  const empty = source.trim() === ''
  const conversion = useMemo(() => (empty ? null : convert(source)), [empty, source])
  const [state, setState] = useState<Conversion>({ kind: 'converting' })
  const [copyError, setCopyError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [delivery, setDelivery] = useState<Delivery | null>(null)
  const [segments, setSegments] = useState<Payload['segments'] | null>(null)
  const [copiedSteps, setCopiedSteps] = useState<number[]>([])
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    if (conversion === null) return
    let alive = true
    conversion.then(
      (payload) => { if (alive) setState({ kind: 'ready', payload }) },
      (error: unknown) => { if (alive) setState({ kind: 'failed', message: errorMessage(error) }) },
    )
    return () => { alive = false }
  }, [conversion])

  const fail = useCallback((error: unknown) => {
    setBusy(false)
    setCopyError(errorMessage(error))
  }, [])

  const choose = useCallback((target: PluginTarget) => {
    if (conversion === null || busy) return
    setCopyError(null)
    setNotice(null)
    const label = t(`target.${target}`)

    if (target === 'image') {
      setBusy(true)
      copyLongImage(conversion).then(() => { onCopied(t('toast.image', { target: t('target.image') })) }, fail)
      return
    }
    if (target === 'word') {
      setBusy(true)
      makeWord(source).then(result => { onCopied(result.message) }, fail)
      return
    }
    if (target === 'email') {
      setBusy(true)
      copyRich(conversion).then(() => { onCopied(t('toast.email')) }, fail)
      return
    }

    // WeChat / WeCom: pick text, segments or a long image from the payload shape.
    // Use the already-finished payload when possible so the clipboard write still
    // runs inside the click's user activation.
    setBusy(true)
    if (state.kind === 'ready') {
      const decision = chooseMode(state.payload, target)
      setDelivery(decision)
      if (decision.mode === 'image') {
        copyLongImage(Promise.resolve(state.payload)).then(() => { onCopied(t('toast.image', { target: label })) }, fail)
      } else if (decision.mode === 'text') {
        setSegments(null)
        copyPlainText(Promise.resolve(state.payload)).then(() => { onCopied(t('toast.text', { target: label })) }, fail)
      } else if (target === 'wechat') {
        // WeChat keeps text+image layout from HTML: copy everything at once.
        copyChatRich(Promise.resolve(state.payload)).then(() => { onCopied(t('toast.wechatMixed')) }, fail)
      } else {
        setSegments(state.payload.segments)
        setBusy(false)
        setNotice(t('segments.ready', { total: state.payload.segments.length }))
      }
      return
    }
    conversion.then((payload) => {
      const decision = chooseMode(payload, target)
      setDelivery(decision)
      if (decision.mode === 'image') {
        copyLongImage(conversion).then(() => { onCopied(t('toast.image', { target: label })) }, fail)
        return
      }
      if (decision.mode === 'text') {
        setSegments(null)
        copyPlainText(conversion).then(() => { onCopied(t('toast.text', { target: label })) }, fail)
        return
      }
      if (target === 'wechat') {
        copyChatRich(conversion).then(() => { onCopied(t('toast.wechatMixed')) }, fail)
        return
      }
      setSegments(payload.segments)
      setBusy(false)
      setNotice(t('segments.ready', { total: payload.segments.length }))
    }, fail)
  }, [busy, conversion, fail, onCopied, source, state, t])

  const copyStep = useCallback((index: number) => {
    const segment = segments?.[index]
    if (!segment) return
    setCopyError(null)
    copySegment(segment).then(() => {
      setCopiedSteps(previous => (previous.includes(index) ? previous : [...previous, index]))
      setNotice(t('segments.step', { index: index + 1, total: segments.length }))
    }, fail)
  }, [fail, segments, t])

  const status = empty
    ? { text: t('status.empty'), error: true }
    : state.kind === 'converting'
      ? { text: t('status.converting'), error: false }
      : state.kind === 'failed'
        ? { text: t('status.failed', { message: state.message }), error: true }
        : busy
          ? { text: t('status.copying'), error: false }
          : {
              text: t('status.ready', {
                images: state.payload.imageCount,
                tables: state.payload.tableImages,
                code: state.payload.codeImages,
                math: state.payload.mathImages,
                mermaid: state.payload.mermaidImages,
                original: state.payload.originalImages,
              }),
              error: false,
            }

  return (
    <Modal open onClose={onClose} title={t('dialog.title')} closeLabel={t('dialog.close')} description={t('dialog.hint')} className="md2chat-share-dialog">
      <p className="md2chat-share-status" role="status" data-error={status.error || undefined}>{status.text}</p>
      {delivery !== null && <p className="md2chat-share-status" role="note">{delivery.reason}</p>}
      {notice !== null && <p className="md2chat-share-notice" role="status">{notice}</p>}
      {copyError !== null && (
        <p className="md2chat-share-status" role="alert" data-error>{t('status.copyFailed', { message: copyError })}</p>
      )}
      {state.kind === 'ready' && segments === null && (
        // md2chat's preview: escaped text runs and data-URL images only, never raw Markdown HTML.
        <div className="md2chat-share-preview" dangerouslySetInnerHTML={{ __html: state.payload.preview }} />
      )}
      {segments === null ? (
        <div className="md2chat-share-targets">
          {TARGETS.map(target => (
            <button
              key={target}
              type="button"
              className="md2chat-share-target"
              disabled={empty || busy || state.kind === 'failed'}
              title={t(`mode.${copyMode(target)}`)}
              onClick={() => { choose(target) }}
            >
              {t(`target.${target}`)}
            </button>
          ))}
        </div>
      ) : (
        <div className="md2chat-share-segments">
          <ol className="md2chat-share-segment-list">
            {segments.map((segment, index) => {
              const done = copiedSteps.includes(index)
              const preview = segment.type === 'text' ? segment.text.replace(/\s+/g, ' ').trim().slice(0, 42) : ''
              return (
                <li key={index} className="md2chat-share-segment" data-done={done || undefined}>
                  <span className="md2chat-share-segment-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="md2chat-share-segment-kind">
                    {segment.type === 'text' ? t('segments.text') : t('segments.image')}
                  </span>
                  <span className="md2chat-share-segment-preview">{preview || t('segments.imageHint')}</span>
                  <button type="button" className="md2chat-share-segment-copy" onClick={() => { copyStep(index) }}>
                    {done ? t('segments.again') : t('segments.copy')}
                  </button>
                </li>
              )
            })}
          </ol>
          <div className="md2chat-share-segment-actions">
            <button type="button" className="md2chat-share-secondary" onClick={() => {
              if (conversion === null) return
              setBusy(true)
              copyLongImage(conversion).then(() => { onCopied(t('toast.image', { target: t('target.wechat') })) }, fail)
            }}>{t('segments.asImage')}</button>
            <button type="button" className="md2chat-share-secondary" onClick={onClose}>{t('segments.done')}</button>
          </div>
        </div>
      )}
    </Modal>
  )
}
