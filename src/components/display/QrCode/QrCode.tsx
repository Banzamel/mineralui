import type {CSSProperties} from 'react'
import type {QrCodeProps} from './QrCode.types'
import {cn} from '../../../utils/cn'
import './QrCode.css'

type VersionInfo = {
    version: number
    size: number
    dataWords: number
    ecWords: number
    byteLimit: number
    align: number[]
}

const versions: VersionInfo[] = [
    {version: 1, size: 21, dataWords: 19, ecWords: 7, byteLimit: 17, align: []},
    {version: 2, size: 25, dataWords: 34, ecWords: 10, byteLimit: 32, align: [6, 18]},
    {version: 3, size: 29, dataWords: 55, ecWords: 15, byteLimit: 53, align: [6, 22]},
    {version: 4, size: 33, dataWords: 80, ecWords: 20, byteLimit: 78, align: [6, 26]},
    {version: 5, size: 37, dataWords: 108, ecWords: 26, byteLimit: 106, align: [6, 30]},
]

const formatBits = [
    '111011111000100',
    '111001011110011',
    '111110110101010',
    '111100010011101',
    '110011000101111',
    '110001100011000',
    '110110001000001',
    '110100101110110',
]

const expTable = new Array<number>(512).fill(0)
const logTable = new Array<number>(256).fill(0)
const encoder = new TextEncoder()

let fieldReady = false

// Prepare log/exp lookup tables for QR Reed-Solomon math.
function ensureField() {
    if (fieldReady) return

    let value = 1

    for (let i = 0; i < 255; i += 1) {
        expTable[i] = value
        logTable[value] = i
        value <<= 1

        if (value & 0x100) {
            value ^= 0x11d
        }
    }

    for (let i = 255; i < 512; i += 1) {
        expTable[i] = expTable[i - 255]
    }

    fieldReady = true
}

// Multiply two values inside the QR Galois field.
function gfMul(a: number, b: number) {
    if (!a || !b) return 0
    ensureField()
    return expTable[logTable[a] + logTable[b]]
}

// Multiply generator polynomials used for error correction.
function polyMul(left: number[], right: number[]) {
    const next = new Array(left.length + right.length - 1).fill(0)

    for (let row = 0; row < left.length; row += 1) {
        for (let col = 0; col < right.length; col += 1) {
            next[row + col] ^= gfMul(left[row], right[col])
        }
    }

    return next
}

// Build the generator polynomial for the chosen correction size.
function makeGenerator(ecWords: number) {
    ensureField()

    let poly = [1]

    for (let i = 0; i < ecWords; i += 1) {
        poly = polyMul(poly, [1, expTable[i]])
    }

    return poly
}

// Compute Reed-Solomon error words for the current payload.
function makeErrorWords(data: number[], ecWords: number) {
    const poly = makeGenerator(ecWords)
    const work = [...data, ...new Array(ecWords).fill(0)]

    for (let i = 0; i < data.length; i += 1) {
        const factor = work[i]

        if (!factor) continue

        for (let j = 0; j < poly.length; j += 1) {
            work[i + j] ^= gfMul(poly[j], factor)
        }
    }

    return work.slice(-ecWords)
}

// Push bits in MSB order so QR payload building stays explicit.
function pushBits(target: number[], value: number, size: number) {
    for (let bit = size - 1; bit >= 0; bit -= 1) {
        target.push((value >> bit) & 1)
    }
}

// Repack a flat bit list into QR codewords.
function bitsToBytes(bits: number[]) {
    const bytes: number[] = []

    for (let i = 0; i < bits.length; i += 8) {
        let byte = 0

        for (let bit = 0; bit < 8; bit += 1) {
            byte = (byte << 1) | (bits[i + bit] ?? 0)
        }

        bytes.push(byte)
    }

    return bytes
}

// Pick the smallest supported QR version for the payload.
function pickVersion(length: number) {
    return versions.find((item) => length <= item.byteLimit) ?? null
}

// Encode a string as byte mode payload plus correction words.
function encodeData(value: string, info: VersionInfo) {
    const data = Array.from(encoder.encode(value))
    const bits: number[] = []
    const capacity = info.dataWords * 8

    pushBits(bits, 0b0100, 4)
    pushBits(bits, data.length, 8)

    data.forEach((byte) => pushBits(bits, byte, 8))

    pushBits(bits, 0, Math.min(4, capacity - bits.length))

    while (bits.length % 8 !== 0) {
        bits.push(0)
    }

    const pads = [0xec, 0x11]

    for (let i = 0; bits.length < capacity; i += 1) {
        pushBits(bits, pads[i % 2], 8)
    }

    const dataWords = bitsToBytes(bits)
    return [...dataWords, ...makeErrorWords(dataWords, info.ecWords)]
}

// Create an empty matrix before function patterns are placed.
function makeGrid(size: number) {
    return Array.from({length: size}, () => Array<boolean | null>(size).fill(null))
}

