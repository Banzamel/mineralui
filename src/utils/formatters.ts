// Remove every non-digit character from the input.
export function stripNonDigits(value: string): string {
    return value.replace(/\D/g, '')
}

// Keep only letters and digits for identifier-like inputs.
export function stripNonAlphanumeric(value: string): string {
    return value.replace(/[^a-zA-Z0-9]/g, '')
}

// Capitalize the first letter of every detected word.
export function capitalizeWords(value: string): string {
    return value.replace(/\b\w/g, (ch) => ch.toUpperCase())
}

// Group IBAN values into blocks of four characters.
export function formatIBAN(value: string): string {
    const clean = value.replace(/\s/g, '').toUpperCase()
    return clean.replace(/(.{4})/g, '$1 ').trim()
}

// Return a raw IBAN string without grouping spaces.
export function unformatIBAN(value: string): string {
    return value.replace(/\s/g, '').toUpperCase()
}

export interface PhoneFormatOptions {
    countryCode?: string
    groupPattern?: number[]
}

const PHONE_GROUPS: Record<string, number[]> = {
    PL: [3, 3, 3],
    DE: [3, 4, 3],
    US: [3, 3, 4],
    GB: [4, 3, 3],
    FR: [2, 2, 2, 2, 2],
    DEFAULT: [3, 3, 3],
}

// Format a phone number using country-specific or custom digit groups.
export function formatPhone(value: string, options: PhoneFormatOptions = {}): string {
    const digits = stripNonDigits(value)
    if (!digits) return ''

    const groups =
        options.groupPattern ?? PHONE_GROUPS[options.countryCode?.toUpperCase() ?? ''] ?? PHONE_GROUPS.DEFAULT

    const parts: string[] = []
    let pos = 0
    for (const len of groups) {
        if (pos >= digits.length) break
        parts.push(digits.slice(pos, pos + len))
        pos += len
    }
    if (pos < digits.length) {
        parts.push(digits.slice(pos))
    }
    return parts.join(' ')
}

// Format Polish NIP values with dash separators.
export function formatNIP(value: string): string {
    const digits = stripNonDigits(value)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    if (digits.length <= 8) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`
}

export interface CurrencyFormatOptions {
    decimalSeparator?: '.' | ','
    thousandSeparator?: ' ' | '.' | ',' | ''
    precision?: number
}

// Format a numeric string using configurable currency separators and precision.
export function formatCurrency(value: string, options: CurrencyFormatOptions = {}): string {
    const {decimalSeparator = ',', thousandSeparator = ' ', precision = 2} = options

    let clean = value.replace(/[^\d.,-]/g, '')
    clean = clean.replace(',', '.')

    const parts = clean.split('.')
    let intPart = parts[0] || '0'
    let decPart = parts.length > 1 ? parts[1] : ''

    const isNegative = intPart.startsWith('-')
    if (isNegative) intPart = intPart.slice(1)

    intPart = intPart.replace(/^0+/, '') || '0'

    if (thousandSeparator) {
        intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
    }

    decPart = decPart.slice(0, precision)

    const result = decPart ? `${intPart}${decimalSeparator}${decPart}` : intPart

    return isNegative ? `-${result}` : result
}

// Parse a formatted currency string back into a number.
export function parseCurrencyToNumber(
    formatted: string,
    thousandSeparator: string = ' ',
    decimalSeparator: string = ','
): number | null {
    let clean = formatted
    if (thousandSeparator) {
        clean = clean.split(thousandSeparator).join('')
    }
    clean = clean.replace(decimalSeparator, '.')
    clean = clean.replace(/[^\d.-]/g, '')
    const num = parseFloat(clean)
    return isNaN(num) ? null : num
}

// Preserve the logical cursor position after inserting separators into the value.
export function adjustCursorAfterFormat(oldValue: string, newValue: string, oldCursor: number): number {
    let realCharsBefore = 0
    for (let i = 0; i < oldCursor && i < oldValue.length; i++) {
        if (oldValue[i] !== ' ' && oldValue[i] !== '-') {
            realCharsBefore++
        }
    }

    let count = 0
    for (let i = 0; i < newValue.length; i++) {
        if (newValue[i] !== ' ' && newValue[i] !== '-') {
            count++
        }
        if (count === realCharsBefore) {
            return i + 1
        }
    }
    return newValue.length
}

export {formatPostCode} from './postalCodes'
export {formatCardNumber} from './creditCards'
