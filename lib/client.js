window.__ModuleLoader__.load({ id: "md2chat-dsh-share", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// vendor/md2chat/vendor/marked.js
var require_marked = __commonJS({
  "vendor/md2chat/vendor/marked.js"(exports, module2) {
    "use strict";
    (function(g, f) {
      if (typeof exports == "object" && typeof module2 < "u") {
        module2.exports = f();
      } else if ("function" == typeof define && define.amd) {
        define("marked", f);
      } else {
        g["marked"] = f();
      }
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : exports, function() {
      var exports2 = {};
      var __exports = exports2;
      var module3 = { exports: exports2 };
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export2 = (target, all) => {
        for (var name2 in all)
          __defProp2(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var marked_exports = {};
      __export2(marked_exports, {
        Hooks: () => _Hooks,
        Lexer: () => _Lexer,
        Marked: () => Marked,
        Parser: () => _Parser,
        Renderer: () => _Renderer,
        TextRenderer: () => _TextRenderer,
        Tokenizer: () => _Tokenizer,
        defaults: () => _defaults,
        getDefaults: () => _getDefaults,
        lexer: () => lexer,
        marked: () => marked,
        options: () => options,
        parse: () => parse,
        parseInline: () => parseInline,
        parser: () => parser,
        setOptions: () => setOptions,
        use: () => use,
        walkTokens: () => walkTokens
      });
      module3.exports = __toCommonJS2(marked_exports);
      function _getDefaults() {
        return {
          async: false,
          breaks: false,
          extensions: null,
          gfm: true,
          hooks: null,
          pedantic: false,
          renderer: null,
          silent: false,
          tokenizer: null,
          walkTokens: null
        };
      }
      var _defaults = _getDefaults();
      function changeDefaults(newDefaults) {
        _defaults = newDefaults;
      }
      var noopTest = { exec: () => null };
      function edit(regex, opt = "") {
        let source = typeof regex === "string" ? regex : regex.source;
        const obj = {
          replace: (name2, val) => {
            let valSource = typeof val === "string" ? val : val.source;
            valSource = valSource.replace(other.caret, "$1");
            source = source.replace(name2, valSource);
            return obj;
          },
          getRegex: () => {
            return new RegExp(source, opt);
          }
        };
        return obj;
      }
      var other = {
        codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
        outputLinkReplace: /\\([\[\]])/g,
        indentCodeCompensation: /^(\s+)(?:```)/,
        beginningSpace: /^\s+/,
        endingHash: /#$/,
        startingSpaceChar: /^ /,
        endingSpaceChar: / $/,
        nonSpaceChar: /[^ ]/,
        newLineCharGlobal: /\n/g,
        tabCharGlobal: /\t/g,
        multipleSpaceGlobal: /\s+/g,
        blankLine: /^[ \t]*$/,
        doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
        blockquoteStart: /^ {0,3}>/,
        blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
        blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
        listReplaceTabs: /^\t+/,
        listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
        listIsTask: /^\[[ xX]\] /,
        listReplaceTask: /^\[[ xX]\] +/,
        anyLine: /\n.*\n/,
        hrefBrackets: /^<(.*)>$/,
        tableDelimiter: /[:|]/,
        tableAlignChars: /^\||\| *$/g,
        tableRowBlankLine: /\n[ \t]*$/,
        tableAlignRight: /^ *-+: *$/,
        tableAlignCenter: /^ *:-+: *$/,
        tableAlignLeft: /^ *:-+ *$/,
        startATag: /^<a /i,
        endATag: /^<\/a>/i,
        startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
        endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
        startAngleBracket: /^</,
        endAngleBracket: />$/,
        pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
        unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
        escapeTest: /[&<>"']/,
        escapeReplace: /[&<>"']/g,
        escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
        unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
        caret: /(^|[^\[])\^/g,
        percentDecode: /%25/g,
        findPipe: /\|/g,
        splitPipe: / \|/,
        slashPipe: /\\\|/g,
        carriageReturn: /\r\n|\r/g,
        spaceLine: /^ +$/gm,
        notSpaceStart: /^\S*/,
        endingNewline: /\n$/,
        listItemRegex: (bull) => new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`),
        nextBulletRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
        hrRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
        fencesBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
        headingBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
        htmlBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, "i")
      };
      var newline = /^(?:[ \t]*(?:\n|$))+/;
      var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
      var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
      var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
      var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
      var bullet = /(?:[*+-]|\d{1,9}[.)])/;
      var lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
      var lheading = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
      var lheadingGfm = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
      var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
      var blockText = /^[^\n]+/;
      var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
      var def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
      var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
      var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
      var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
      var html = edit(
        "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
        "i"
      ).replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
      var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
      var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
      var blockNormal = {
        blockquote,
        code: blockCode,
        def,
        fences,
        heading,
        hr,
        html,
        lheading,
        list,
        newline,
        paragraph,
        table: noopTest,
        text: blockText
      };
      var gfmTable = edit(
        "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
      ).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
      var blockGfm = {
        ...blockNormal,
        lheading: lheadingGfm,
        table: gfmTable,
        paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
      };
      var blockPedantic = {
        ...blockNormal,
        html: edit(
          `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
        ).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: noopTest,
        // fences not supported
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
      };
      var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
      var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
      var br = /^( {2,}|\\)\n(?!\s*$)/;
      var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
      var _punctuation = /[\p{P}\p{S}]/u;
      var _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
      var _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
      var punctuation = edit(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, _punctuationOrSpace).getRegex();
      var _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
      var _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
      var _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
      var blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
      var emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
      var emStrongLDelim = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuation).getRegex();
      var emStrongLDelimGfm = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuationGfmStrongEm).getRegex();
      var emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
      var emStrongRDelimAst = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
      var emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
      var emStrongRDelimUnd = edit(
        "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
        "gu"
      ).replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
      var anyPunctuation = edit(/\\(punct)/, "gu").replace(/punct/g, _punctuation).getRegex();
      var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
      var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
      var tag = edit(
        "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
      ).replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
      var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
      var link = edit(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
      var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
      var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
      var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
      var inlineNormal = {
        _backpedal: noopTest,
        // only used for GFM url
        anyPunctuation,
        autolink,
        blockSkip,
        br,
        code: inlineCode,
        del: noopTest,
        emStrongLDelim,
        emStrongRDelimAst,
        emStrongRDelimUnd,
        escape,
        link,
        nolink,
        punctuation,
        reflink,
        reflinkSearch,
        tag,
        text: inlineText,
        url: noopTest
      };
      var inlinePedantic = {
        ...inlineNormal,
        link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
        reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
      };
      var inlineGfm = {
        ...inlineNormal,
        emStrongRDelimAst: emStrongRDelimAstGfm,
        emStrongLDelim: emStrongLDelimGfm,
        url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
      };
      var inlineBreaks = {
        ...inlineGfm,
        br: edit(br).replace("{2,}", "*").getRegex(),
        text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
      };
      var block = {
        normal: blockNormal,
        gfm: blockGfm,
        pedantic: blockPedantic
      };
      var inline = {
        normal: inlineNormal,
        gfm: inlineGfm,
        breaks: inlineBreaks,
        pedantic: inlinePedantic
      };
      var escapeReplacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var getEscapeReplacement = (ch) => escapeReplacements[ch];
      function escape2(html2, encode) {
        if (encode) {
          if (other.escapeTest.test(html2)) {
            return html2.replace(other.escapeReplace, getEscapeReplacement);
          }
        } else {
          if (other.escapeTestNoEncode.test(html2)) {
            return html2.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
          }
        }
        return html2;
      }
      function cleanUrl(href) {
        try {
          href = encodeURI(href).replace(other.percentDecode, "%");
        } catch {
          return null;
        }
        return href;
      }
      function splitCells(tableRow, count) {
        const row = tableRow.replace(other.findPipe, (match, offset, str) => {
          let escaped = false;
          let curr = offset;
          while (--curr >= 0 && str[curr] === "\\") escaped = !escaped;
          if (escaped) {
            return "|";
          } else {
            return " |";
          }
        }), cells = row.split(other.splitPipe);
        let i = 0;
        if (!cells[0].trim()) {
          cells.shift();
        }
        if (cells.length > 0 && !cells.at(-1)?.trim()) {
          cells.pop();
        }
        if (count) {
          if (cells.length > count) {
            cells.splice(count);
          } else {
            while (cells.length < count) cells.push("");
          }
        }
        for (; i < cells.length; i++) {
          cells[i] = cells[i].trim().replace(other.slashPipe, "|");
        }
        return cells;
      }
      function rtrim(str, c, invert) {
        const l = str.length;
        if (l === 0) {
          return "";
        }
        let suffLen = 0;
        while (suffLen < l) {
          const currChar = str.charAt(l - suffLen - 1);
          if (currChar === c && !invert) {
            suffLen++;
          } else if (currChar !== c && invert) {
            suffLen++;
          } else {
            break;
          }
        }
        return str.slice(0, l - suffLen);
      }
      function findClosingBracket(str, b) {
        if (str.indexOf(b[1]) === -1) {
          return -1;
        }
        let level = 0;
        for (let i = 0; i < str.length; i++) {
          if (str[i] === "\\") {
            i++;
          } else if (str[i] === b[0]) {
            level++;
          } else if (str[i] === b[1]) {
            level--;
            if (level < 0) {
              return i;
            }
          }
        }
        if (level > 0) {
          return -2;
        }
        return -1;
      }
      function outputLink(cap, link2, raw, lexer2, rules) {
        const href = link2.href;
        const title = link2.title || null;
        const text = cap[1].replace(rules.other.outputLinkReplace, "$1");
        lexer2.state.inLink = true;
        const token = {
          type: cap[0].charAt(0) === "!" ? "image" : "link",
          raw,
          href,
          title,
          text,
          tokens: lexer2.inlineTokens(text)
        };
        lexer2.state.inLink = false;
        return token;
      }
      function indentCodeCompensation(raw, text, rules) {
        const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
        if (matchIndentToCode === null) {
          return text;
        }
        const indentToCode = matchIndentToCode[1];
        return text.split("\n").map((node) => {
          const matchIndentInNode = node.match(rules.other.beginningSpace);
          if (matchIndentInNode === null) {
            return node;
          }
          const [indentInNode] = matchIndentInNode;
          if (indentInNode.length >= indentToCode.length) {
            return node.slice(indentToCode.length);
          }
          return node;
        }).join("\n");
      }
      var _Tokenizer = class {
        options;
        rules;
        // set by the lexer
        lexer;
        // set by the lexer
        constructor(options2) {
          this.options = options2 || _defaults;
        }
        space(src) {
          const cap = this.rules.block.newline.exec(src);
          if (cap && cap[0].length > 0) {
            return {
              type: "space",
              raw: cap[0]
            };
          }
        }
        code(src) {
          const cap = this.rules.block.code.exec(src);
          if (cap) {
            const text = cap[0].replace(this.rules.other.codeRemoveIndent, "");
            return {
              type: "code",
              raw: cap[0],
              codeBlockStyle: "indented",
              text: !this.options.pedantic ? rtrim(text, "\n") : text
            };
          }
        }
        fences(src) {
          const cap = this.rules.block.fences.exec(src);
          if (cap) {
            const raw = cap[0];
            const text = indentCodeCompensation(raw, cap[3] || "", this.rules);
            return {
              type: "code",
              raw,
              lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
              text
            };
          }
        }
        heading(src) {
          const cap = this.rules.block.heading.exec(src);
          if (cap) {
            let text = cap[2].trim();
            if (this.rules.other.endingHash.test(text)) {
              const trimmed = rtrim(text, "#");
              if (this.options.pedantic) {
                text = trimmed.trim();
              } else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) {
                text = trimmed.trim();
              }
            }
            return {
              type: "heading",
              raw: cap[0],
              depth: cap[1].length,
              text,
              tokens: this.lexer.inline(text)
            };
          }
        }
        hr(src) {
          const cap = this.rules.block.hr.exec(src);
          if (cap) {
            return {
              type: "hr",
              raw: rtrim(cap[0], "\n")
            };
          }
        }
        blockquote(src) {
          const cap = this.rules.block.blockquote.exec(src);
          if (cap) {
            let lines = rtrim(cap[0], "\n").split("\n");
            let raw = "";
            let text = "";
            const tokens = [];
            while (lines.length > 0) {
              let inBlockquote = false;
              const currentLines = [];
              let i;
              for (i = 0; i < lines.length; i++) {
                if (this.rules.other.blockquoteStart.test(lines[i])) {
                  currentLines.push(lines[i]);
                  inBlockquote = true;
                } else if (!inBlockquote) {
                  currentLines.push(lines[i]);
                } else {
                  break;
                }
              }
              lines = lines.slice(i);
              const currentRaw = currentLines.join("\n");
              const currentText = currentRaw.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
              raw = raw ? `${raw}
${currentRaw}` : currentRaw;
              text = text ? `${text}
${currentText}` : currentText;
              const top = this.lexer.state.top;
              this.lexer.state.top = true;
              this.lexer.blockTokens(currentText, tokens, true);
              this.lexer.state.top = top;
              if (lines.length === 0) {
                break;
              }
              const lastToken = tokens.at(-1);
              if (lastToken?.type === "code") {
                break;
              } else if (lastToken?.type === "blockquote") {
                const oldToken = lastToken;
                const newText = oldToken.raw + "\n" + lines.join("\n");
                const newToken = this.blockquote(newText);
                tokens[tokens.length - 1] = newToken;
                raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
                text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
                break;
              } else if (lastToken?.type === "list") {
                const oldToken = lastToken;
                const newText = oldToken.raw + "\n" + lines.join("\n");
                const newToken = this.list(newText);
                tokens[tokens.length - 1] = newToken;
                raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
                text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
                lines = newText.substring(tokens.at(-1).raw.length).split("\n");
                continue;
              }
            }
            return {
              type: "blockquote",
              raw,
              tokens,
              text
            };
          }
        }
        list(src) {
          let cap = this.rules.block.list.exec(src);
          if (cap) {
            let bull = cap[1].trim();
            const isordered = bull.length > 1;
            const list2 = {
              type: "list",
              raw: "",
              ordered: isordered,
              start: isordered ? +bull.slice(0, -1) : "",
              loose: false,
              items: []
            };
            bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
            if (this.options.pedantic) {
              bull = isordered ? bull : "[*+-]";
            }
            const itemRegex = this.rules.other.listItemRegex(bull);
            let endsWithBlankLine = false;
            while (src) {
              let endEarly = false;
              let raw = "";
              let itemContents = "";
              if (!(cap = itemRegex.exec(src))) {
                break;
              }
              if (this.rules.block.hr.test(src)) {
                break;
              }
              raw = cap[0];
              src = src.substring(raw.length);
              let line = cap[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, (t) => " ".repeat(3 * t.length));
              let nextLine = src.split("\n", 1)[0];
              let blankLine = !line.trim();
              let indent = 0;
              if (this.options.pedantic) {
                indent = 2;
                itemContents = line.trimStart();
              } else if (blankLine) {
                indent = cap[1].length + 1;
              } else {
                indent = cap[2].search(this.rules.other.nonSpaceChar);
                indent = indent > 4 ? 1 : indent;
                itemContents = line.slice(indent);
                indent += cap[1].length;
              }
              if (blankLine && this.rules.other.blankLine.test(nextLine)) {
                raw += nextLine + "\n";
                src = src.substring(nextLine.length + 1);
                endEarly = true;
              }
              if (!endEarly) {
                const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
                const hrRegex = this.rules.other.hrRegex(indent);
                const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
                const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
                const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
                while (src) {
                  const rawLine = src.split("\n", 1)[0];
                  let nextLineWithoutTabs;
                  nextLine = rawLine;
                  if (this.options.pedantic) {
                    nextLine = nextLine.replace(this.rules.other.listReplaceNesting, "  ");
                    nextLineWithoutTabs = nextLine;
                  } else {
                    nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, "    ");
                  }
                  if (fencesBeginRegex.test(nextLine)) {
                    break;
                  }
                  if (headingBeginRegex.test(nextLine)) {
                    break;
                  }
                  if (htmlBeginRegex.test(nextLine)) {
                    break;
                  }
                  if (nextBulletRegex.test(nextLine)) {
                    break;
                  }
                  if (hrRegex.test(nextLine)) {
                    break;
                  }
                  if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) {
                    itemContents += "\n" + nextLineWithoutTabs.slice(indent);
                  } else {
                    if (blankLine) {
                      break;
                    }
                    if (line.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) {
                      break;
                    }
                    if (fencesBeginRegex.test(line)) {
                      break;
                    }
                    if (headingBeginRegex.test(line)) {
                      break;
                    }
                    if (hrRegex.test(line)) {
                      break;
                    }
                    itemContents += "\n" + nextLine;
                  }
                  if (!blankLine && !nextLine.trim()) {
                    blankLine = true;
                  }
                  raw += rawLine + "\n";
                  src = src.substring(rawLine.length + 1);
                  line = nextLineWithoutTabs.slice(indent);
                }
              }
              if (!list2.loose) {
                if (endsWithBlankLine) {
                  list2.loose = true;
                } else if (this.rules.other.doubleBlankLine.test(raw)) {
                  endsWithBlankLine = true;
                }
              }
              let istask = null;
              let ischecked;
              if (this.options.gfm) {
                istask = this.rules.other.listIsTask.exec(itemContents);
                if (istask) {
                  ischecked = istask[0] !== "[ ] ";
                  itemContents = itemContents.replace(this.rules.other.listReplaceTask, "");
                }
              }
              list2.items.push({
                type: "list_item",
                raw,
                task: !!istask,
                checked: ischecked,
                loose: false,
                text: itemContents,
                tokens: []
              });
              list2.raw += raw;
            }
            const lastItem = list2.items.at(-1);
            if (lastItem) {
              lastItem.raw = lastItem.raw.trimEnd();
              lastItem.text = lastItem.text.trimEnd();
            } else {
              return;
            }
            list2.raw = list2.raw.trimEnd();
            for (let i = 0; i < list2.items.length; i++) {
              this.lexer.state.top = false;
              list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
              if (!list2.loose) {
                const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
                const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => this.rules.other.anyLine.test(t.raw));
                list2.loose = hasMultipleLineBreaks;
              }
            }
            if (list2.loose) {
              for (let i = 0; i < list2.items.length; i++) {
                list2.items[i].loose = true;
              }
            }
            return list2;
          }
        }
        html(src) {
          const cap = this.rules.block.html.exec(src);
          if (cap) {
            const token = {
              type: "html",
              block: true,
              raw: cap[0],
              pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
              text: cap[0]
            };
            return token;
          }
        }
        def(src) {
          const cap = this.rules.block.def.exec(src);
          if (cap) {
            const tag2 = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " ");
            const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
            const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
            return {
              type: "def",
              tag: tag2,
              raw: cap[0],
              href,
              title
            };
          }
        }
        table(src) {
          const cap = this.rules.block.table.exec(src);
          if (!cap) {
            return;
          }
          if (!this.rules.other.tableDelimiter.test(cap[2])) {
            return;
          }
          const headers = splitCells(cap[1]);
          const aligns = cap[2].replace(this.rules.other.tableAlignChars, "").split("|");
          const rows = cap[3]?.trim() ? cap[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [];
          const item = {
            type: "table",
            raw: cap[0],
            header: [],
            align: [],
            rows: []
          };
          if (headers.length !== aligns.length) {
            return;
          }
          for (const align of aligns) {
            if (this.rules.other.tableAlignRight.test(align)) {
              item.align.push("right");
            } else if (this.rules.other.tableAlignCenter.test(align)) {
              item.align.push("center");
            } else if (this.rules.other.tableAlignLeft.test(align)) {
              item.align.push("left");
            } else {
              item.align.push(null);
            }
          }
          for (let i = 0; i < headers.length; i++) {
            item.header.push({
              text: headers[i],
              tokens: this.lexer.inline(headers[i]),
              header: true,
              align: item.align[i]
            });
          }
          for (const row of rows) {
            item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
              return {
                text: cell,
                tokens: this.lexer.inline(cell),
                header: false,
                align: item.align[i]
              };
            }));
          }
          return item;
        }
        lheading(src) {
          const cap = this.rules.block.lheading.exec(src);
          if (cap) {
            return {
              type: "heading",
              raw: cap[0],
              depth: cap[2].charAt(0) === "=" ? 1 : 2,
              text: cap[1],
              tokens: this.lexer.inline(cap[1])
            };
          }
        }
        paragraph(src) {
          const cap = this.rules.block.paragraph.exec(src);
          if (cap) {
            const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
            return {
              type: "paragraph",
              raw: cap[0],
              text,
              tokens: this.lexer.inline(text)
            };
          }
        }
        text(src) {
          const cap = this.rules.block.text.exec(src);
          if (cap) {
            return {
              type: "text",
              raw: cap[0],
              text: cap[0],
              tokens: this.lexer.inline(cap[0])
            };
          }
        }
        escape(src) {
          const cap = this.rules.inline.escape.exec(src);
          if (cap) {
            return {
              type: "escape",
              raw: cap[0],
              text: cap[1]
            };
          }
        }
        tag(src) {
          const cap = this.rules.inline.tag.exec(src);
          if (cap) {
            if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) {
              this.lexer.state.inLink = true;
            } else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) {
              this.lexer.state.inLink = false;
            }
            if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) {
              this.lexer.state.inRawBlock = true;
            } else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) {
              this.lexer.state.inRawBlock = false;
            }
            return {
              type: "html",
              raw: cap[0],
              inLink: this.lexer.state.inLink,
              inRawBlock: this.lexer.state.inRawBlock,
              block: false,
              text: cap[0]
            };
          }
        }
        link(src) {
          const cap = this.rules.inline.link.exec(src);
          if (cap) {
            const trimmedUrl = cap[2].trim();
            if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
              if (!this.rules.other.endAngleBracket.test(trimmedUrl)) {
                return;
              }
              const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
              if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
                return;
              }
            } else {
              const lastParenIndex = findClosingBracket(cap[2], "()");
              if (lastParenIndex === -2) {
                return;
              }
              if (lastParenIndex > -1) {
                const start = cap[0].indexOf("!") === 0 ? 5 : 4;
                const linkLen = start + cap[1].length + lastParenIndex;
                cap[2] = cap[2].substring(0, lastParenIndex);
                cap[0] = cap[0].substring(0, linkLen).trim();
                cap[3] = "";
              }
            }
            let href = cap[2];
            let title = "";
            if (this.options.pedantic) {
              const link2 = this.rules.other.pedanticHrefTitle.exec(href);
              if (link2) {
                href = link2[1];
                title = link2[3];
              }
            } else {
              title = cap[3] ? cap[3].slice(1, -1) : "";
            }
            href = href.trim();
            if (this.rules.other.startAngleBracket.test(href)) {
              if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) {
                href = href.slice(1);
              } else {
                href = href.slice(1, -1);
              }
            }
            return outputLink(cap, {
              href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
              title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
            }, cap[0], this.lexer, this.rules);
          }
        }
        reflink(src, links) {
          let cap;
          if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
            const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, " ");
            const link2 = links[linkString.toLowerCase()];
            if (!link2) {
              const text = cap[0].charAt(0);
              return {
                type: "text",
                raw: text,
                text
              };
            }
            return outputLink(cap, link2, cap[0], this.lexer, this.rules);
          }
        }
        emStrong(src, maskedSrc, prevChar = "") {
          let match = this.rules.inline.emStrongLDelim.exec(src);
          if (!match) return;
          if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) return;
          const nextChar = match[1] || match[2] || "";
          if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
            const lLength = [...match[0]].length - 1;
            let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
            const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
            endReg.lastIndex = 0;
            maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
            while ((match = endReg.exec(maskedSrc)) != null) {
              rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
              if (!rDelim) continue;
              rLength = [...rDelim].length;
              if (match[3] || match[4]) {
                delimTotal += rLength;
                continue;
              } else if (match[5] || match[6]) {
                if (lLength % 3 && !((lLength + rLength) % 3)) {
                  midDelimTotal += rLength;
                  continue;
                }
              }
              delimTotal -= rLength;
              if (delimTotal > 0) continue;
              rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
              const lastCharLength = [...match[0]][0].length;
              const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
              if (Math.min(lLength, rLength) % 2) {
                const text2 = raw.slice(1, -1);
                return {
                  type: "em",
                  raw,
                  text: text2,
                  tokens: this.lexer.inlineTokens(text2)
                };
              }
              const text = raw.slice(2, -2);
              return {
                type: "strong",
                raw,
                text,
                tokens: this.lexer.inlineTokens(text)
              };
            }
          }
        }
        codespan(src) {
          const cap = this.rules.inline.code.exec(src);
          if (cap) {
            let text = cap[2].replace(this.rules.other.newLineCharGlobal, " ");
            const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
            const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
            if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
              text = text.substring(1, text.length - 1);
            }
            return {
              type: "codespan",
              raw: cap[0],
              text
            };
          }
        }
        br(src) {
          const cap = this.rules.inline.br.exec(src);
          if (cap) {
            return {
              type: "br",
              raw: cap[0]
            };
          }
        }
        del(src) {
          const cap = this.rules.inline.del.exec(src);
          if (cap) {
            return {
              type: "del",
              raw: cap[0],
              text: cap[2],
              tokens: this.lexer.inlineTokens(cap[2])
            };
          }
        }
        autolink(src) {
          const cap = this.rules.inline.autolink.exec(src);
          if (cap) {
            let text, href;
            if (cap[2] === "@") {
              text = cap[1];
              href = "mailto:" + text;
            } else {
              text = cap[1];
              href = text;
            }
            return {
              type: "link",
              raw: cap[0],
              text,
              href,
              tokens: [
                {
                  type: "text",
                  raw: text,
                  text
                }
              ]
            };
          }
        }
        url(src) {
          let cap;
          if (cap = this.rules.inline.url.exec(src)) {
            let text, href;
            if (cap[2] === "@") {
              text = cap[0];
              href = "mailto:" + text;
            } else {
              let prevCapZero;
              do {
                prevCapZero = cap[0];
                cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
              } while (prevCapZero !== cap[0]);
              text = cap[0];
              if (cap[1] === "www.") {
                href = "http://" + cap[0];
              } else {
                href = cap[0];
              }
            }
            return {
              type: "link",
              raw: cap[0],
              text,
              href,
              tokens: [
                {
                  type: "text",
                  raw: text,
                  text
                }
              ]
            };
          }
        }
        inlineText(src) {
          const cap = this.rules.inline.text.exec(src);
          if (cap) {
            const escaped = this.lexer.state.inRawBlock;
            return {
              type: "text",
              raw: cap[0],
              text: cap[0],
              escaped
            };
          }
        }
      };
      var _Lexer = class __Lexer {
        tokens;
        options;
        state;
        tokenizer;
        inlineQueue;
        constructor(options2) {
          this.tokens = [];
          this.tokens.links = /* @__PURE__ */ Object.create(null);
          this.options = options2 || _defaults;
          this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
          this.tokenizer = this.options.tokenizer;
          this.tokenizer.options = this.options;
          this.tokenizer.lexer = this;
          this.inlineQueue = [];
          this.state = {
            inLink: false,
            inRawBlock: false,
            top: true
          };
          const rules = {
            other,
            block: block.normal,
            inline: inline.normal
          };
          if (this.options.pedantic) {
            rules.block = block.pedantic;
            rules.inline = inline.pedantic;
          } else if (this.options.gfm) {
            rules.block = block.gfm;
            if (this.options.breaks) {
              rules.inline = inline.breaks;
            } else {
              rules.inline = inline.gfm;
            }
          }
          this.tokenizer.rules = rules;
        }
        /**
         * Expose Rules
         */
        static get rules() {
          return {
            block,
            inline
          };
        }
        /**
         * Static Lex Method
         */
        static lex(src, options2) {
          const lexer2 = new __Lexer(options2);
          return lexer2.lex(src);
        }
        /**
         * Static Lex Inline Method
         */
        static lexInline(src, options2) {
          const lexer2 = new __Lexer(options2);
          return lexer2.inlineTokens(src);
        }
        /**
         * Preprocessing
         */
        lex(src) {
          src = src.replace(other.carriageReturn, "\n");
          this.blockTokens(src, this.tokens);
          for (let i = 0; i < this.inlineQueue.length; i++) {
            const next = this.inlineQueue[i];
            this.inlineTokens(next.src, next.tokens);
          }
          this.inlineQueue = [];
          return this.tokens;
        }
        blockTokens(src, tokens = [], lastParagraphClipped = false) {
          if (this.options.pedantic) {
            src = src.replace(other.tabCharGlobal, "    ").replace(other.spaceLine, "");
          }
          while (src) {
            let token;
            if (this.options.extensions?.block?.some((extTokenizer) => {
              if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                return true;
              }
              return false;
            })) {
              continue;
            }
            if (token = this.tokenizer.space(src)) {
              src = src.substring(token.raw.length);
              const lastToken = tokens.at(-1);
              if (token.raw.length === 1 && lastToken !== void 0) {
                lastToken.raw += "\n";
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (token = this.tokenizer.code(src)) {
              src = src.substring(token.raw.length);
              const lastToken = tokens.at(-1);
              if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
                lastToken.raw += "\n" + token.raw;
                lastToken.text += "\n" + token.text;
                this.inlineQueue.at(-1).src = lastToken.text;
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (token = this.tokenizer.fences(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.heading(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.hr(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.blockquote(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.list(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.html(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.def(src)) {
              src = src.substring(token.raw.length);
              const lastToken = tokens.at(-1);
              if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
                lastToken.raw += "\n" + token.raw;
                lastToken.text += "\n" + token.raw;
                this.inlineQueue.at(-1).src = lastToken.text;
              } else if (!this.tokens.links[token.tag]) {
                this.tokens.links[token.tag] = {
                  href: token.href,
                  title: token.title
                };
              }
              continue;
            }
            if (token = this.tokenizer.table(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.lheading(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            let cutSrc = src;
            if (this.options.extensions?.startBlock) {
              let startIndex = Infinity;
              const tempSrc = src.slice(1);
              let tempStart;
              this.options.extensions.startBlock.forEach((getStartIndex) => {
                tempStart = getStartIndex.call({ lexer: this }, tempSrc);
                if (typeof tempStart === "number" && tempStart >= 0) {
                  startIndex = Math.min(startIndex, tempStart);
                }
              });
              if (startIndex < Infinity && startIndex >= 0) {
                cutSrc = src.substring(0, startIndex + 1);
              }
            }
            if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
              const lastToken = tokens.at(-1);
              if (lastParagraphClipped && lastToken?.type === "paragraph") {
                lastToken.raw += "\n" + token.raw;
                lastToken.text += "\n" + token.text;
                this.inlineQueue.pop();
                this.inlineQueue.at(-1).src = lastToken.text;
              } else {
                tokens.push(token);
              }
              lastParagraphClipped = cutSrc.length !== src.length;
              src = src.substring(token.raw.length);
              continue;
            }
            if (token = this.tokenizer.text(src)) {
              src = src.substring(token.raw.length);
              const lastToken = tokens.at(-1);
              if (lastToken?.type === "text") {
                lastToken.raw += "\n" + token.raw;
                lastToken.text += "\n" + token.text;
                this.inlineQueue.pop();
                this.inlineQueue.at(-1).src = lastToken.text;
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (src) {
              const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
              if (this.options.silent) {
                console.error(errMsg);
                break;
              } else {
                throw new Error(errMsg);
              }
            }
          }
          this.state.top = true;
          return tokens;
        }
        inline(src, tokens = []) {
          this.inlineQueue.push({ src, tokens });
          return tokens;
        }
        /**
         * Lexing/Compiling
         */
        inlineTokens(src, tokens = []) {
          let maskedSrc = src;
          let match = null;
          if (this.tokens.links) {
            const links = Object.keys(this.tokens.links);
            if (links.length > 0) {
              while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
                if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
                  maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
                }
              }
            }
          }
          while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
            maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
          }
          while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
          }
          let keepPrevChar = false;
          let prevChar = "";
          while (src) {
            if (!keepPrevChar) {
              prevChar = "";
            }
            keepPrevChar = false;
            let token;
            if (this.options.extensions?.inline?.some((extTokenizer) => {
              if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                return true;
              }
              return false;
            })) {
              continue;
            }
            if (token = this.tokenizer.escape(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.tag(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.link(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.reflink(src, this.tokens.links)) {
              src = src.substring(token.raw.length);
              const lastToken = tokens.at(-1);
              if (token.type === "text" && lastToken?.type === "text") {
                lastToken.raw += token.raw;
                lastToken.text += token.text;
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.codespan(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.br(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.del(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (token = this.tokenizer.autolink(src)) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            if (!this.state.inLink && (token = this.tokenizer.url(src))) {
              src = src.substring(token.raw.length);
              tokens.push(token);
              continue;
            }
            let cutSrc = src;
            if (this.options.extensions?.startInline) {
              let startIndex = Infinity;
              const tempSrc = src.slice(1);
              let tempStart;
              this.options.extensions.startInline.forEach((getStartIndex) => {
                tempStart = getStartIndex.call({ lexer: this }, tempSrc);
                if (typeof tempStart === "number" && tempStart >= 0) {
                  startIndex = Math.min(startIndex, tempStart);
                }
              });
              if (startIndex < Infinity && startIndex >= 0) {
                cutSrc = src.substring(0, startIndex + 1);
              }
            }
            if (token = this.tokenizer.inlineText(cutSrc)) {
              src = src.substring(token.raw.length);
              if (token.raw.slice(-1) !== "_") {
                prevChar = token.raw.slice(-1);
              }
              keepPrevChar = true;
              const lastToken = tokens.at(-1);
              if (lastToken?.type === "text") {
                lastToken.raw += token.raw;
                lastToken.text += token.text;
              } else {
                tokens.push(token);
              }
              continue;
            }
            if (src) {
              const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
              if (this.options.silent) {
                console.error(errMsg);
                break;
              } else {
                throw new Error(errMsg);
              }
            }
          }
          return tokens;
        }
      };
      var _Renderer = class {
        options;
        parser;
        // set by the parser
        constructor(options2) {
          this.options = options2 || _defaults;
        }
        space(token) {
          return "";
        }
        code({ text, lang, escaped }) {
          const langString = (lang || "").match(other.notSpaceStart)?.[0];
          const code = text.replace(other.endingNewline, "") + "\n";
          if (!langString) {
            return "<pre><code>" + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
          }
          return '<pre><code class="language-' + escape2(langString) + '">' + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
        }
        blockquote({ tokens }) {
          const body = this.parser.parse(tokens);
          return `<blockquote>
${body}</blockquote>
`;
        }
        html({ text }) {
          return text;
        }
        heading({ tokens, depth }) {
          return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
        }
        hr(token) {
          return "<hr>\n";
        }
        list(token) {
          const ordered = token.ordered;
          const start = token.start;
          let body = "";
          for (let j = 0; j < token.items.length; j++) {
            const item = token.items[j];
            body += this.listitem(item);
          }
          const type = ordered ? "ol" : "ul";
          const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
          return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
        }
        listitem(item) {
          let itemBody = "";
          if (item.task) {
            const checkbox = this.checkbox({ checked: !!item.checked });
            if (item.loose) {
              if (item.tokens[0]?.type === "paragraph") {
                item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                  item.tokens[0].tokens[0].text = checkbox + " " + escape2(item.tokens[0].tokens[0].text);
                  item.tokens[0].tokens[0].escaped = true;
                }
              } else {
                item.tokens.unshift({
                  type: "text",
                  raw: checkbox + " ",
                  text: checkbox + " ",
                  escaped: true
                });
              }
            } else {
              itemBody += checkbox + " ";
            }
          }
          itemBody += this.parser.parse(item.tokens, !!item.loose);
          return `<li>${itemBody}</li>
`;
        }
        checkbox({ checked }) {
          return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
        }
        paragraph({ tokens }) {
          return `<p>${this.parser.parseInline(tokens)}</p>
`;
        }
        table(token) {
          let header = "";
          let cell = "";
          for (let j = 0; j < token.header.length; j++) {
            cell += this.tablecell(token.header[j]);
          }
          header += this.tablerow({ text: cell });
          let body = "";
          for (let j = 0; j < token.rows.length; j++) {
            const row = token.rows[j];
            cell = "";
            for (let k = 0; k < row.length; k++) {
              cell += this.tablecell(row[k]);
            }
            body += this.tablerow({ text: cell });
          }
          if (body) body = `<tbody>${body}</tbody>`;
          return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
        }
        tablerow({ text }) {
          return `<tr>
${text}</tr>
`;
        }
        tablecell(token) {
          const content = this.parser.parseInline(token.tokens);
          const type = token.header ? "th" : "td";
          const tag2 = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
          return tag2 + content + `</${type}>
`;
        }
        /**
         * span level renderer
         */
        strong({ tokens }) {
          return `<strong>${this.parser.parseInline(tokens)}</strong>`;
        }
        em({ tokens }) {
          return `<em>${this.parser.parseInline(tokens)}</em>`;
        }
        codespan({ text }) {
          return `<code>${escape2(text, true)}</code>`;
        }
        br(token) {
          return "<br>";
        }
        del({ tokens }) {
          return `<del>${this.parser.parseInline(tokens)}</del>`;
        }
        link({ href, title, tokens }) {
          const text = this.parser.parseInline(tokens);
          const cleanHref = cleanUrl(href);
          if (cleanHref === null) {
            return text;
          }
          href = cleanHref;
          let out = '<a href="' + href + '"';
          if (title) {
            out += ' title="' + escape2(title) + '"';
          }
          out += ">" + text + "</a>";
          return out;
        }
        image({ href, title, text, tokens }) {
          if (tokens) {
            text = this.parser.parseInline(tokens, this.parser.textRenderer);
          }
          const cleanHref = cleanUrl(href);
          if (cleanHref === null) {
            return escape2(text);
          }
          href = cleanHref;
          let out = `<img src="${href}" alt="${text}"`;
          if (title) {
            out += ` title="${escape2(title)}"`;
          }
          out += ">";
          return out;
        }
        text(token) {
          return "tokens" in token && token.tokens ? this.parser.parseInline(token.tokens) : "escaped" in token && token.escaped ? token.text : escape2(token.text);
        }
      };
      var _TextRenderer = class {
        // no need for block level renderers
        strong({ text }) {
          return text;
        }
        em({ text }) {
          return text;
        }
        codespan({ text }) {
          return text;
        }
        del({ text }) {
          return text;
        }
        html({ text }) {
          return text;
        }
        text({ text }) {
          return text;
        }
        link({ text }) {
          return "" + text;
        }
        image({ text }) {
          return "" + text;
        }
        br() {
          return "";
        }
      };
      var _Parser = class __Parser {
        options;
        renderer;
        textRenderer;
        constructor(options2) {
          this.options = options2 || _defaults;
          this.options.renderer = this.options.renderer || new _Renderer();
          this.renderer = this.options.renderer;
          this.renderer.options = this.options;
          this.renderer.parser = this;
          this.textRenderer = new _TextRenderer();
        }
        /**
         * Static Parse Method
         */
        static parse(tokens, options2) {
          const parser2 = new __Parser(options2);
          return parser2.parse(tokens);
        }
        /**
         * Static Parse Inline Method
         */
        static parseInline(tokens, options2) {
          const parser2 = new __Parser(options2);
          return parser2.parseInline(tokens);
        }
        /**
         * Parse Loop
         */
        parse(tokens, top = true) {
          let out = "";
          for (let i = 0; i < tokens.length; i++) {
            const anyToken = tokens[i];
            if (this.options.extensions?.renderers?.[anyToken.type]) {
              const genericToken = anyToken;
              const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
              if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
                out += ret || "";
                continue;
              }
            }
            const token = anyToken;
            switch (token.type) {
              case "space": {
                out += this.renderer.space(token);
                continue;
              }
              case "hr": {
                out += this.renderer.hr(token);
                continue;
              }
              case "heading": {
                out += this.renderer.heading(token);
                continue;
              }
              case "code": {
                out += this.renderer.code(token);
                continue;
              }
              case "table": {
                out += this.renderer.table(token);
                continue;
              }
              case "blockquote": {
                out += this.renderer.blockquote(token);
                continue;
              }
              case "list": {
                out += this.renderer.list(token);
                continue;
              }
              case "html": {
                out += this.renderer.html(token);
                continue;
              }
              case "paragraph": {
                out += this.renderer.paragraph(token);
                continue;
              }
              case "text": {
                let textToken = token;
                let body = this.renderer.text(textToken);
                while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
                  textToken = tokens[++i];
                  body += "\n" + this.renderer.text(textToken);
                }
                if (top) {
                  out += this.renderer.paragraph({
                    type: "paragraph",
                    raw: body,
                    text: body,
                    tokens: [{ type: "text", raw: body, text: body, escaped: true }]
                  });
                } else {
                  out += body;
                }
                continue;
              }
              default: {
                const errMsg = 'Token with "' + token.type + '" type was not found.';
                if (this.options.silent) {
                  console.error(errMsg);
                  return "";
                } else {
                  throw new Error(errMsg);
                }
              }
            }
          }
          return out;
        }
        /**
         * Parse Inline Tokens
         */
        parseInline(tokens, renderer = this.renderer) {
          let out = "";
          for (let i = 0; i < tokens.length; i++) {
            const anyToken = tokens[i];
            if (this.options.extensions?.renderers?.[anyToken.type]) {
              const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
              if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
                out += ret || "";
                continue;
              }
            }
            const token = anyToken;
            switch (token.type) {
              case "escape": {
                out += renderer.text(token);
                break;
              }
              case "html": {
                out += renderer.html(token);
                break;
              }
              case "link": {
                out += renderer.link(token);
                break;
              }
              case "image": {
                out += renderer.image(token);
                break;
              }
              case "strong": {
                out += renderer.strong(token);
                break;
              }
              case "em": {
                out += renderer.em(token);
                break;
              }
              case "codespan": {
                out += renderer.codespan(token);
                break;
              }
              case "br": {
                out += renderer.br(token);
                break;
              }
              case "del": {
                out += renderer.del(token);
                break;
              }
              case "text": {
                out += renderer.text(token);
                break;
              }
              default: {
                const errMsg = 'Token with "' + token.type + '" type was not found.';
                if (this.options.silent) {
                  console.error(errMsg);
                  return "";
                } else {
                  throw new Error(errMsg);
                }
              }
            }
          }
          return out;
        }
      };
      var _Hooks = class {
        options;
        block;
        constructor(options2) {
          this.options = options2 || _defaults;
        }
        static passThroughHooks = /* @__PURE__ */ new Set([
          "preprocess",
          "postprocess",
          "processAllTokens"
        ]);
        /**
         * Process markdown before marked
         */
        preprocess(markdown2) {
          return markdown2;
        }
        /**
         * Process HTML after marked is finished
         */
        postprocess(html2) {
          return html2;
        }
        /**
         * Process all tokens before walk tokens
         */
        processAllTokens(tokens) {
          return tokens;
        }
        /**
         * Provide function to tokenize markdown
         */
        provideLexer() {
          return this.block ? _Lexer.lex : _Lexer.lexInline;
        }
        /**
         * Provide function to parse tokens
         */
        provideParser() {
          return this.block ? _Parser.parse : _Parser.parseInline;
        }
      };
      var Marked = class {
        defaults = _getDefaults();
        options = this.setOptions;
        parse = this.parseMarkdown(true);
        parseInline = this.parseMarkdown(false);
        Parser = _Parser;
        Renderer = _Renderer;
        TextRenderer = _TextRenderer;
        Lexer = _Lexer;
        Tokenizer = _Tokenizer;
        Hooks = _Hooks;
        constructor(...args) {
          this.use(...args);
        }
        /**
         * Run callback for every token
         */
        walkTokens(tokens, callback) {
          let values = [];
          for (const token of tokens) {
            values = values.concat(callback.call(this, token));
            switch (token.type) {
              case "table": {
                const tableToken = token;
                for (const cell of tableToken.header) {
                  values = values.concat(this.walkTokens(cell.tokens, callback));
                }
                for (const row of tableToken.rows) {
                  for (const cell of row) {
                    values = values.concat(this.walkTokens(cell.tokens, callback));
                  }
                }
                break;
              }
              case "list": {
                const listToken = token;
                values = values.concat(this.walkTokens(listToken.items, callback));
                break;
              }
              default: {
                const genericToken = token;
                if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
                  this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
                    const tokens2 = genericToken[childTokens].flat(Infinity);
                    values = values.concat(this.walkTokens(tokens2, callback));
                  });
                } else if (genericToken.tokens) {
                  values = values.concat(this.walkTokens(genericToken.tokens, callback));
                }
              }
            }
          }
          return values;
        }
        use(...args) {
          const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
          args.forEach((pack) => {
            const opts = { ...pack };
            opts.async = this.defaults.async || opts.async || false;
            if (pack.extensions) {
              pack.extensions.forEach((ext) => {
                if (!ext.name) {
                  throw new Error("extension name required");
                }
                if ("renderer" in ext) {
                  const prevRenderer = extensions.renderers[ext.name];
                  if (prevRenderer) {
                    extensions.renderers[ext.name] = function(...args2) {
                      let ret = ext.renderer.apply(this, args2);
                      if (ret === false) {
                        ret = prevRenderer.apply(this, args2);
                      }
                      return ret;
                    };
                  } else {
                    extensions.renderers[ext.name] = ext.renderer;
                  }
                }
                if ("tokenizer" in ext) {
                  if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                    throw new Error("extension level must be 'block' or 'inline'");
                  }
                  const extLevel = extensions[ext.level];
                  if (extLevel) {
                    extLevel.unshift(ext.tokenizer);
                  } else {
                    extensions[ext.level] = [ext.tokenizer];
                  }
                  if (ext.start) {
                    if (ext.level === "block") {
                      if (extensions.startBlock) {
                        extensions.startBlock.push(ext.start);
                      } else {
                        extensions.startBlock = [ext.start];
                      }
                    } else if (ext.level === "inline") {
                      if (extensions.startInline) {
                        extensions.startInline.push(ext.start);
                      } else {
                        extensions.startInline = [ext.start];
                      }
                    }
                  }
                }
                if ("childTokens" in ext && ext.childTokens) {
                  extensions.childTokens[ext.name] = ext.childTokens;
                }
              });
              opts.extensions = extensions;
            }
            if (pack.renderer) {
              const renderer = this.defaults.renderer || new _Renderer(this.defaults);
              for (const prop in pack.renderer) {
                if (!(prop in renderer)) {
                  throw new Error(`renderer '${prop}' does not exist`);
                }
                if (["options", "parser"].includes(prop)) {
                  continue;
                }
                const rendererProp = prop;
                const rendererFunc = pack.renderer[rendererProp];
                const prevRenderer = renderer[rendererProp];
                renderer[rendererProp] = (...args2) => {
                  let ret = rendererFunc.apply(renderer, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(renderer, args2);
                  }
                  return ret || "";
                };
              }
              opts.renderer = renderer;
            }
            if (pack.tokenizer) {
              const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
              for (const prop in pack.tokenizer) {
                if (!(prop in tokenizer)) {
                  throw new Error(`tokenizer '${prop}' does not exist`);
                }
                if (["options", "rules", "lexer"].includes(prop)) {
                  continue;
                }
                const tokenizerProp = prop;
                const tokenizerFunc = pack.tokenizer[tokenizerProp];
                const prevTokenizer = tokenizer[tokenizerProp];
                tokenizer[tokenizerProp] = (...args2) => {
                  let ret = tokenizerFunc.apply(tokenizer, args2);
                  if (ret === false) {
                    ret = prevTokenizer.apply(tokenizer, args2);
                  }
                  return ret;
                };
              }
              opts.tokenizer = tokenizer;
            }
            if (pack.hooks) {
              const hooks = this.defaults.hooks || new _Hooks();
              for (const prop in pack.hooks) {
                if (!(prop in hooks)) {
                  throw new Error(`hook '${prop}' does not exist`);
                }
                if (["options", "block"].includes(prop)) {
                  continue;
                }
                const hooksProp = prop;
                const hooksFunc = pack.hooks[hooksProp];
                const prevHook = hooks[hooksProp];
                if (_Hooks.passThroughHooks.has(prop)) {
                  hooks[hooksProp] = (arg) => {
                    if (this.defaults.async) {
                      return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                        return prevHook.call(hooks, ret2);
                      });
                    }
                    const ret = hooksFunc.call(hooks, arg);
                    return prevHook.call(hooks, ret);
                  };
                } else {
                  hooks[hooksProp] = (...args2) => {
                    let ret = hooksFunc.apply(hooks, args2);
                    if (ret === false) {
                      ret = prevHook.apply(hooks, args2);
                    }
                    return ret;
                  };
                }
              }
              opts.hooks = hooks;
            }
            if (pack.walkTokens) {
              const walkTokens2 = this.defaults.walkTokens;
              const packWalktokens = pack.walkTokens;
              opts.walkTokens = function(token) {
                let values = [];
                values.push(packWalktokens.call(this, token));
                if (walkTokens2) {
                  values = values.concat(walkTokens2.call(this, token));
                }
                return values;
              };
            }
            this.defaults = { ...this.defaults, ...opts };
          });
          return this;
        }
        setOptions(opt) {
          this.defaults = { ...this.defaults, ...opt };
          return this;
        }
        lexer(src, options2) {
          return _Lexer.lex(src, options2 ?? this.defaults);
        }
        parser(tokens, options2) {
          return _Parser.parse(tokens, options2 ?? this.defaults);
        }
        parseMarkdown(blockType) {
          const parse2 = (src, options2) => {
            const origOpt = { ...options2 };
            const opt = { ...this.defaults, ...origOpt };
            const throwError = this.onError(!!opt.silent, !!opt.async);
            if (this.defaults.async === true && origOpt.async === false) {
              return throwError(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
            }
            if (typeof src === "undefined" || src === null) {
              return throwError(new Error("marked(): input parameter is undefined or null"));
            }
            if (typeof src !== "string") {
              return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
            }
            if (opt.hooks) {
              opt.hooks.options = opt;
              opt.hooks.block = blockType;
            }
            const lexer2 = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
            const parser2 = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
            if (opt.async) {
              return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
            }
            try {
              if (opt.hooks) {
                src = opt.hooks.preprocess(src);
              }
              let tokens = lexer2(src, opt);
              if (opt.hooks) {
                tokens = opt.hooks.processAllTokens(tokens);
              }
              if (opt.walkTokens) {
                this.walkTokens(tokens, opt.walkTokens);
              }
              let html2 = parser2(tokens, opt);
              if (opt.hooks) {
                html2 = opt.hooks.postprocess(html2);
              }
              return html2;
            } catch (e) {
              return throwError(e);
            }
          };
          return parse2;
        }
        onError(silent, async) {
          return (e) => {
            e.message += "\nPlease report this to https://github.com/markedjs/marked.";
            if (silent) {
              const msg = "<p>An error occurred:</p><pre>" + escape2(e.message + "", true) + "</pre>";
              if (async) {
                return Promise.resolve(msg);
              }
              return msg;
            }
            if (async) {
              return Promise.reject(e);
            }
            throw e;
          };
        }
      };
      var markedInstance = new Marked();
      function marked(src, opt) {
        return markedInstance.parse(src, opt);
      }
      marked.options = marked.setOptions = function(options2) {
        markedInstance.setOptions(options2);
        marked.defaults = markedInstance.defaults;
        changeDefaults(marked.defaults);
        return marked;
      };
      marked.getDefaults = _getDefaults;
      marked.defaults = _defaults;
      marked.use = function(...args) {
        markedInstance.use(...args);
        marked.defaults = markedInstance.defaults;
        changeDefaults(marked.defaults);
        return marked;
      };
      marked.walkTokens = function(tokens, callback) {
        return markedInstance.walkTokens(tokens, callback);
      };
      marked.parseInline = markedInstance.parseInline;
      marked.Parser = _Parser;
      marked.parser = _Parser.parse;
      marked.Renderer = _Renderer;
      marked.TextRenderer = _TextRenderer;
      marked.Lexer = _Lexer;
      marked.lexer = _Lexer.lex;
      marked.Tokenizer = _Tokenizer;
      marked.Hooks = _Hooks;
      marked.parse = marked;
      var options = marked.options;
      var setOptions = marked.setOptions;
      var use = marked.use;
      var walkTokens = marked.walkTokens;
      var parseInline = marked.parseInline;
      var parse = marked;
      var parser = _Parser.parse;
      var lexer = _Lexer.lex;
      if (__exports != exports2) module3.exports = exports2;
      return module3.exports;
    });
  }
});

// vendor/md2chat/chat-markdown.js
var require_chat_markdown = __commonJS({
  "vendor/md2chat/chat-markdown.js"(exports, module2) {
    "use strict";
    (function(root) {
      const md = typeof module2 === "object" ? require_marked() : root.marked;
      const mathInline = { name: "chatMathInline", level: "inline", start: (src) => {
        const i = src.search(/\$|\\\(/);
        return i < 0 ? void 0 : i;
      }, tokenizer(src) {
        let match = /^\\\(([^\n]+?)\\\)/.exec(src);
        if (match) return { type: "chatMathInline", raw: match[0], tex: match[1] };
        match = /^\$(?!\$)([^\s$](?:\\.|[^\n$])*?[^\s$]|[^\s$])\$(?![\d$])/.exec(src);
        if (match) return { type: "chatMathInline", raw: match[0], tex: match[1] };
      } };
      const mathBlock = { name: "chatMathBlock", level: "block", start: (src) => {
        const i = src.search(/(?:^|\n)(?:\$\$|\\\[)/);
        return i < 0 ? void 0 : i;
      }, tokenizer(src) {
        const match = /^\$\$([\s\S]+?)\$\$(?:[ \t]*(?:\n|$))/.exec(src) || /^\\\[([\s\S]+?)\\\](?:[ \t]*(?:\n|$))/.exec(src);
        if (match) return { type: "chatMathBlock", raw: match[0], tex: match[1].trim() };
      } };
      const lexer = new md.Marked({ gfm: true, breaks: true, extensions: [mathInline, mathBlock, {
        name: "chatImage",
        level: "inline",
        start: (src) => src.indexOf("[[DING_IMAGE:"),
        tokenizer(src) {
          const match = /^\[\[DING_IMAGE:(\d+)\]\]/.exec(src);
          if (match) return { type: "chatImage", raw: match[0], id: match[1] };
        }
      }] });
      const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
      const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (all, e) => {
        if (e[0] === "#") {
          const n = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1));
          return n > 0 && n <= 1114111 ? String.fromCodePoint(n) : all;
        }
        return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[e.toLowerCase()];
      });
      function runsHtml(runs) {
        return runs.map((r) => {
          let text = esc(r.text).replace(/\n/g, "<br>");
          if (r.code) text = '<code style="font-family:monospace;white-space:pre-wrap">' + text + "</code>";
          if (r.bold) text = "<strong>" + text + "</strong>";
          if (r.italic) text = "<em>" + text + "</em>";
          if (r.strikethrough) text = "<s>" + text + "</s>";
          return text;
        }).join("");
      }
      function normalize(source) {
        let fence = null;
        return source.replace(/\r\n?/g, "\n").split("\n").map((line) => {
          const m = /^ {0,3}(`{3,}|~{3,})/.exec(line);
          if (m) {
            if (!fence) fence = m[1];
            else if (m[1][0] === fence[0] && m[1].length >= fence.length) fence = null;
            return line;
          }
          return !fence && /^\s*\\\|/.test(line) ? line.replace(/\\\|/g, "|") : line;
        }).join("\n");
      }
      function parse(source) {
        const blocks = [], normalized = normalize(source), tokens = lexer.lexer(normalized);
        function locate(list, container, base) {
          let cursor = 0;
          for (const token of list || []) {
            if (!token || typeof token.raw !== "string") continue;
            let relative = container.indexOf(token.raw, cursor);
            if (relative < 0) relative = container.indexOf(token.raw);
            if (relative < 0) continue;
            token.sourceStart = base + relative;
            token.sourceEnd = token.sourceStart + token.raw.length;
            cursor = relative + token.raw.length;
            locate(token.items, token.raw, token.sourceStart);
            locate(token.tokens, token.raw, token.sourceStart);
          }
        }
        locate(tokens, normalized, 0);
        const append = (text, style = {}) => ({ type: "run", text, ...style });
        function inline(tokens2, style = {}) {
          const out = [];
          for (const t of tokens2 || []) {
            switch (t.type) {
              case "chatMathInline":
                out.push(append(t.raw, { ...style, math: t.tex }));
                break;
              case "strong":
                out.push(...inline(t.tokens, { ...style, bold: true }));
                break;
              case "em":
                out.push(...inline(t.tokens, { ...style, italic: true }));
                break;
              case "del":
                out.push(...inline(t.tokens, { ...style, strikethrough: true }));
                break;
              case "codespan":
                out.push(append(t.text, { ...style, code: true }));
                break;
              case "br":
                out.push(append("\n", style));
                break;
              case "chatImage":
                out.push({ type: "image", id: t.id, sourceStart: t.sourceStart, sourceEnd: t.sourceEnd });
                break;
              case "image":
                out.push({ type: "image", src: t.href, markdown: t.raw, sourceStart: t.sourceStart, sourceEnd: t.sourceEnd });
                break;
              case "link": {
                const label = inline(t.tokens, style);
                out.push(...label);
                const text = label.filter((p) => p.type === "run").map((p) => p.text).join("");
                if (text !== t.href) out.push(append("\uFF08" + t.href + "\uFF09", style));
                break;
              }
              case "escape":
                out.push(append(t.text, style));
                break;
              case "html":
                out.push(append(t.raw, style));
                break;
              default:
                out.push(...t.tokens ? inline(t.tokens, style) : [append(decode(t.text || t.raw || ""), style)]);
            }
          }
          return out;
        }
        function emit(pieces, prefix = "") {
          let runs = [];
          let atStart = true;
          const flush = () => {
            if (runs.length) {
              const text = runs.map((r) => r.text).join("");
              if (text.trim()) blocks.push({ type: "text", text, runs });
              runs = [];
            }
          };
          for (const piece of pieces) {
            if (piece.type === "image") {
              flush();
              blocks.push(piece);
              atStart = true;
              continue;
            }
            for (const [i, line] of piece.text.split("\n").entries()) {
              if (i) {
                runs.push({ text: "\n" });
                atStart = true;
              }
              if (line) {
                if (atStart && prefix) runs.push({ text: prefix });
                atStart = false;
                const { type, ...run } = piece;
                runs.push({ ...run, text: line });
              }
            }
          }
          flush();
        }
        const cell = (t) => inline(t.tokens).map((p) => p.type === "image" ? "[\u56FE\u7247\uFF1A" + (p.src || p.id) + "]" : p.text).join("");
        function walk(tokens2, depth = 0, quote = "") {
          for (const [tokenIndex, t] of tokens2.entries()) {
            switch (t.type) {
              case "space": {
                const last = blocks[blocks.length - 1];
                if (last?.type === "text" && t.raw.includes("\n\n") && tokens2.slice(tokenIndex + 1).some((next) => !["space", "def"].includes(next.type))) {
                  last.text += "\n";
                  last.runs.push({ text: "\n" });
                }
                break;
              }
              case "def":
                break;
              case "chatMathBlock":
                blocks.push({ type: "math", tex: t.tex });
                break;
              case "heading":
                emit(inline(t.tokens, { bold: true, heading: t.depth }), quote);
                break;
              case "paragraph":
              case "text":
                emit(t.tokens ? inline(t.tokens) : [append(t.text || "")], quote);
                break;
              case "blockquote":
                walk(t.tokens, depth, quote + "\u2502 ");
                break;
              case "list":
                t.items.forEach((item, i) => {
                  const prefix = "  ".repeat(depth) + (item.task ? item.checked ? "\u2705 " : "\u2B1C " : t.ordered ? Number(t.start) + i + ". " : "\u2022 ");
                  const start = blocks.length;
                  walk(item.tokens, depth + 1, quote);
                  const first = blocks[start];
                  if (first?.type === "text") {
                    first.text = prefix + first.text;
                    first.runs.unshift({ text: prefix });
                  } else blocks.splice(start, 0, { type: "text", text: prefix.trimEnd(), runs: [{ text: prefix.trimEnd() }] });
                });
                break;
              case "code": {
                const language = (t.lang || "").trim().split(/\s+/)[0].toLowerCase();
                blocks.push({ type: language === "mermaid" ? "mermaid" : "code", text: t.text, language });
                break;
              }
              case "hr":
                emit([append("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500")], quote);
                break;
              case "table":
                blocks.push({ type: "table", header: t.header.map(cell), rows: t.rows.map((row) => row.map(cell)) });
                break;
              case "html":
                emit([append(t.raw)], quote);
                break;
              default:
                emit([append(t.raw || t.text || "")], quote);
            }
          }
        }
        walk(tokens);
        return blocks;
      }
      function compactImages(blocks) {
        return blocks.map((block, index) => {
          if (block.type !== "text") return block;
          const imageLike = (b) => b && ["image", "table", "math", "mermaid", "code"].includes(b.type);
          let start = 0, end = block.text.length;
          if (imageLike(blocks[index - 1])) start = (block.text.match(/^(?:[ \t]*\n)+/) || [""])[0].length;
          if (imageLike(blocks[index + 1])) end -= (block.text.slice(start).match(/\n[ \t\r\n]*$/) || [""])[0].length;
          let offset = 0;
          const runs = [];
          for (const run of block.runs) {
            const text = run.text.slice(Math.max(0, start - offset), Math.max(0, end - offset));
            if (text) runs.push({ ...run, text });
            offset += run.text.length;
          }
          return { ...block, text: block.text.slice(start, end), runs };
        }).filter((b) => b.type !== "text" || b.text.trim());
      }
      const api = { parse, runsHtml, compactImages };
      if (typeof module2 === "object") module2.exports = api;
      else root.ChatMarkdown = api;
    })(typeof globalThis === "object" ? globalThis : exports);
  }
});

// vendor/md2chat/chat-payload.js
var require_chat_payload = __commonJS({
  "vendor/md2chat/chat-payload.js"(exports, module2) {
    "use strict";
    (function(root, factory) {
      const api = factory();
      if (typeof module2 === "object" && module2.exports) module2.exports = api;
      else root.ChatPayload = api;
    })(globalThis, () => {
      const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
      async function build(source, deps) {
        const { markdown: markdown2, renderers: renderers2, renderTable, imageAssets = /* @__PURE__ */ new Map(), ensureImage: ensureImage2, describeImageError = (src, error) => src + "\uFF1A" + error.message } = deps;
        if (source.length > 2 * 1024 * 1024) throw new Error("\u6587\u5B57\u8FC7\u957F\uFF0C\u8BF7\u5206\u6BB5\u8F6C\u6362\uFF08\u6700\u591A 2 MB \u5B57\u7B26\uFF09\u3002");
        const blocks = markdown2.compactImages(markdown2.parse(source)), parts = [], plain = [], preview = [], segments = [], emailTables = /* @__PURE__ */ new Map(), emailSkip = /* @__PURE__ */ new Set();
        let tableCount = 0, imageCount = 0, tableImages = 0, originalImages = 0, mathImages = 0, mermaidImages = 0, codeImages = 0, codeCount = 0;
        const appendText = (text, run = {}) => {
          if (segments.at(-1)?.type === "text") {
            segments.at(-1).text += text;
            segments.at(-1).runs.push({ ...run, text });
          } else segments.push({ type: "text", text, runs: [{ ...run, text }] });
        };
        const lineBreak = "<br>";
        const appendImage = (image, sourceUrl) => {
          imageCount++;
          segments.push({ type: "image", src: image.src, displayWidth: image.displayWidth || image.width, ...sourceUrl ? { sourceUrl } : {} });
          parts.push('<img src="' + escapeHtml(image.src) + '" width="' + (image.displayWidth || image.width) + '" height="' + (image.displayHeight || image.height) + '">');
          preview.push('<img src="' + escapeHtml(image.src) + '" alt="\u56FE\u6587\u4E2D\u7684\u56FE\u7247 ' + imageCount + '" style="display:block;max-width:100%;width:' + (image.displayWidth ? image.displayWidth + "px" : "auto") + ';height:auto;margin:0">');
        };
        for (const block of blocks) {
          if (block.type === "text") {
            if (/^\s*\[图片\]\s*$/m.test(block.text)) throw new Error("\u8F93\u5165\u4E2D\u53EA\u6709 [\u56FE\u7247] \u5360\u4F4D\u7B26\uFF0C\u6CA1\u6709\u5BF9\u5E94\u56FE\u7247\u6570\u636E\u3002\u8BF7\u4ECE\u9489\u9489\u91CD\u65B0\u590D\u5236\u5B8C\u6574\u56FE\u6587\uFF0C\u6216\u5220\u9664\u5360\u4F4D\u7B26\u540E\u5728\u539F\u4F4D\u7F6E\u7C98\u8D34\u56FE\u7247\u3002");
            const rendered = [];
            for (const run of block.runs) {
              if (!run.math) {
                rendered.push(markdown2.runsHtml([run]));
                appendText(run.text, run);
                continue;
              }
              try {
                const image = await renderers2.math(run.math, false);
                mathImages++;
                imageCount++;
                segments.push({ type: "image", src: image.src, displayWidth: image.displayWidth || image.width });
                rendered.push('<img src="' + image.src + '" width="' + image.displayWidth + '" height="' + image.displayHeight + '" alt="' + escapeHtml(run.text) + '" style="display:inline-block;vertical-align:middle;max-width:100%;height:auto">');
              } catch (error) {
                throw new Error("\u7B2C " + (mathImages + 1) + " \u4E2A\u516C\u5F0F\uFF1A" + error.message);
              }
            }
            const textHtml = rendered.join("");
            appendText("\n");
            parts.push(textHtml);
            plain.push(block.text);
            preview.push('<div style="white-space:pre-wrap;margin:0">' + textHtml + "</div>");
          } else if (block.type === "code") {
            codeCount++;
            try {
              for (const image of await renderers2.code(block.text, block.language)) {
                codeImages++;
                appendImage(image);
              }
            } catch (error) {
              throw new Error("\u7B2C " + codeCount + " \u4E2A\u4EE3\u7801\u5757\uFF1A" + error.message);
            }
            const fence = "`".repeat(Math.max(3, ...[...block.text.matchAll(/`+/g)].map((m) => m[0].length + 1)));
            plain.push(fence + block.language + "\n" + block.text + "\n" + fence);
          } else if (block.type === "math" || block.type === "mermaid") {
            try {
              const image = block.type === "math" ? await renderers2.math(block.tex) : await renderers2.mermaid(block.text);
              if (block.type === "math") mathImages++;
              else mermaidImages++;
              appendImage(image);
              plain.push(block.type === "math" ? "$$\n" + block.tex + "\n$$" : "```mermaid\n" + block.text + "\n```");
            } catch (error) {
              throw new Error((block.type === "math" ? "\u7B2C " + (mathImages + 1) + " \u4E2A\u516C\u5F0F" : "\u7B2C " + (mermaidImages + 1) + " \u4E2A Mermaid \u56FE") + "\uFF1A" + error.message);
            }
          } else if (block.type === "table") {
            tableCount++;
            const start = segments.length;
            for (const image of renderTable(block.header, block.rows)) {
              tableImages++;
              appendImage(image);
            }
            emailTables.set(start, { type: "table", rows: [block.header, ...block.rows] });
            for (let i = start + 1; i < segments.length; i++) emailSkip.add(i);
            plain.push([block.header, ...block.rows].map((row) => row.join(" | ")).join("\n"));
          } else {
            const asset = block.id ? imageAssets.get(block.id) : { src: block.src };
            if (!asset) throw new Error("\u539F\u6587\u56FE\u7247\u5F15\u7528\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u7C98\u8D34\u5B8C\u6574\u56FE\u6587\u3002");
            try {
              const image = await ensureImage2(asset, { allowLocal: !block.id });
              originalImages++;
              appendImage(image, image.sourceUrl);
              plain.push("[\u56FE\u7247]");
            } catch (error) {
              if (block.id) throw error;
              const failure = new Error(describeImageError(block.src, error));
              failure.resource = block.src;
              failure.sourceMarkup = block.markdown;
              failure.sourceStart = block.sourceStart;
              failure.sourceEnd = block.sourceEnd;
              throw failure;
            }
          }
        }
        const cleanSegment = (s) => {
          if (s.type !== "text") return s;
          const runs = s.runs.map((r) => ({ ...r }));
          while (runs.length && !runs[0].text.replace(/^\n+/, "")) runs.shift();
          while (runs.length && !runs.at(-1).text.replace(/\n+$/, "")) runs.pop();
          if (runs.length) {
            runs[0].text = runs[0].text.replace(/^\n+/, "");
            runs.at(-1).text = runs.at(-1).text.replace(/\n+$/, "");
          }
          return { ...s, text: runs.map((r) => r.text).join(""), runs };
        };
        const clean = (list) => list.map(cleanSegment).filter((s) => s.type !== "text" || s.text.trim());
        return { html: `<meta charset='utf-8'>
<article class="4ever-article">
` + parts.join(lineBreak) + "</article>", plain: plain.join("\n"), preview: preview.join(""), emailSegments: clean(segments.flatMap((s, i) => emailSkip.has(i) ? [] : [emailTables.get(i) || s])), segments: clean(segments), tableCount, imageCount, tableImages, originalImages, mathImages, mermaidImages, codeImages };
      }
      return { build };
    });
  }
});

// vendor/md2chat/code-images.js
var require_code_images = __commonJS({
  "vendor/md2chat/code-images.js"(exports, module2) {
    "use strict";
    (function(root) {
      const colors = { plain: "#1f2328", keyword: "#cf222e", string: "#0a3069", number: "#0550ae", literal: "#0550ae", comment: "#59636e", doctag: "#cf222e", title: "#6639ba", built_in: "#953800", type: "#953800", attr: "#0550ae", attribute: "#0550ae", variable: "#953800", regexp: "#0a3069", symbol: "#0550ae", meta: "#0550ae", tag: "#116329", name: "#116329", selector_tag: "#116329", addition: "#116329", deletion: "#82071e" };
      const decode = (s) => s.replace(/&(amp|lt|gt|quot|#x27|#39);/g, (_, e) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#x27": "'", "#39": "'" })[e]);
      function tokens(source, language, engine) {
        if (source.length > 5e4) throw new Error("\u4EE3\u7801\u5757\u8FC7\u957F\uFF0C\u8BF7\u62C6\u5206\u4E3A\u6BCF\u5757\u4E0D\u8D85\u8FC7 50,000 \u5B57\u7B26");
        const grammar = language && engine.getLanguage(language);
        if (!grammar) return { label: language || "\u4EE3\u7801", runs: [{ text: source, color: colors.plain }] };
        const html = engine.highlight(source, { language, ignoreIllegals: true }).value, runs = [], stack = [colors.plain];
        for (const match of html.matchAll(/<span\b[^>]*>|<\/span>|[^<]+/g)) {
          const part = match[0];
          if (part.startsWith("<span")) {
            const name2 = /hljs-([\w-]+)/.exec(part)?.[1];
            stack.push(colors[name2] || stack.at(-1));
          } else if (part === "</span>") stack.pop();
          else runs.push({ text: decode(part), color: stack.at(-1) });
        }
        return { label: grammar.name || language, runs };
      }
      function layout(runs, measure, maxWidth) {
        const rows = [];
        let line = 1, column = 0, row = { number: 1, runs: [], width: 0 };
        const flush = () => {
          rows.push(row);
          row = { number: null, runs: [], width: 0 };
        };
        for (const run of runs) for (const char of run.text) {
          if (char === "\n") {
            flush();
            row.number = ++line;
            column = 0;
            continue;
          }
          const text = char === "	" ? " ".repeat(4 - column % 4) : char;
          for (const glyph of text) {
            const width = measure(glyph);
            if (row.width + width > maxWidth && row.width) flush();
            const last = row.runs.at(-1);
            if (last?.color === run.color) last.text += glyph;
            else row.runs.push({ text: glyph, color: run.color });
            row.width += width;
            column++;
          }
        }
        flush();
        if (rows.length > 2e3) throw new Error("\u4EE3\u7801\u884C\u6570\u8FC7\u591A\uFF0C\u8BF7\u5206\u6BB5\u8F6C\u6362");
        return rows;
      }
      function render(source, language, engine) {
        const { label, runs } = tokens(source, language, engine), font = '16px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
        const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
        ctx.font = font;
        const padding = 18, lineHeight = 26, rows = layout(runs, (s) => ctx.measureText(s).width, 560);
        const width = Math.max(320, Math.ceil(Math.max(...rows.map((r) => r.width))) + padding * 2), pageSize = 36, pages = Math.ceil(rows.length / pageSize), images = [];
        for (let page = 0; page < pages; page++) {
          const slice = rows.slice(page * pageSize, (page + 1) * pageSize), height = padding * 2 + slice.length * lineHeight + (pages > 1 ? 24 : 0);
          canvas.width = width * 2;
          canvas.height = height * 2;
          ctx.scale(2, 2);
          ctx.fillStyle = "#f6f8fa";
          ctx.strokeStyle = "#d1d9e0";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(0.5, 0.5, width - 1, height - 1, 6);
          ctx.fill();
          ctx.stroke();
          ctx.font = font;
          ctx.textBaseline = "middle";
          ctx.textAlign = "left";
          slice.forEach((row, index) => {
            const y = padding + (index + 0.5) * lineHeight;
            let x = padding;
            for (const run of row.runs) {
              ctx.fillStyle = run.color;
              ctx.fillText(run.text, x, y);
              x += ctx.measureText(run.text).width;
            }
          });
          if (pages > 1) {
            ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
            ctx.textAlign = "right";
            ctx.fillStyle = "#59636e";
            ctx.fillText(label.slice(0, 24) + " \xB7 " + (page + 1) + " / " + pages, width - padding, height - padding - 3);
          }
          images.push({ src: canvas.toDataURL("image/png"), width: canvas.width, height: canvas.height, displayWidth: width, displayHeight: height });
        }
        return images;
      }
      const api = { tokens, layout, render };
      if (typeof module2 === "object") module2.exports = api;
      else root.CodeImages = api;
    })(globalThis);
  }
});

// vendor/md2chat/renderers.js
var require_renderers = __commonJS({
  "vendor/md2chat/renderers.js"(exports, module2) {
    "use strict";
    (function(root) {
      const scriptBase = typeof document === "object" && document.currentScript?.src;
      const codeImages = typeof module2 === "object" ? require_code_images() : null;
      const loading = /* @__PURE__ */ new Map(), cache = /* @__PURE__ */ new Map();
      let serial = Promise.resolve(), nextId = 0;
      function load(name2) {
        if (!loading.has(name2)) loading.set(name2, new Promise((resolve, reject) => {
          const assetBase = root.md2chatVendorBase ? new URL(root.md2chatVendorBase, location.href) : new URL("./vendor/", scriptBase);
          const script = document.createElement("script");
          script.src = new URL(name2, assetBase).href;
          script.onload = resolve;
          script.onerror = () => {
            loading.delete(name2);
            reject(new Error("\u6E32\u67D3\u5668\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u91CD\u8BD5"));
          };
          document.head.appendChild(script);
        }));
        return loading.get(name2);
      }
      async function mathEngine() {
        if (!loading.has("mathjax/tex-svg.js")) root.MathJax = { startup: { typeset: false }, tex: { packages: ["base", "ams"], maxBuffer: 1e4, maxMacros: 1e3 }, svg: { fontCache: "local" } };
        await load("mathjax/tex-svg.js");
        await root.MathJax.startup.promise;
        return root.MathJax;
      }
      async function diagramEngine() {
        await load("mermaid/mermaid.min.js");
        root.mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          suppressErrorRendering: true,
          theme: "base",
          htmlLabels: false,
          fontFamily: "Arial, sans-serif",
          maxTextSize: 3e4,
          maxEdges: 300,
          flowchart: { htmlLabels: false, useMaxWidth: false },
          themeVariables: { fontFamily: "Arial, sans-serif", fontSize: "16px", primaryColor: "#eff6ff", primaryTextColor: "#1e293b", primaryBorderColor: "#94a3b8", lineColor: "#64748b", secondaryColor: "#f1f5f9", tertiaryColor: "#ffffff", clusterBkg: "#f8fafc", clusterBorder: "#cbd5e1", edgeLabelBackground: "#ffffff", mainBkg: "#eff6ff", nodeBorder: "#94a3b8", textColor: "#1e293b" },
          themeCSS: ".node rect,.node polygon,.cluster rect{filter:none!important}.node rect{rx:6px;ry:6px}.cluster rect{rx:8px;ry:8px}",
          secure: ["secure", "securityLevel", "startOnLoad", "maxTextSize", "maxEdges", "htmlLabels", "flowchart", "themeCSS"]
        });
        return root.mermaid;
      }
      function cleanSVG(svg) {
        if (svg.querySelector("foreignObject")) throw new Error("\u6B64\u56FE\u5305\u542B\u6682\u4E0D\u652F\u6301\u7684 HTML \u6807\u7B7E\uFF0C\u8BF7\u6539\u7528\u666E\u901A\u6587\u5B57\u6807\u7B7E");
        for (const node of svg.querySelectorAll("script,iframe,object,embed,image")) node.remove();
        for (const node of [svg, ...svg.querySelectorAll("*")]) {
          for (const attr of [...node.attributes]) {
            if (/^on/i.test(attr.name) || (attr.localName === "href" || attr.name === "src") && !attr.value.startsWith("#")) node.removeAttributeNode(attr);
            else if (/url\(\s*["']?(?!#)/i.test(attr.value) && !/^url\(\s*["']?#/.test(attr.value)) throw new Error("\u56FE\u8868\u5305\u542B\u5916\u90E8\u8D44\u6E90\u5F15\u7528");
          }
        }
        for (const style of svg.querySelectorAll("style")) if (/@import|https?:|data:|file:|javascript:/i.test(style.textContent)) throw new Error("\u56FE\u8868\u5305\u542B\u5916\u90E8\u6837\u5F0F\u5F15\u7528");
      }
      async function raster(svg, width, height, padding) {
        cleanSVG(svg);
        if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) throw new Error("\u65E0\u6CD5\u786E\u5B9A\u6E32\u67D3\u5C3A\u5BF8");
        const ratio = Math.min(1, 1100 / width);
        width = Math.ceil(width * ratio);
        height = Math.ceil(height * ratio);
        if (height > 5e3 || (width + padding * 2) * (height + padding * 2) * 4 > 2e7) throw new Error("\u6E32\u67D3\u7ED3\u679C\u8FC7\u5927\uFF0C\u8BF7\u62C6\u5206\u5185\u5BB9");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.style.maxWidth = "none";
        svg.style.width = width + "px";
        svg.style.height = height + "px";
        svg.style.color = "#202938";
        const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml" }));
        try {
          const image = new Image();
          image.src = url;
          await image.decode();
          const displayWidth = width + padding * 2, displayHeight = height + padding * 2;
          const canvas = document.createElement("canvas");
          canvas.width = displayWidth * 2;
          canvas.height = displayHeight * 2;
          const ctx = canvas.getContext("2d");
          ctx.scale(2, 2);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, displayWidth, displayHeight);
          ctx.drawImage(image, padding, padding, width, height);
          return { src: canvas.toDataURL("image/png"), width: canvas.width, height: canvas.height, displayWidth, displayHeight };
        } finally {
          URL.revokeObjectURL(url);
        }
      }
      async function run(type, source, display) {
        if (type === "math" && (source.length > 1e4 || /\\(?:require|href|url|includegraphics)\b/.test(source))) throw new Error("\u516C\u5F0F\u8FC7\u957F\u6216\u542B\u4E0D\u652F\u6301\u7684\u5916\u90E8\u8D44\u6E90\u547D\u4EE4");
        if (type === "mermaid" && (source.length > 3e4 || /%%\s*\{|^\s*---|(?:https?|data|file|javascript):|\b(?:img|image)\s*:/i.test(source))) throw new Error("\u56FE\u8868\u8FC7\u957F\u6216\u542B\u914D\u7F6E/\u5916\u90E8\u8D44\u6E90\uFF1B\u8BF7\u4F7F\u7528\u4E0D\u5E26\u914D\u7F6E\u7684 Mermaid \u6E90\u7801");
        const holder = document.createElement("div");
        holder.style.cssText = "position:fixed;left:-20000px;top:0;width:1100px;font-size:20px;pointer-events:none";
        holder.setAttribute("aria-hidden", "true");
        document.body.appendChild(holder);
        try {
          if (type === "math") {
            const engine2 = await mathEngine(), container = await engine2.tex2svgPromise(source, { display });
            const bad = container.querySelector("[data-mjx-error]");
            if (bad) throw new Error("\u516C\u5F0F\u8BED\u6CD5\u9519\u8BEF\uFF1A" + bad.getAttribute("data-mjx-error"));
            holder.appendChild(container);
            const svg2 = container.querySelector("svg");
            if (!svg2) throw new Error("\u516C\u5F0F\u672A\u751F\u6210\u56FE\u50CF");
            const size = svg2.getBoundingClientRect();
            return await raster(svg2, size.width, size.height, display ? 10 : 2);
          }
          const engine = await diagramEngine(), result = await engine.render("md2chat-diagram-" + ++nextId, source, holder);
          const doc = new DOMParser().parseFromString(result.svg, "image/svg+xml");
          const svg = doc.documentElement;
          if (svg.localName !== "svg" || doc.querySelector("parsererror")) throw new Error("\u56FE\u8868\u751F\u6210\u4E86\u65E0\u6548 SVG");
          const box = (svg.getAttribute("viewBox") || "").split(/[ ,]+/).map(Number);
          return await raster(svg, box[2], box[3], 12);
        } finally {
          holder.remove();
        }
      }
      function render(type, source, display = true) {
        const key = type + "|" + display + "|" + source;
        if (cache.has(key)) return cache.get(key);
        const result = serial.then(() => run(type, source, display));
        serial = result.catch(() => {
        });
        cache.set(key, result);
        result.catch(() => cache.delete(key));
        if (cache.size > 24) cache.delete(cache.keys().next().value);
        return result;
      }
      const api = { math: (tex, display = true) => render("math", tex, display), mermaid: (source) => render("mermaid", source), code: async (source, language) => {
        await load("highlight/highlight.min.js");
        return (codeImages || root.CodeImages).render(source, language, root.hljs);
      } };
      if (typeof module2 === "object") module2.exports = api;
      else root.ChatRenderers = api;
    })(globalThis);
  }
});

// vendor/md2chat/table-images.js
var require_table_images = __commonJS({
  "vendor/md2chat/table-images.js"(exports, module2) {
    "use strict";
    (function(root) {
      function render(header, rows, document2 = root.document) {
        if (header.length > 20) throw new Error("\u8868\u683C\u6700\u591A\u652F\u6301 20 \u5217\uFF0C\u8BF7\u62C6\u5206\u540E\u8F6C\u6362\u3002");
        const count = header.length, scale = 2, width = 1100, pad = 12, fontSize = count > 6 ? 14 : 18, lineHeight = fontSize + 10;
        const widths = count === 4 ? [70, 200, 340, 490] : count === 2 ? [300, 800] : Array.from({ length: count }, (_, i) => Math.floor(width / count) + (i < width % count ? 1 : 0));
        const canvas = document2.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const font = "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif";
        ctx.font = fontSize + "px " + font;
        const wrap = (text, max) => {
          const result = [];
          let line = "";
          for (const char of text) {
            if (char === "\n") {
              result.push(line);
              line = "";
              continue;
            }
            if (line && ctx.measureText(line + char).width > max) {
              result.push(line);
              line = char;
            } else line += char;
          }
          result.push(line);
          return result;
        };
        const layout = (row) => {
          const cells = row.map((cell, i) => wrap(cell, Math.max(12, widths[i] - pad * 2)));
          return { cells, height: Math.max(...cells.map((c) => c.length)) * lineHeight + pad * 2 };
        };
        const heading = layout(header);
        const body = rows.map(layout);
        const chunks = [];
        let chunk = [], height = heading.height;
        for (const row of body) {
          if (row.height + heading.height > 4e3) throw new Error("\u5355\u4E2A\u8868\u683C\u5355\u5143\u683C\u8FC7\u957F\uFF0C\u8BF7\u62C6\u5206\u6210\u591A\u884C\u540E\u91CD\u8BD5\u3002");
          if (chunk.length && height + row.height > 1800) {
            chunks.push(chunk);
            chunk = [];
            height = heading.height;
          }
          chunk.push(row);
          height += row.height;
        }
        if (chunk.length || !chunks.length) chunks.push(chunk);
        return chunks.map((chunk2) => {
          const h = heading.height + chunk2.reduce((sum, row) => sum + row.height, 0);
          canvas.width = (width + 2) * scale;
          canvas.height = (h + 2) * scale;
          ctx.scale(scale, scale);
          ctx.textBaseline = "top";
          ctx.font = fontSize + "px " + font;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width + 2, h + 2);
          let y = 1;
          [heading, ...chunk2].forEach((row, index) => {
            let x = 1;
            row.cells.forEach((lines, i) => {
              ctx.fillStyle = index === 0 ? "#e9f0fb" : index % 2 === 0 ? "#f7f9fc" : "#ffffff";
              ctx.fillRect(x, y, widths[i], row.height);
              ctx.strokeStyle = "#c9d4e2";
              ctx.lineWidth = 1;
              ctx.strokeRect(x, y, widths[i], row.height);
              ctx.fillStyle = "#253247";
              lines.forEach((line, j) => ctx.fillText(line, x + pad, y + pad + j * lineHeight));
              x += widths[i];
            });
            y += row.height;
          });
          return { src: canvas.toDataURL("image/png"), width: canvas.width, height: canvas.height };
        });
      }
      const api = { render };
      if (typeof module2 === "object") module2.exports = api;
      else root.TableImages = api;
    })(globalThis);
  }
});

// vendor/md2chat/chat-targets.js
var require_chat_targets = __commonJS({
  "vendor/md2chat/chat-targets.js"(exports, module2) {
    "use strict";
    (function(root, factory) {
      const api = factory();
      if (typeof module2 === "object" && module2.exports) module2.exports = api;
      else root.ChatTargets = api;
    })(globalThis, () => {
      const profiles = Object.freeze({
        wechat: { label: "\u5FAE\u4FE1", note: "\u6807\u51C6\u56FE\u6587\uFF1B\u8BF7\u5728\u804A\u5929\u6846\u786E\u8BA4\u56FE\u7247\u5B8C\u6574\u3002" },
        dingtalk: { label: "\u9489\u9489", note: "\u4EC5\u9650\u684C\u9762\u7248\u3002Mac \u4F7F\u7528\u539F\u751F\u56FE\u6587\uFF1BWindows \u4F7F\u7528 Chromium \u517C\u5BB9\u56FE\u6587\uFF0C\u7C98\u8D34\u540E\u8BF7\u6838\u5BF9\u7ED3\u679C\u3002" },
        feishu: { label: "\u98DE\u4E66", note: "Mac \u684C\u9762\u7248\u8BF7\u5148\u5C55\u5F00\u98DE\u4E66\u5BCC\u6587\u672C\u8F93\u5165\u6846\uFF0C\u518D\u4E00\u6B21\u7C98\u8D34\u56FE\u6587\u3002\u7F51\u9875\u4E0E Windows \u6807\u51C6\u56FE\u6587\u4ECD\u5F85\u9A8C\u8BC1\u3002" },
        wecom: { label: "\u4F01\u5FAE", note: "\u56FE\u6587\u8BF7\u6309\u987A\u5E8F\u5206\u6BB5\u590D\u5236\u3001\u7C98\u8D34\uFF1B\u6587\u5B57\u53EF\u7F16\u8F91\uFF0C\u5F3A\u8C03\u6837\u5F0F\u4E0D\u4FDD\u8BC1\u4FDD\u7559\u3002Windows \u5F85\u9A8C\u8BC1\u3002" },
        email: { label: "\u90AE\u4EF6", note: "\u5B9E\u9A8C\u6027\u90AE\u4EF6 HTML\uFF0C\u8868\u683C\u53EF\u7F16\u8F91\uFF1B\u5185\u5D4C\u56FE\u7247\u9700\u786E\u8BA4\u5BA2\u6237\u7AEF\u7C98\u8D34\u53CA\u53D1\u9001\u540E\u4ECD\u4FDD\u7559\u3002" }
      });
      const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
      function profile(target) {
        if (!Object.hasOwn(profiles, target)) throw new Error("\u4E0D\u652F\u6301\u7684\u76EE\u6807\u5E73\u53F0");
        return profiles[target];
      }
      function headingStyle(target, platform = "web") {
        if (target === "image") return "bold";
        profile(target);
        return target === "wechat" || target === "dingtalk" && platform !== "darwin" || target === "wecom" && platform !== "darwin" ? "plain" : "bold";
      }
      function runsHtml(part, target, platform) {
        const runs = Array.isArray(part.runs) && part.runs.length < 1e4 && part.runs.every((r) => r && typeof r.text === "string") && part.runs.map((r) => r.text).join("") === part.text ? part.runs : [{ text: part.text }];
        return runs.map((r) => {
          let s = esc(r.text).replaceAll("\n", "<br>");
          const heading = Number.isInteger(r.heading) && r.heading >= 1 && r.heading <= 6;
          if (r.bold && (!heading || headingStyle(target, platform) === "bold")) s = "<strong>" + s + "</strong>";
          if (r.italic) s = "<em>" + s + "</em>";
          if (r.strikethrough) s = "<s>" + s + "</s>";
          return s;
        }).join("");
      }
      function render(parts, target, platform = "web") {
        profile(target);
        let images = 0;
        const html = parts.map((p) => {
          if (p.type === "text") return '<div style="margin:0;line-height:1.5;white-space:pre-wrap">' + runsHtml(p, target, platform) + "</div>";
          if (p.type === "table" && target === "email") return '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">' + p.rows.map((row, i) => "<tr>" + row.map((cell) => "<" + (i ? "td" : "th") + ' style="border:1px solid #ccd5df;text-align:left;' + (i ? "" : "background:#edf2f8;") + '">' + esc(cell).replaceAll("\n", "<br>") + "</" + (i ? "td" : "th") + ">").join("") + "</tr>").join("") + "</table>";
          if (p.type !== "image" || !/^data:image\/(png|jpe?g|webp|gif|bmp);base64,[A-Za-z0-9+/=]+$/i.test(p.src)) throw new Error("\u56FE\u7247\u5FC5\u987B\u662F\u5B8C\u6574\u7684\u5185\u5D4C\u56FE\u7247");
          const naturalWidth = Number.isFinite(p.width) && p.width > 0 ? p.width : null;
          const requestedWidth = Number.isFinite(p.displayWidth) && p.displayWidth > 0 ? p.displayWidth : naturalWidth;
          const width = requestedWidth === null ? null : Math.min(1100, naturalWidth ?? 1100, Math.max(1, requestedWidth));
          images++;
          return '<div style="margin:0;line-height:0"><img src="' + p.src + '"' + (width !== null ? ' width="' + width + '"' : "") + ' alt="\u56FE\u7247" style="display:block;max-width:100%;height:auto;border:0"></div>';
        }).join("");
        const body = target === "email" ? '<div style="font-family:Arial,sans-serif;font-size:14px;color:#222;line-height:1.5">' + html + "</div>" : html;
        return { html: '<meta charset="utf-8">' + body, plain: parts.map((p) => p.type === "text" ? p.text : p.type === "table" ? p.rows.map((r) => r.join(" | ")).join("\n") : "[\u56FE\u7247]").join("\n"), imageCount: images };
      }
      return { profiles, profile, headingStyle, render };
    });
  }
});

// vendor/md2chat/clipboard-image.js
var require_clipboard_image = __commonJS({
  "vendor/md2chat/clipboard-image.js"(exports, module2) {
    "use strict";
    (function(root, factory) {
      const api = factory(root);
      if (typeof module2 === "object" && module2.exports) module2.exports = api;
      else root.ClipboardImage = api;
    })(globalThis, (root) => {
      "use strict";
      const CONTENT_WIDTH = 1100, PADDING = 32, FONT_SIZE = 20, LINE_HEIGHT = 30, GAP = 16, SCALE = 2, MIN_FIT_SCALE = 1;
      const MAX_PIXELS = 2e7, MAX_DIMENSION = 32767, MAX_TEXT = 2e5, MAX_PARTS = 500, MAX_RUNS = 2e4;
      const MAX_IMAGE_SOURCE = 15 * 1024 * 1024, MAX_SOURCE = 60 * 1024 * 1024, MAX_DECODED_PIXELS = 4e7, MAX_PNG_BYTES = 10 * 1024 * 1024;
      const imageSource = /^data:image\/(png|jpe?g|gif|webp|bmp);base64,[A-Za-z0-9+/]+={0,2}$/i;
      const tooLarge = () => new Error("\u751F\u6210\u7684\u56FE\u7247\u8FC7\u5927\uFF08\u6700\u591A 2,000 \u4E07\u50CF\u7D20\uFF09\uFF0C\u8BF7\u51CF\u5C11\u5185\u5BB9\u6216\u5206\u6BB5\u8F6C\u6362\u3002");
      const tooLong = () => new Error("\u5185\u5BB9\u8FC7\u957F\uFF0C\u65E0\u6CD5\u751F\u6210\u4E00\u5F20\u6E05\u6670\u7684\u957F\u56FE\uFF0C\u8BF7\u51CF\u5C11\u5185\u5BB9\u540E\u91CD\u8BD5\u3002");
      const style = (run) => ({ bold: !!run.bold, italic: !!run.italic, strikethrough: !!run.strikethrough, code: !!run.code });
      const sameStyle = (a, b) => a.bold === b.bold && a.italic === b.italic && a.strikethrough === b.strikethrough && a.code === b.code;
      function font(run) {
        return (run.italic ? "italic " : "") + (run.bold ? "600 " : "400 ") + (run.code ? 19 : FONT_SIZE) + "px " + (run.code ? "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" : '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif');
      }
      function snapshot(parts) {
        if (!Array.isArray(parts) || !parts.length) throw new Error("\u6CA1\u6709\u53EF\u8F6C\u4E3A\u56FE\u7247\u7684\u5185\u5BB9\u3002");
        if (parts.length > MAX_PARTS) throw new Error("\u5185\u5BB9\u6BB5\u843D\u8FC7\u591A\uFF08\u6700\u591A 500 \u6BB5\uFF09\uFF0C\u8BF7\u5206\u6BB5\u8F6C\u6362\u3002");
        let textSize = 0, sourceSize = 0, runCount = 0;
        const result = parts.map((part) => {
          if (part?.type === "text" && typeof part.text === "string") {
            textSize += part.text.length;
            sourceSize += part.text.length;
            if (textSize > MAX_TEXT) throw new Error("\u6587\u5B57\u8FC7\u957F\uFF08\u6700\u591A 200,000 \u5B57\u7B26\uFF09\uFF0C\u8BF7\u5206\u6BB5\u8F6C\u6362\u3002");
            let runs;
            if (part.runs === void 0) runs = [{ text: part.text, ...style({}) }];
            else {
              if (!Array.isArray(part.runs) || (runCount += part.runs.length) > MAX_RUNS) throw new Error("\u6587\u5B57\u6837\u5F0F\u8FC7\u591A\uFF0C\u8BF7\u5206\u6BB5\u8F6C\u6362\u3002");
              let length = 0;
              runs = part.runs.map((run) => {
                if (typeof run?.text !== "string" || (length += run.text.length) > part.text.length) throw new Error("\u6587\u5B57\u6837\u5F0F\u5185\u5BB9\u65E0\u6548\uFF0C\u8BF7\u91CD\u65B0\u8F6C\u6362\u3002");
                return { text: run.text, ...style(run) };
              });
              if (runs.map((run) => run.text).join("") !== part.text) throw new Error("\u6587\u5B57\u6837\u5F0F\u5185\u5BB9\u65E0\u6548\uFF0C\u8BF7\u91CD\u65B0\u8F6C\u6362\u3002");
            }
            return { type: "text", text: part.text, runs };
          }
          if (part?.type === "image" && typeof part.src === "string") {
            if (part.src.length > MAX_IMAGE_SOURCE) throw new Error("\u5355\u5F20\u56FE\u7247\u6570\u636E\u8FC7\u5927\uFF0C\u8BF7\u538B\u7F29\u56FE\u7247\u540E\u91CD\u8BD5\u3002");
            if (!imageSource.test(part.src)) throw new Error("\u8F6C\u56FE\u7247\u4EC5\u652F\u6301\u5185\u5D4C\u7684 PNG\u3001JPEG\u3001GIF\u3001WebP \u6216 BMP \u56FE\u7247\u3002");
            if (part.displayWidth !== void 0 && (!Number.isFinite(part.displayWidth) || part.displayWidth <= 0)) throw new Error("\u56FE\u7247\u663E\u793A\u5C3A\u5BF8\u65E0\u6548\uFF0C\u8BF7\u91CD\u65B0\u8F6C\u6362\u3002");
            sourceSize += part.src.length;
            return { type: "image", src: part.src, width: part.width, height: part.height, displayWidth: part.displayWidth };
          }
          throw new Error("\u8F6C\u6362\u5185\u5BB9\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u539F\u6587\u540E\u91CD\u8BD5\u3002");
        });
        if (sourceSize > MAX_SOURCE) throw new Error("\u56FE\u6587\u6570\u636E\u8FC7\u5927\uFF0C\u8BF7\u51CF\u5C11\u56FE\u7247\u540E\u91CD\u8BD5\u3002");
        if (!result.some((part) => part.type === "image" || part.text.trim())) throw new Error("\u6CA1\u6709\u53EF\u8F6C\u4E3A\u56FE\u7247\u7684\u5185\u5BB9\u3002");
        return result;
      }
      function checkHeight(bottom, scale, contentWidth) {
        const width = Math.ceil((Math.ceil(contentWidth) + PADDING * 2) * scale), height = Math.ceil(Math.ceil(bottom + PADDING) * scale);
        if (!Number.isSafeInteger(height) || height <= 0 || height > MAX_DIMENSION || width * height > MAX_PIXELS) throw tooLarge();
        return height;
      }
      function layout(parts, measure, scale = SCALE) {
        const content = snapshot(parts), nodes = [];
        if (typeof measure !== "function") throw new Error("\u6587\u5B57\u6D4B\u91CF\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u8BD5\u3002");
        if (typeof Intl.Segmenter !== "function") throw new Error("\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u5B8C\u6574\u6587\u5B57\u6392\u7248\uFF0C\u8BF7\u66F4\u65B0\u5E94\u7528\u540E\u91CD\u8BD5\u3002");
        const segmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
        let y = PADDING, hasPart = false, contentWidth = 1;
        for (const part of content) {
          if (part.type === "text" && !part.text) continue;
          if (hasPart) y += GAP;
          hasPart = true;
          if (part.type === "image") {
            if (!Number.isFinite(part.width) || !Number.isFinite(part.height) || part.width <= 0 || part.height <= 0) throw new Error("\u56FE\u7247\u5C3A\u5BF8\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u539F\u56FE\u540E\u91CD\u8BD5\u3002");
            const ratio = Math.min(1, CONTENT_WIDTH / part.width, (part.displayWidth ?? part.width) / part.width), width2 = part.width * ratio, height2 = part.height * ratio;
            contentWidth = Math.max(contentWidth, width2);
            checkHeight(y + height2, scale, contentWidth);
            nodes.push({ type: "image", src: part.src, x: PADDING, y, width: width2, height: height2 });
            y += height2;
            continue;
          }
          let row = { type: "text", x: PADDING, y, width: 0, height: LINE_HEIGHT, runs: [] }, runIndex = 0, runEnd = part.runs[0]?.text.length || 0;
          const flush = () => {
            contentWidth = Math.max(contentWidth, row.width);
            checkHeight(y + LINE_HEIGHT, scale, contentWidth);
            nodes.push(row);
            y += LINE_HEIGHT;
            row = { type: "text", x: PADDING, y, width: 0, height: LINE_HEIGHT, runs: [] };
          };
          const widthOf = (text, run) => {
            const width2 = measure(text, run);
            if (!Number.isFinite(width2) || width2 < 0) throw new Error("\u6587\u5B57\u6392\u7248\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002");
            return width2;
          };
          for (const grapheme of segmenter.segment(part.text)) {
            while (runIndex < part.runs.length - 1 && grapheme.index >= runEnd) {
              runIndex++;
              runEnd += part.runs[runIndex].text.length;
            }
            const current = part.runs[runIndex] || style({}), glyph = grapheme.segment;
            if (glyph === "\n" || glyph === "\r" || glyph === "\r\n") {
              flush();
              continue;
            }
            const text = glyph === "	" ? "    " : glyph;
            let last = row.runs.at(-1), matches = last && sameStyle(last, current), width2 = widthOf(matches ? last.text + text : text, current);
            let added = width2 - (matches ? last.width : 0);
            if (row.width + added > CONTENT_WIDTH && row.runs.length) {
              flush();
              last = null;
              matches = false;
              width2 = widthOf(text, current);
              added = width2;
            }
            if (width2 > CONTENT_WIDTH) throw new Error("\u6587\u5B57\u4E2D\u6709\u8FC7\u957F\u7684\u7EC4\u5408\u5B57\u7B26\uFF0C\u65E0\u6CD5\u6392\u7248\uFF0C\u8BF7\u62C6\u5206\u5185\u5BB9\u540E\u91CD\u8BD5\u3002");
            if (matches) {
              last.text += text;
              last.width = width2;
            } else row.runs.push({ text, width: width2, ...style(current) });
            row.width += added;
          }
          flush();
        }
        const width = Math.ceil(contentWidth) + PADDING * 2, height = Math.ceil(y + PADDING);
        checkHeight(y, scale, contentWidth);
        return { nodes, width, height, pixelWidth: Math.ceil(width * scale), pixelHeight: Math.ceil(height * scale), scale };
      }
      async function decodeImage(src, index) {
        if (typeof root.Image !== "function") throw new Error("\u56FE\u7247\u89E3\u7801\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u91CD\u8BD5\u3002");
        const image = new root.Image();
        image.decoding = "async";
        try {
          if (typeof image.decode === "function") {
            image.src = src;
            await image.decode();
          } else await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
            image.src = src;
          });
        } catch {
          throw new Error("\u7B2C " + index + " \u5F20\u56FE\u7247\u65E0\u6CD5\u8BFB\u53D6\uFF0C\u8BF7\u68C0\u67E5\u539F\u56FE\u540E\u91CD\u8BD5\u3002");
        }
        if (!Number.isSafeInteger(image.naturalWidth) || !Number.isSafeInteger(image.naturalHeight) || image.naturalWidth <= 0 || image.naturalHeight <= 0) throw new Error("\u7B2C " + index + " \u5F20\u56FE\u7247\u5C3A\u5BF8\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u539F\u56FE\u540E\u91CD\u8BD5\u3002");
        return image;
      }
      function pngSource(canvas) {
        return new Promise((resolve, reject) => {
          try {
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error("\u56FE\u7247\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u51CF\u5C11\u5185\u5BB9\u540E\u91CD\u8BD5\u3002"));
                return;
              }
              if (blob.size > MAX_PNG_BYTES) {
                reject(new Error("\u751F\u6210\u7684 PNG \u6587\u4EF6\u8FC7\u5927\uFF08\u6700\u591A 10 MB\uFF09\uFF0C\u8BF7\u51CF\u5C11\u5185\u5BB9\u6216\u538B\u7F29\u539F\u56FE\u540E\u91CD\u8BD5\u3002"));
                return;
              }
              try {
                const reader = new root.FileReader();
                reader.onload = () => typeof reader.result === "string" && reader.result.startsWith("data:image/png;base64,") ? resolve(reader.result) : reject(new Error("PNG \u56FE\u7247\u7F16\u7801\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"));
                reader.onerror = () => reject(new Error("PNG \u56FE\u7247\u7F16\u7801\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"));
                reader.readAsDataURL(blob);
              } catch {
                reject(new Error("PNG \u56FE\u7247\u7F16\u7801\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"));
              }
            }, "image/png");
          } catch {
            reject(new Error("\u56FE\u7247\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u51CF\u5C11\u5185\u5BB9\u540E\u91CD\u8BD5\u3002"));
          }
        });
      }
      function fitScales(content, measure) {
        let base;
        try {
          base = layout(content, measure, MIN_FIT_SCALE);
        } catch (error) {
          if (error.message === tooLarge().message) throw tooLong();
          throw error;
        }
        const largest = Math.min(SCALE, Math.floor(Math.min(Math.sqrt(MAX_PIXELS / (base.width * base.height)), MAX_DIMENSION / base.height) * 20) / 20), scales = [];
        for (let scale = largest; scale > MIN_FIT_SCALE; scale = Math.round((scale - 0.25) * 100) / 100) scales.push(scale);
        return [...scales, MIN_FIT_SCALE];
      }
      async function render(parts, { fit = false } = {}) {
        const content = snapshot(parts);
        if (!root.document?.createElement) throw new Error("\u8F6C\u56FE\u7247\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5728\u5E94\u7528\u5185\u91CD\u8BD5\u3002");
        const canvas = root.document.createElement("canvas"), ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("\u8F6C\u56FE\u7247\u6682\u4E0D\u53EF\u7528\uFF0C\u8BF7\u5728\u5E94\u7528\u5185\u91CD\u8BD5\u3002");
        const images = /* @__PURE__ */ new Map();
        let decodedPixels = 0, imageIndex = 0;
        try {
          for (const part of content) {
            if (part.type !== "image") continue;
            imageIndex++;
            const cached = images.get(part.src), image = cached || await decodeImage(part.src, imageIndex);
            if (!cached) decodedPixels += image.naturalWidth * image.naturalHeight;
            if (decodedPixels > MAX_DECODED_PIXELS) throw new Error("\u539F\u56FE\u603B\u5C3A\u5BF8\u8FC7\u5927\uFF0C\u8BF7\u538B\u7F29\u56FE\u7247\u6216\u5206\u6BB5\u8F6C\u6362\u3002");
            part.width = image.naturalWidth;
            part.height = image.naturalHeight;
            images.set(part.src, image);
          }
          const measure = (text, run) => {
            ctx.font = font(run);
            return ctx.measureText(text).width;
          };
          const scales = fit ? fitScales(content, measure) : [SCALE];
          for (let attempt = 0; ; attempt++) {
            const page = layout(content, measure, scales[attempt]);
            canvas.width = page.pixelWidth;
            canvas.height = page.pixelHeight;
            ctx.scale(page.scale, page.scale);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, page.width, page.height);
            ctx.textBaseline = "alphabetic";
            for (const node of page.nodes) {
              if (node.type === "image") {
                ctx.drawImage(images.get(node.src), node.x, node.y, node.width, node.height);
                continue;
              }
              let x = node.x;
              for (const run of node.runs) {
                ctx.font = font(run);
                if (run.code) {
                  ctx.fillStyle = "#f1f3f5";
                  ctx.fillRect(x - 2, node.y + 3, run.width + 4, 24);
                }
                ctx.fillStyle = run.code ? "#334155" : "#20242b";
                ctx.fillText(run.text, x, node.y + 23);
                if (run.strikethrough) {
                  ctx.fillRect(x, node.y + 16, run.width, 1.2);
                }
                x += run.width;
              }
            }
            let src;
            try {
              src = await pngSource(canvas);
            } catch (error) {
              if (attempt + 1 < scales.length && /PNG 文件过大/.test(error.message)) continue;
              throw error;
            }
            return { type: "image", src, width: page.pixelWidth, height: page.pixelHeight, displayWidth: page.width, displayHeight: page.height };
          }
        } finally {
          canvas.width = 0;
          canvas.height = 0;
          images.clear();
        }
      }
      return Object.freeze({ render, layout, fitScales });
    });
  }
});

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);

// src/client/ShareAction.tsx
var import_react = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/convert.ts
var import_chat_markdown = __toESM(require_chat_markdown(), 1);
var import_chat_payload = __toESM(require_chat_payload(), 1);
var import_renderers = __toESM(require_renderers(), 1);
var import_table_images = __toESM(require_table_images(), 1);
var import_chat_targets = __toESM(require_chat_targets(), 1);
var import_clipboard_image = __toESM(require_clipboard_image(), 1);
var VENDOR_ROUTE = "/api/md2chat-share/vendor/";
globalThis.md2chatVendorBase = VENDOR_ROUTE;
var WORD_ROUTE = "/api/md2chat-share/word";
var TARGETS = ["wechat", "wecom", "image", "email", "word"];
function copyMode(target) {
  if (target === "wechat" || target === "wecom") return "auto";
  if (target === "image") return "image";
  return target === "email" ? "html" : "docx";
}
function chooseMode(payload, target) {
  const blocks = payload.tableCount + payload.codeImages + payload.mathImages + payload.mermaidImages + payload.originalImages;
  const characters = payload.plain.replace(/\s+/g, "").length;
  if (blocks === 0) return { mode: "text", reason: "\u53EA\u6709\u6587\u5B57\uFF1A\u76F4\u63A5\u53D1\u6587\u672C\uFF0C\u4FDD\u7559\u6362\u884C\u548C\u7F29\u8FDB" };
  if (blocks >= 3) return { mode: "image", reason: `\u6709 ${blocks} \u4E2A\u56FE\u6587\u5757\uFF0C\u6574\u6BB5\u505A\u6210\u4E00\u5F20\u957F\u56FE\u66F4\u5B8C\u6574` };
  if (characters < 300) return { mode: "image", reason: "\u5185\u5BB9\u8F83\u77ED\u4E14\u542B\u56FE\u6587\u5757\uFF0C\u4E00\u5F20\u5361\u7247\u5F0F\u957F\u56FE\u66F4\u597D\u8BFB" };
  return {
    mode: "segments",
    reason: target === "wecom" ? "\u4F01\u4E1A\u5FAE\u4FE1\u4E0D\u80FD\u6DF7\u6392\uFF1A\u6309\u987A\u5E8F\u5206\u6BB5\u53D1\u9001\uFF0C\u6587\u5B57\u4FDD\u6301\u53EF\u7F16\u8F91" : "\u4EE5\u6587\u5B57\u4E3A\u4E3B\uFF1A\u6B63\u6587\u53D1\u6587\u5B57\uFF0C\u8868\u683C/\u4EE3\u7801\u5355\u72EC\u53D1\u56FE"
  };
}
var MAX_IMAGE_BYTES = 10 * 1024 * 1024;
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error("\u65E0\u6CD5\u8BFB\u53D6\u56FE\u7247"));
    };
    reader.readAsDataURL(blob);
  });
}
async function ensureImage(asset) {
  let src = asset.src;
  if (!/^data:image\/(png|jpe?g|gif|webp|bmp);base64,/i.test(src)) {
    if (!/^https?:\/\//i.test(src)) throw new Error("\u6682\u4E0D\u652F\u6301\u672C\u5730\u6216\u76F8\u5BF9\u8DEF\u5F84\u56FE\u7247");
    const response = await fetch(src, { credentials: "omit", referrerPolicy: "no-referrer", signal: AbortSignal.timeout(12e3) });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const blob = await response.blob();
    if (!blob.type.startsWith("image/")) throw new Error("\u8FD4\u56DE\u7684\u4E0D\u662F\u56FE\u7247");
    if (blob.size > MAX_IMAGE_BYTES) throw new Error("\u5355\u5F20\u56FE\u7247\u4E0D\u80FD\u8D85\u8FC7 10 MB");
    src = await blobToDataUrl(blob);
  }
  const image = new Image();
  image.src = src;
  try {
    await image.decode();
  } catch {
    throw new Error("\u56FE\u7247\u65E0\u6CD5\u89E3\u7801");
  }
  if (image.naturalWidth * image.naturalHeight > 2e7) throw new Error("\u56FE\u7247\u4E0D\u80FD\u8D85\u8FC7 2000 \u4E07\u50CF\u7D20");
  return { src, width: image.naturalWidth, height: image.naturalHeight };
}
function convert(source) {
  return import_chat_payload.default.build(source, {
    markdown: import_chat_markdown.default,
    renderers: import_renderers.default,
    renderTable: (header, rows) => import_table_images.default.render(header, rows),
    ensureImage,
    describeImageError: (src, error) => (src.startsWith("data:") ? "\u5185\u5D4C\u56FE\u7247" : src) + "\uFF1A" + error.message
  });
}
async function copyRich(payload) {
  const adapted = payload.then((p) => {
    const result = import_chat_targets.default.render(p.emailSegments, "email");
    return { ...result, plain: p.plain };
  });
  adapted.catch(() => {
  });
  await navigator.clipboard.write([new ClipboardItem({
    "text/html": adapted.then((a) => new Blob([a.html], { type: "text/html" })),
    "text/plain": adapted.then((a) => new Blob([a.plain], { type: "text/plain" }))
  })]);
  return (await adapted).imageCount;
}
async function copyChatRich(payload) {
  const adapted = payload.then((p) => {
    const result = import_chat_targets.default.render(p.segments, "wechat");
    return { ...result, plain: p.plain };
  });
  adapted.catch(() => {
  });
  await navigator.clipboard.write([new ClipboardItem({
    "text/html": adapted.then((a) => new Blob([a.html], { type: "text/html" })),
    "text/plain": adapted.then((a) => new Blob([a.plain], { type: "text/plain" }))
  })]);
  return (await adapted).imageCount;
}
function pngBlob(src) {
  const bytes = atob(src.slice(src.indexOf(",") + 1));
  return new Blob([Uint8Array.from(bytes, (c) => c.charCodeAt(0))], { type: "image/png" });
}
async function copyPlainText(payload) {
  const text = payload.then((p) => new Blob([p.plain], { type: "text/plain" }));
  text.catch(() => {
  });
  await navigator.clipboard.write([new ClipboardItem({ "text/plain": text })]);
}
async function copySegment(segment) {
  if (segment.type === "text") {
    await navigator.clipboard.writeText(segment.text);
    return;
  }
  await navigator.clipboard.write([new ClipboardItem({ "image/png": pngBlob(segment.src) })]);
}
async function copyLongImage(payload) {
  const png = payload.then((p) => import_clipboard_image.default.render(p.segments, { fit: true })).then((image) => pngBlob(image.src));
  png.catch(() => {
  });
  await navigator.clipboard.write([new ClipboardItem({ "image/png": png })]);
}
async function makeWord(markdownSource) {
  const response = await fetch(WORD_ROUTE, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ markdown: markdownSource })
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "HTTP " + response.status);
  }
  const disposition = response.headers.get("content-disposition") ?? "";
  const encoded = /filename\*=UTF-8''([^;]+)/i.exec(disposition)?.[1];
  return {
    blob: await response.blob(),
    filename: encoded ? decodeURIComponent(encoded) : "md2chat.docx"
  };
}
function saveFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 6e4);
}

// src/client/ShareAction.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var errorMessage = (error) => error instanceof Error ? error.message : String(error);
function ShareAction({ messageId, getMarkdown, t }) {
  const [source, setSource] = (0, import_react.useState)(null);
  const [toast, setToast] = (0, import_react.useState)(null);
  const open = (0, import_react.useCallback)(() => {
    setSource(getMarkdown(messageId));
  }, [getMarkdown, messageId]);
  const close = (0, import_react.useCallback)(() => {
    setSource(null);
  }, []);
  const copied = (0, import_react.useCallback)((text) => {
    setSource(null);
    setToast(text);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: t("action.share"), side: "bottom", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "md2chat-share-action", "aria-label": t("action.share"), onClick: open, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconShareOutlineRegular, {}) }) }),
    source !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDialog, { source, t, onClose: close, onCopied: copied }),
    toast !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Toast, { text: toast, tone: "success", holdMs: 4e3, onDone: () => {
      setToast(null);
    } })
  ] });
}
function ShareDialog({ source, t, onClose, onCopied }) {
  const empty = source.trim() === "";
  const conversion = (0, import_react.useMemo)(() => empty ? null : convert(source), [empty, source]);
  const [state, setState] = (0, import_react.useState)({ kind: "converting" });
  const [copyError, setCopyError] = (0, import_react.useState)(null);
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [delivery, setDelivery] = (0, import_react.useState)(null);
  const [segments, setSegments] = (0, import_react.useState)(null);
  const [copiedSteps, setCopiedSteps] = (0, import_react.useState)([]);
  const [notice, setNotice] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (conversion === null) return;
    let alive = true;
    conversion.then(
      (payload) => {
        if (alive) setState({ kind: "ready", payload });
      },
      (error) => {
        if (alive) setState({ kind: "failed", message: errorMessage(error) });
      }
    );
    return () => {
      alive = false;
    };
  }, [conversion]);
  const fail = (0, import_react.useCallback)((error) => {
    setBusy(false);
    setCopyError(errorMessage(error));
  }, []);
  const choose = (0, import_react.useCallback)((target) => {
    if (conversion === null || busy) return;
    setCopyError(null);
    setNotice(null);
    const label = t(`target.${target}`);
    if (target === "image") {
      setBusy(true);
      copyLongImage(conversion).then(() => {
        onCopied(t("toast.image", { target: t("target.image") }));
      }, fail);
      return;
    }
    if (target === "word") {
      setBusy(true);
      makeWord(source).then((result) => {
        saveFile(result.blob, result.filename);
        onCopied(t("toast.word", { name: result.filename }));
      }, fail);
      return;
    }
    if (target === "email") {
      setBusy(true);
      copyRich(conversion).then(() => {
        onCopied(t("toast.email"));
      }, fail);
      return;
    }
    setBusy(true);
    if (state.kind === "ready") {
      const decision = chooseMode(state.payload, target);
      setDelivery(decision);
      if (decision.mode === "image") {
        copyLongImage(Promise.resolve(state.payload)).then(() => {
          onCopied(t("toast.image", { target: label }));
        }, fail);
      } else if (decision.mode === "text") {
        setSegments(null);
        copyPlainText(Promise.resolve(state.payload)).then(() => {
          onCopied(t("toast.text", { target: label }));
        }, fail);
      } else if (target === "wechat") {
        copyChatRich(Promise.resolve(state.payload)).then(() => {
          onCopied(t("toast.wechatMixed"));
        }, fail);
      } else {
        setSegments(state.payload.segments);
        setBusy(false);
        setNotice(t("segments.ready", { total: state.payload.segments.length }));
      }
      return;
    }
    conversion.then((payload) => {
      const decision = chooseMode(payload, target);
      setDelivery(decision);
      if (decision.mode === "image") {
        copyLongImage(conversion).then(() => {
          onCopied(t("toast.image", { target: label }));
        }, fail);
        return;
      }
      if (decision.mode === "text") {
        setSegments(null);
        copyPlainText(conversion).then(() => {
          onCopied(t("toast.text", { target: label }));
        }, fail);
        return;
      }
      if (target === "wechat") {
        copyChatRich(conversion).then(() => {
          onCopied(t("toast.wechatMixed"));
        }, fail);
        return;
      }
      setSegments(payload.segments);
      setBusy(false);
      setNotice(t("segments.ready", { total: payload.segments.length }));
    }, fail);
  }, [busy, conversion, fail, onCopied, source, state, t]);
  const copyStep = (0, import_react.useCallback)((index) => {
    const segment = segments?.[index];
    if (!segment) return;
    setCopyError(null);
    copySegment(segment).then(() => {
      setCopiedSteps((previous) => previous.includes(index) ? previous : [...previous, index]);
      setNotice(t("segments.step", { index: index + 1, total: segments.length }));
    }, fail);
  }, [fail, segments, t]);
  const status = empty ? { text: t("status.empty"), error: true } : state.kind === "converting" ? { text: t("status.converting"), error: false } : state.kind === "failed" ? { text: t("status.failed", { message: state.message }), error: true } : busy ? { text: t("status.copying"), error: false } : {
    text: t("status.ready", {
      images: state.payload.imageCount,
      tables: state.payload.tableImages,
      code: state.payload.codeImages,
      math: state.payload.mathImages,
      mermaid: state.payload.mermaidImages,
      original: state.payload.originalImages
    }),
    error: false
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_dsh_client_ui_primitives.Modal, { open: true, onClose, title: t("dialog.title"), closeLabel: t("dialog.close"), description: t("dialog.hint"), className: "md2chat-share-dialog", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "md2chat-share-status", role: "status", "data-error": status.error || void 0, children: status.text }),
    delivery !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "md2chat-share-status", role: "note", children: delivery.reason }),
    notice !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "md2chat-share-notice", role: "status", children: notice }),
    copyError !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "md2chat-share-status", role: "alert", "data-error": true, children: t("status.copyFailed", { message: copyError }) }),
    state.kind === "ready" && segments === null && // md2chat's preview: escaped text runs and data-URL images only, never raw Markdown HTML.
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "md2chat-share-preview", dangerouslySetInnerHTML: { __html: state.payload.preview } }),
    segments === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "md2chat-share-targets", children: TARGETS.map((target) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        className: "md2chat-share-target",
        disabled: empty || busy || state.kind === "failed",
        title: t(`mode.${copyMode(target)}`),
        onClick: () => {
          choose(target);
        },
        children: t(`target.${target}`)
      },
      target
    )) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "md2chat-share-segments", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "md2chat-share-segment-list", children: segments.map((segment, index) => {
        const done = copiedSteps.includes(index);
        const preview = segment.type === "text" ? segment.text.replace(/\s+/g, " ").trim().slice(0, 42) : "";
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "md2chat-share-segment", "data-done": done || void 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "md2chat-share-segment-index", children: String(index + 1).padStart(2, "0") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "md2chat-share-segment-kind", children: segment.type === "text" ? t("segments.text") : t("segments.image") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "md2chat-share-segment-preview", children: preview || t("segments.imageHint") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "md2chat-share-segment-copy", onClick: () => {
            copyStep(index);
          }, children: done ? t("segments.again") : t("segments.copy") })
        ] }, index);
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "md2chat-share-segment-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "md2chat-share-secondary", onClick: () => {
          if (conversion === null) return;
          setBusy(true);
          copyLongImage(conversion).then(() => {
            onCopied(t("toast.image", { target: t("target.wechat") }));
          }, fail);
        }, children: t("segments.asImage") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "md2chat-share-secondary", onClick: onClose, children: t("segments.done") })
      ] })
    ] })
  ] });
}

// src/client/locales.ts
var zh = {
  "action.share": "\u5206\u4EAB\u5230\u804A\u5929",
  "dialog.title": "\u5206\u4EAB\u5230\u804A\u5929",
  "dialog.close": "\u5173\u95ED",
  "dialog.hint": "\u5FAE\u4FE1\u3001\u4F01\u4E1A\u5FAE\u4FE1\u6309\u5185\u5BB9\u81EA\u52A8\u51B3\u5B9A\uFF1A\u7EAF\u6587\u5B57\u53D1\u6587\u672C\uFF0C\u56FE\u6587\u5757\u591A\u65F6\u53D1\u4E00\u5F20\u957F\u56FE\uFF0C\u5C11\u91CF\u56FE\u6587\u5757\u65F6\u5FAE\u4FE1\u4E00\u6B21\u7C98\u8D34\u56FE\u6587\u3001\u4F01\u4E1A\u5FAE\u4FE1\u6309\u987A\u5E8F\u5206\u6BB5\u3002\u90AE\u4EF6\u4FDD\u7559\u53EF\u7F16\u8F91\u8868\u683C\uFF0CWord \u751F\u6210\u53EF\u7F16\u8F91\u6587\u6863\u3002",
  "status.converting": "\u6B63\u5728\u8F6C\u6362\u6587\u5B57\u3001\u8868\u683C\u3001\u4EE3\u7801\u3001\u516C\u5F0F\u548C\u56FE\u8868\u2026",
  "status.ready": "\u5DF2\u51C6\u5907\u597D\uFF1A{images} \u5F20\u56FE\u7247\uFF08\u8868\u683C {tables}\u3001\u4EE3\u7801 {code}\u3001\u516C\u5F0F {math}\u3001\u56FE\u8868 {mermaid}\u3001\u539F\u56FE {original}\uFF09\u3002",
  "status.copying": "\u6B63\u5728\u590D\u5236\u2026",
  "status.empty": "\u8FD9\u6761\u56DE\u590D\u6CA1\u6709\u53EF\u5206\u4EAB\u7684\u6587\u5B57\u3002",
  "status.failed": "\u8F6C\u6362\u5931\u8D25\uFF1A{message}",
  "status.copyFailed": "\u590D\u5236\u5931\u8D25\uFF1A{message}",
  "target.wechat": "\u5FAE\u4FE1",
  "target.wecom": "\u4F01\u4E1A\u5FAE\u4FE1",
  "target.image": "\u957F\u56FE",
  "target.email": "\u90AE\u4EF6",
  "target.word": "Word",
  "mode.auto": "\u6309\u5185\u5BB9\u81EA\u52A8\u9009\u62E9\u6587\u672C / \u5206\u6BB5 / \u957F\u56FE",
  "mode.image": "\u6574\u6BB5\u4E00\u5F20\u957F\u56FE\uFF0C\u4E00\u6B21\u7C98\u8D34",
  "mode.html": "\u590D\u5236\u4E3A\u90AE\u4EF6\u56FE\u6587\uFF0C\u8868\u683C\u53EF\u7F16\u8F91",
  "mode.docx": "\u76F4\u63A5\u4E0B\u8F7D\u53EF\u7F16\u8F91\u7684 Word \u6587\u6863",
  "toast.image": "\u5DF2\u590D\u5236\u957F\u56FE\uFF0C\u8BF7\u5230{target}\u804A\u5929\u6846\u7C98\u8D34",
  "toast.text": "\u53EA\u6709\u6587\u5B57\uFF0C\u5DF2\u590D\u5236\u6587\u672C\uFF0C\u8BF7\u5230{target}\u7C98\u8D34",
  "toast.wechatMixed": "\u5DF2\u590D\u5236\u56FE\u6587\uFF08\u6587\u5B57 + \u56FE\u7247\uFF09\uFF0C\u8BF7\u5230\u5FAE\u4FE1\u4E00\u6B21\u7C98\u8D34",
  "toast.email": "\u5DF2\u590D\u5236\uFF0C\u8BF7\u5230\u90AE\u4EF6\u7F16\u8F91\u5668\u7C98\u8D34",
  "toast.word": "\u5DF2\u4E0B\u8F7D Word \u6587\u6863\uFF1A{name}",
  "segments.ready": "\u5171 {total} \u6BB5\uFF0C\u6309\u987A\u5E8F\u590D\u5236\uFF1A\u7C98\u8D34\u540E\u56DE\u5230\u8FD9\u91CC\u70B9\u4E0B\u4E00\u6BB5\u3002",
  "segments.step": "\u5DF2\u590D\u5236\u7B2C {index} / {total} \u6BB5\uFF0C\u7C98\u8D34\u540E\u7EE7\u7EED\u3002",
  "segments.text": "\u6587\u5B57",
  "segments.image": "\u56FE\u7247",
  "segments.imageHint": "\u8868\u683C / \u4EE3\u7801 / \u516C\u5F0F / \u56FE\u8868",
  "segments.copy": "\u590D\u5236",
  "segments.again": "\u518D\u590D\u5236",
  "segments.asImage": "\u6539\u6210\u957F\u56FE",
  "segments.done": "\u5B8C\u6210"
};
var en = {
  "action.share": "Share to chat",
  "dialog.title": "Share to chat",
  "dialog.close": "Close",
  "dialog.hint": "WeChat and WeCom pick automatically: text when there is nothing to rasterise, one long image for structured replies; with a few blocks WeChat pastes text+images at once and WeCom goes segment by segment. Email keeps tables editable; Word downloads an editable document.",
  "status.converting": "Converting text, tables, code, math and diagrams\u2026",
  "status.ready": "Ready: {images} images (tables {tables}, code {code}, math {math}, diagrams {mermaid}, original {original}).",
  "status.copying": "Copying\u2026",
  "status.empty": "This reply has no text to share.",
  "status.failed": "Conversion failed: {message}",
  "status.copyFailed": "Copy failed: {message}",
  "target.wechat": "WeChat",
  "target.wecom": "WeCom",
  "target.image": "Long image",
  "target.email": "Email",
  "target.word": "Word",
  "mode.auto": "Pick text, segments or a long image from the content",
  "mode.image": "One long image for the whole reply",
  "mode.html": "Copy as email HTML with editable tables",
  "mode.docx": "Download an editable Word document",
  "toast.image": "Long image copied. Paste it into the {target} chat box",
  "toast.text": "Text only: copied. Paste it into {target}",
  "toast.wechatMixed": "Text and images copied together. Paste once in WeChat",
  "toast.email": "Copied. Paste it into your email editor",
  "toast.word": "Word document downloaded: {name}",
  "segments.ready": "{total} segments. Copy them in order: paste one, then come back for the next.",
  "segments.step": "Segment {index} of {total} copied. Paste it, then continue.",
  "segments.text": "Text",
  "segments.image": "Image",
  "segments.imageHint": "table / code / math / diagram",
  "segments.copy": "Copy",
  "segments.again": "Copy again",
  "segments.asImage": "Use one long image",
  "segments.done": "Done"
};

// src/client/styles.ts
var CSS = `
.md2chat-share-action{display:inline-flex;align-items:center;justify-content:center;width:calc(28px + var(--dsh-content-font-delta,0px));height:calc(28px + var(--dsh-content-font-delta,0px));padding:6px;border:none;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer}
.md2chat-share-action svg{width:calc(15px + var(--dsh-content-font-delta,0px));height:calc(15px + var(--dsh-content-font-delta,0px))}
.md2chat-share-action:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}
.md2chat-share-dialog{width:min(560px,calc(100vw - 48px))}
.md2chat-share-status{margin:0 0 12px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-secondary)}
.md2chat-share-status[data-error]{color:var(--dsw-alias-label-danger,#d93026)}
.md2chat-share-preview{max-height:300px;overflow:auto;margin-bottom:16px;padding:12px;border:1px solid var(--dsw-alias-border-default,rgba(127,127,127,.25));border-radius:var(--dsw-radius-md,8px);background:#fff;color:#202938;font-size:14px;line-height:1.5}
.md2chat-share-preview img{max-width:100%;height:auto}
.md2chat-share-targets{display:grid;grid-template-columns:repeat(auto-fit,minmax(88px,1fr));gap:8px}
.md2chat-share-target{padding:10px 0;border:1px solid var(--dsw-alias-border-default,rgba(127,127,127,.25));border-radius:var(--dsw-radius-md,8px);background:transparent;color:var(--dsw-alias-label-primary);font-size:14px;cursor:pointer}
.md2chat-share-target:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}
.md2chat-share-target:disabled{cursor:not-allowed;opacity:.45}
.md2chat-share-notice{margin:0 0 12px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-success,#0f7b4f)}
.md2chat-share-segment-list{max-height:320px;overflow:auto;margin:0 0 12px;padding:0;list-style:none;border:1px solid var(--dsw-alias-border-default,rgba(127,127,127,.25));border-radius:var(--dsw-radius-md,8px)}
.md2chat-share-segment{display:grid;grid-template-columns:28px 52px 1fr auto;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid var(--dsw-alias-border-subtle,rgba(127,127,127,.16));font-size:13px}
.md2chat-share-segment:last-child{border-bottom:none}
.md2chat-share-segment[data-done]{opacity:.55}
.md2chat-share-segment-index{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
.md2chat-share-segment-kind{color:var(--dsw-alias-label-secondary)}
.md2chat-share-segment-preview{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-primary)}
.md2chat-share-segment-copy{padding:4px 12px;border:1px solid var(--dsw-alias-border-default,rgba(127,127,127,.25));border-radius:var(--dsw-radius-sm,6px);background:transparent;color:var(--dsw-alias-label-primary);font-size:12px;cursor:pointer}
.md2chat-share-segment-copy:hover{background:var(--dsw-alias-interactive-bg-hover)}
.md2chat-share-segment-actions{display:flex;gap:8px;justify-content:flex-end}
.md2chat-share-secondary{padding:8px 14px;border:1px solid var(--dsw-alias-border-default,rgba(127,127,127,.25));border-radius:var(--dsw-radius-md,8px);background:transparent;color:var(--dsw-alias-label-primary);font-size:13px;cursor:pointer}
.md2chat-share-secondary:hover{background:var(--dsw-alias-interactive-bg-hover)}
`;
var TAG_ID = "md2chat-dsh-share";
function injectStyles() {
  if (document.querySelector(`style[data-plugin-css="${TAG_ID}"]`) !== null) return () => {
  };
  const tag = document.createElement("style");
  tag.dataset.pluginCss = TAG_ID;
  tag.textContent = CSS;
  document.head.appendChild(tag);
  return () => {
    tag.remove();
  };
}

// src/client/reply.ts
function replyMarkdown(snapshot, messageId) {
  for (const node of snapshot?.nodes.values() ?? []) {
    if (node.kind !== "turn-tail") continue;
    const closing = node.data.closing;
    if (closing?.finalNode.messageId !== messageId) continue;
    return closing.blocks.flatMap((block) => block.kind === "text" && "text" in block ? [block.text] : []).join("");
  }
  return "";
}

// src/client/index.ts
var NS = "md2chatShare";
var name = "md2chat-share";
var inject = ["slots", "locale", "sessions", "uiConversation"];
function apply(ctx) {
  ctx.effect(() => injectStyles(), "md2chat-share: styles");
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "md2chat-share: dictionaries");
  ctx.slots.inject("conversation.chat.assistant-actions", () => ctx.slots.register({
    name: "conversation.chat.assistant-actions",
    id: "md2chat-share",
    order: 20,
    locale: NS,
    inject: (sessionId) => ({
      getMarkdown: (messageId) => {
        const binding = ctx.sessions.binding(sessionId);
        if (binding === void 0) return "";
        return replyMarkdown(ctx.uiConversation.binding(binding).target("chat").getSnapshot(), messageId);
      }
    })
  }, ShareAction));
}
return module.exports; } });
