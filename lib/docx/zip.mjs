/**
 * Minimal ZIP writer for Office Open XML packages.
 *
 * A .docx is a ZIP of XML parts. Node ships zlib but no zip container, and
 * shelling out to the system `zip` binary is what made the old Word export
 * macOS-only — so the container is assembled here, in plain Node, on every
 * platform.
 */
import { deflateRawSync } from 'node:zlib'

const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let index = 0; index < 256; index += 1) {
    let value = index
    for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xEDB88320 ^ (value >>> 1) : value >>> 1
    table[index] = value >>> 0
  }
  return table
})()

/** CRC-32 (IEEE 802.3), as ZIP requires. */
export function crc32(buffer) {
  let crc = 0xFFFFFFFF
  for (let index = 0; index < buffer.length; index += 1) crc = CRC_TABLE[(crc ^ buffer[index]) & 0xFF] ^ (crc >>> 8)
  return (crc ^ 0xFFFFFFFF) >>> 0
}

/** MS-DOS date/time words; fixed timestamps keep the output reproducible. */
function dosDateTime(date) {
  const time = ((date.getHours() & 0x1F) << 11) | ((date.getMinutes() & 0x3F) << 5) | ((date.getSeconds() / 2) & 0x1F)
  const day = ((date.getFullYear() - 1980) & 0x7F) << 9 | ((date.getMonth() + 1) & 0x0F) << 5 | (date.getDate() & 0x1F)
  return { time, date: day }
}

/**
 * Build a ZIP archive.
 * @param {{ name: string, data: Buffer | string }[]} entries - archive members, in order.
 * @param {Date} [modified] - timestamp stamped on every member.
 * @returns {Buffer} the archive bytes.
 */
export function zip(entries, modified = new Date()) {
  const { time, date } = dosDateTime(modified)
  const parts = []
  const central = []
  let offset = 0

  for (const entry of entries) {
    const name = Buffer.from(entry.name, 'utf8')
    const data = Buffer.isBuffer(entry.data) ? entry.data : Buffer.from(entry.data, 'utf8')
    const checksum = crc32(data)
    const deflated = deflateRawSync(data, { level: 9 })
    const stored = deflated.length >= data.length
    const body = stored ? data : deflated
    const method = stored ? 0 : 8

    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4)
    local.writeUInt16LE(0x0800, 6) // UTF-8 file names
    local.writeUInt16LE(method, 8)
    local.writeUInt16LE(time, 10)
    local.writeUInt16LE(date, 12)
    local.writeUInt32LE(checksum, 14)
    local.writeUInt32LE(body.length, 18)
    local.writeUInt32LE(data.length, 22)
    local.writeUInt16LE(name.length, 26)
    local.writeUInt16LE(0, 28)
    parts.push(local, name, body)

    const directory = Buffer.alloc(46)
    directory.writeUInt32LE(0x02014b50, 0)
    directory.writeUInt16LE(20, 4) // version made by
    directory.writeUInt16LE(20, 6) // version needed
    directory.writeUInt16LE(0x0800, 8)
    directory.writeUInt16LE(method, 10)
    directory.writeUInt16LE(time, 12)
    directory.writeUInt16LE(date, 14)
    directory.writeUInt32LE(checksum, 16)
    directory.writeUInt32LE(body.length, 20)
    directory.writeUInt32LE(data.length, 24)
    directory.writeUInt16LE(name.length, 28)
    directory.writeUInt16LE(0, 30) // extra field length
    directory.writeUInt16LE(0, 32) // comment length
    directory.writeUInt16LE(0, 34) // disk number
    directory.writeUInt16LE(0, 36) // internal attributes
    directory.writeUInt32LE(0, 38) // external attributes
    directory.writeUInt32LE(offset, 42)
    central.push(directory, name)

    offset += local.length + name.length + body.length
  }

  const centralSize = central.reduce((total, part) => total + part.length, 0)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(0, 4)
  end.writeUInt16LE(0, 6)
  end.writeUInt16LE(entries.length, 8)
  end.writeUInt16LE(entries.length, 10)
  end.writeUInt32LE(centralSize, 12)
  end.writeUInt32LE(offset, 16)
  end.writeUInt16LE(0, 20)

  return Buffer.concat([...parts, ...central, end])
}