// Write a module and mark it as reserved.
function setCell(grid: (boolean | null)[][], marks: boolean[][], row: number, col: number, dark: boolean) {
    if (row < 0 || col < 0 || row >= grid.length || col >= grid.length) return
    grid[row][col] = dark
    marks[row][col] = true
}

// Place one finder pattern with its quiet white border.
function placeFinder(grid: (boolean | null)[][], marks: boolean[][], top: number, left: number) {
    for (let row = -1; row <= 7; row += 1) {
        for (let col = -1; col <= 7; col += 1) {
            const edge = row === -1 || row === 7 || col === -1 || col === 7
            const outer = row === 0 || row === 6 || col === 0 || col === 6
            const inner = row >= 2 && row <= 4 && col >= 2 && col <= 4
            setCell(grid, marks, top + row, left + col, !edge && (outer || inner))
        }
    }
}

// Place one alignment pattern unless another function block already owns it.
function placeAlign(grid: (boolean | null)[][], marks: boolean[][], center: number, middle: number) {
    if (marks[center][middle]) return

    for (let row = -2; row <= 2; row += 1) {
        for (let col = -2; col <= 2; col += 1) {
            const edge = Math.max(Math.abs(row), Math.abs(col)) === 2
            const dot = row === 0 && col === 0
            setCell(grid, marks, center + row, middle + col, edge || dot)
        }
    }
}

// Reserve format info cells before data placement starts.
function markFormat(marks: boolean[][]) {
    const size = marks.length
    const left = [
        [8, 0],
        [8, 1],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
        [8, 7],
        [8, 8],
        [7, 8],
        [5, 8],
        [4, 8],
        [3, 8],
        [2, 8],
        [1, 8],
        [0, 8],
    ]
    const right = [
        [size - 1, 8],
        [size - 2, 8],
        [size - 3, 8],
        [size - 4, 8],
        [size - 5, 8],
        [size - 6, 8],
        [size - 7, 8],
        [8, size - 8],
        [8, size - 7],
        [8, size - 6],
        [8, size - 5],
        [8, size - 4],
        [8, size - 3],
        [8, size - 2],
        [8, size - 1],
    ]

    ;[...left, ...right].forEach(([row, col]) => {
        marks[row][col] = true
    })
}

// Build the static QR scaffolding: finders, timing and align blocks.
function makeBase(info: VersionInfo) {
    const grid = makeGrid(info.size)
    const marks = Array.from({length: info.size}, () => Array<boolean>(info.size).fill(false))

    placeFinder(grid, marks, 0, 0)
    placeFinder(grid, marks, 0, info.size - 7)
    placeFinder(grid, marks, info.size - 7, 0)

    for (let i = 8; i < info.size - 8; i += 1) {
        setCell(grid, marks, 6, i, i % 2 === 0)
        setCell(grid, marks, i, 6, i % 2 === 0)
    }

    info.align.forEach((row) => {
        info.align.forEach((col) => {
            placeAlign(grid, marks, row, col)
        })
    })

    markFormat(marks)
    setCell(grid, marks, info.version * 4 + 9, 8, true)

    return {grid, marks}
}

// Fill open cells with payload bits using the QR zig-zag path.
function placeData(grid: (boolean | null)[][], marks: boolean[][], words: number[]) {
    const size = grid.length
    const bits: number[] = []

    words.forEach((word) => pushBits(bits, word, 8))

    let index = 0
    let up = true

    for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) {
            col -= 1
        }

        let row = up ? size - 1 : 0

        while (row >= 0 && row < size) {
            for (let offset = 0; offset < 2; offset += 1) {
                const x = col - offset

                if (marks[row][x]) continue

                grid[row][x] = bits[index] === 1
                index += 1
            }

            row += up ? -1 : 1
        }

        up = !up
    }

    for (let row = 0; row < size; row += 1) {
        for (let col = 0; col < size; col += 1) {
            if (!marks[row][col] && grid[row][col] == null) {
                grid[row][col] = false
            }
        }
    }
}

// Check whether the current mask flips this module.
function shouldFlip(mask: number, row: number, col: number) {
    switch (mask) {
        case 0:
            return (row + col) % 2 === 0
        case 1:
            return row % 2 === 0
        case 2:
            return col % 3 === 0
        case 3:
            return (row + col) % 3 === 0
        case 4:
            return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0
        case 5:
            return ((row * col) % 2) + ((row * col) % 3) === 0
        case 6:
            return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0
        case 7:
            return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0
        default:
            return false
    }
}

// Apply one mask while leaving reserved cells untouched.
function applyMask(grid: (boolean | null)[][], marks: boolean[][], mask: number) {
    return grid.map((line, row) =>
        line.map((cell, col) => {
            if (marks[row][col]) return Boolean(cell)
            return shouldFlip(mask, row, col) ? !cell : Boolean(cell)
        })
    )
}

// Write format bits into both reserved format strips.
function withFormat(grid: boolean[][], mask: number) {
    const size = grid.length
    const bits = formatBits[mask]
    const left = [
        [8, 0],
        [8, 1],
        [8, 2],
        [8, 3],
        [8, 4],
        [8, 5],
        [8, 7],
        [8, 8],
        [7, 8],
        [5, 8],
        [4, 8],
        [3, 8],
        [2, 8],
        [1, 8],
        [0, 8],
    ]
    const right = [
        [size - 1, 8],
        [size - 2, 8],
        [size - 3, 8],
        [size - 4, 8],
        [size - 5, 8],
        [size - 6, 8],
        [size - 7, 8],
        [8, size - 8],
        [8, size - 7],
        [8, size - 6],
        [8, size - 5],
        [8, size - 4],
        [8, size - 3],
        [8, size - 2],
        [8, size - 1],
    ]
    const next = grid.map((line) => [...line])

    bits.split('').forEach((bit, index) => {
        const dark = bit === '1'
        const [leftRow, leftCol] = left[index]
        const [rightRow, rightCol] = right[index]

        next[leftRow][leftCol] = dark
        next[rightRow][rightCol] = dark
    })

    return next
}

// Penalize long runs of the same color.
function runPenalty(values: boolean[]) {
    let score = 0
    let run = 1

    for (let i = 1; i <= values.length; i += 1) {
        if (values[i] === values[i - 1]) {
            run += 1
            continue
        }

        if (run >= 5) {
            score += run - 2
        }

        run = 1
    }

    return score
}

// Penalize large flat blocks that scan poorly.
function blockPenalty(grid: boolean[][]) {
    let score = 0

    for (let row = 0; row < grid.length - 1; row += 1) {
        for (let col = 0; col < grid.length - 1; col += 1) {
            const cell = grid[row][col]

            if (cell === grid[row][col + 1] && cell === grid[row + 1][col] && cell === grid[row + 1][col + 1]) {
                score += 3
            }
        }
    }

    return score
}

// Penalize patterns that look too similar to finder markers.
function finderPenalty(values: boolean[]) {
    const matchA = '10111010000'
    const matchB = '00001011101'
    let score = 0

    for (let i = 0; i <= values.length - 11; i += 1) {
        const slice = values
            .slice(i, i + 11)
            .map((cell) => (cell ? '1' : '0'))
            .join('')

        if (slice === matchA || slice === matchB) {
            score += 40
        }
    }

    return score
}

// Keep the dark/light balance near the QR target.
function ratioPenalty(grid: boolean[][]) {
    const total = grid.length * grid.length
    const dark = grid.flat().filter(Boolean).length
    const ratio = (dark * 100) / total
    return Math.floor(Math.abs(ratio - 50) / 5) * 10
}

// Sum the standard QR penalties for one candidate matrix.
function getPenalty(grid: boolean[][]) {
    let score = 0

    for (let row = 0; row < grid.length; row += 1) {
        score += runPenalty(grid[row])
        score += finderPenalty(grid[row])
    }

    for (let col = 0; col < grid.length; col += 1) {
        const line = grid.map((row) => row[col])
        score += runPenalty(line)
        score += finderPenalty(line)
    }

    score += blockPenalty(grid)
    score += ratioPenalty(grid)

    return score
}

// Build the final matrix and pick the mask with the lowest penalty.
function makeMatrix(value: string) {
    const data = Array.from(encoder.encode(value))
    const info = pickVersion(data.length)

    if (!info) {
        return null
    }

    const {grid, marks} = makeBase(info)
    placeData(grid, marks, encodeData(value, info))

    let bestMask = 0
    let bestGrid = withFormat(applyMask(grid, marks, 0), 0)
    let bestScore = getPenalty(bestGrid)

    for (let mask = 1; mask < 8; mask += 1) {
        const masked = withFormat(applyMask(grid, marks, mask), mask)
        const score = getPenalty(masked)

        if (score < bestScore) {
            bestMask = mask
            bestGrid = masked
            bestScore = score
        }
    }

    return {grid: bestGrid, mask: bestMask}
}

// Render a local SVG QR code without adding a runtime dependency.
export function QrCode({
    value,
    size = 144,
    padding = 4,
    fg = '#111827',
    bg = '#ffffff',
    className,
    style,
    ...rest
}: QrCodeProps) {
    const qr = makeMatrix(value)

    if (!qr) {
        return null
    }

    const dimension = qr.grid.length + padding * 2
    const nextStyle = {
        '--qr-size': `${size}px`,
        ...style,
    } as CSSProperties

    return (
        <div className={cn('qr-code', className)} style={nextStyle} {...rest}>
            <svg
                viewBox={`0 0 ${dimension} ${dimension}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="QR code"
            >
                <rect width={dimension} height={dimension} fill={bg} />
                {qr.grid.map((line, row) =>
                    line.map((cell, col) =>
                        cell ? (
                            <rect
                                key={`${row}-${col}`}
                                x={col + padding}
                                y={row + padding}
                                width="1"
                                height="1"
                                fill={fg}
                            />
                        ) : null
                    )
                )}
            </svg>
        </div>
    )
}
