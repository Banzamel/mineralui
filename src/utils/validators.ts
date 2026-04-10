export interface ValidationResult {
    valid: boolean
    error?: string
}

export type ValidatorFn = (value: string) => ValidationResult

const ok: ValidationResult = {valid: true}
const fail = (error: string): ValidationResult => ({valid: false, error})

// Ensure the field is not empty after trimming user input.
export function validateRequired(value: string): ValidationResult {
    return value.trim().length > 0 ? ok : fail('This field is required')
}

// Build a validator that enforces a minimum string length.
export function validateMinLength(min: number): ValidatorFn {
    return (value: string) => (value.length >= min ? ok : fail(`Minimum ${min} characters`))
}

// Build a validator that enforces a maximum string length.
export function validateMaxLength(max: number): ValidatorFn {
    return (value: string) => (value.length <= max ? ok : fail(`Maximum ${max} characters`))
}

// Build a validator around a custom regular expression.
export function validatePattern(pattern: RegExp, message?: string): ValidatorFn {
    return (value: string) => (pattern.test(value) ? ok : fail(message ?? 'Invalid format'))
}

// Validate numeric input against optional min and max bounds.
export function validateRange(min?: number, max?: number): ValidatorFn {
    return (value: string) => {
        const num = parseFloat(value)
        if (isNaN(num)) return fail('Must be a number')
        if (min !== undefined && num < min) return fail(`Minimum value is ${min}`)
        if (max !== undefined && num > max) return fail(`Maximum value is ${max}`)
        return ok
    }
}

// === Email ===

const EMAIL_RE =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// Validate email format while allowing empty optional fields.
export function validateEmail(value: string): ValidationResult {
    if (!value) return ok
    return EMAIL_RE.test(value) ? ok : fail('Invalid email address')
}

// === Phone ===

const PHONE_LENGTH: Record<string, number> = {
    PL: 9,
    DE: 10,
    US: 10,
    GB: 10,
    FR: 9,
    CZ: 9,
    SK: 9,
}

// Validate a phone number with optional country-specific digit counts.
export function validatePhone(value: string, countryCode?: string): ValidationResult {
    if (!value) return ok
    const digits = value.replace(/\D/g, '')
    if (digits.length < 7) return fail('Phone number too short')
    if (digits.length > 15) return fail('Phone number too long')
    if (countryCode) {
        const expected = PHONE_LENGTH[countryCode.toUpperCase()]
        if (expected && digits.length !== expected) {
            return fail(`Phone number should have ${expected} digits`)
        }
    }
    return ok
}

// === IBAN (MOD-97, ISO 13616) ===

const IBAN_LENGTHS: Record<string, number> = {
    AL: 28,
    AD: 24,
    AT: 20,
    AZ: 28,
    BH: 22,
    BY: 28,
    BE: 16,
    BA: 20,
    BR: 29,
    BG: 22,
    CR: 22,
    HR: 21,
    CY: 28,
    CZ: 24,
    DK: 18,
    DO: 28,
    EG: 29,
    SV: 28,
    EE: 20,
    FO: 18,
    FI: 18,
    FR: 27,
    GE: 22,
    DE: 22,
    GI: 23,
    GR: 27,
    GL: 18,
    GT: 28,
    HU: 28,
    IS: 26,
    IQ: 23,
    IE: 22,
    IL: 23,
    IT: 27,
    JO: 30,
    KZ: 20,
    XK: 20,
    KW: 30,
    LV: 21,
    LB: 28,
    LI: 21,
    LT: 20,
    LU: 20,
    MT: 31,
    MR: 27,
    MU: 30,
    MD: 24,
    MC: 27,
    ME: 22,
    NL: 18,
    MK: 19,
    NO: 15,
    PK: 24,
    PS: 29,
    PL: 28,
    PT: 25,
    QA: 29,
    RO: 24,
    LC: 32,
    SM: 27,
    SA: 24,
    RS: 22,
    SC: 31,
    SK: 24,
    SI: 19,
    ES: 24,
    SE: 24,
    CH: 21,
    TL: 23,
    TN: 24,
    TR: 26,
    UA: 29,
    AE: 23,
    GB: 22,
    VA: 22,
    VG: 24,
}

// Run the MOD-97 remainder calculation on a numeric IBAN representation.
function mod97(numStr: string): number {
    let remainder = 0
    for (let i = 0; i < numStr.length; i++) {
        remainder = (remainder * 10 + parseInt(numStr[i], 10)) % 97
    }
    return remainder
}

// Validate a full IBAN using country length rules and the MOD-97 checksum.
export function validateIBAN(value: string): ValidationResult {
    if (!value) return ok
    const iban = value.replace(/\s/g, '').toUpperCase()

    if (iban.length < 2) return fail('IBAN too short')

    const countryCode = iban.slice(0, 2)
    const expectedLength = IBAN_LENGTHS[countryCode]

    if (!expectedLength) return fail('Unknown IBAN country code')
    if (iban.length !== expectedLength) {
        return fail(`IBAN for ${countryCode} should have ${expectedLength} characters`)
    }

    // MOD-97 check: move first 4 chars to end, convert letters to numbers
    const rearranged = iban.slice(4) + iban.slice(0, 4)
    const numStr = rearranged.replace(/[A-Z]/g, (ch) => String(ch.charCodeAt(0) - 55))

    return mod97(numStr) === 1 ? ok : fail('Invalid IBAN checksum')
}

// === NIP (Polish Tax ID) ===

const NIP_WEIGHTS = [6, 5, 7, 2, 3, 4, 5, 6, 7]

// Validate a Polish NIP number with its weighted checksum.
export function validateNIP(value: string): ValidationResult {
    if (!value) return ok
    const digits = value.replace(/\D/g, '')
    if (digits.length !== 10) return fail('NIP must have 10 digits')

    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += parseInt(digits[i], 10) * NIP_WEIGHTS[i]
    }
    const checkDigit = sum % 11
    if (checkDigit === 10) return fail('Invalid NIP')
    return checkDigit === parseInt(digits[9], 10) ? ok : fail('Invalid NIP checksum')
}

// === PESEL ===

const PESEL_WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]

// Validate a Polish PESEL number with its checksum algorithm.
export function validatePESEL(value: string): ValidationResult {
    if (!value) return ok
    const digits = value.replace(/\D/g, '')
    if (digits.length !== 11) return fail('PESEL must have 11 digits')

    let sum = 0
    for (let i = 0; i < 10; i++) {
        sum += parseInt(digits[i], 10) * PESEL_WEIGHTS[i]
    }
    const checkDigit = (10 - (sum % 10)) % 10
    return checkDigit === parseInt(digits[10], 10) ? ok : fail('Invalid PESEL checksum')
}

// === REGON ===

const REGON9_WEIGHTS = [8, 9, 2, 3, 4, 5, 6, 7]
const REGON14_WEIGHTS = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8]

// Validate REGON numbers in both the 9-digit and 14-digit variants.
export function validateREGON(value: string): ValidationResult {
    if (!value) return ok
    const digits = value.replace(/\D/g, '')

    if (digits.length !== 9 && digits.length !== 14) {
        return fail('REGON must have 9 or 14 digits')
    }

    const weights = digits.length === 9 ? REGON9_WEIGHTS : REGON14_WEIGHTS
    let sum = 0
    for (let i = 0; i < weights.length; i++) {
        sum += parseInt(digits[i], 10) * weights[i]
    }
    const checkDigit = sum % 11 === 10 ? 0 : sum % 11
    const lastDigit = parseInt(digits[digits.length - 1], 10)
    return checkDigit === lastDigit ? ok : fail('Invalid REGON checksum')
}

// === Compose validators ===

// Run validators in order and stop at the first failure.
export function composeValidators(...validators: ValidatorFn[]): ValidatorFn {
    return (value: string) => {
        for (const validator of validators) {
            const result = validator(value)
            if (!result.valid) return result
        }
        return ok
    }
}

// === Date (DD/MM/YYYY, MM/DD/YYYY, YYYY/MM/DD) ===

export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD'

interface DateValidationOptions {
    format?: DateFormat
    minDate?: Date
    maxDate?: Date
}

// Parse a date string in the given format into a Date or null.
export function parseDateString(value: string, format: DateFormat = 'DD/MM/YYYY'): Date | null {
    const digits = value.replace(/\D/g, '')
    if (digits.length !== 8) return null

    let day: number, month: number, year: number
    if (format === 'DD/MM/YYYY') {
        day = parseInt(digits.slice(0, 2), 10)
        month = parseInt(digits.slice(2, 4), 10)
        year = parseInt(digits.slice(4, 8), 10)
    } else if (format === 'MM/DD/YYYY') {
        month = parseInt(digits.slice(0, 2), 10)
        day = parseInt(digits.slice(2, 4), 10)
        year = parseInt(digits.slice(4, 8), 10)
    } else {
        year = parseInt(digits.slice(0, 4), 10)
        month = parseInt(digits.slice(4, 6), 10)
        day = parseInt(digits.slice(6, 8), 10)
    }

    if (month < 1 || month > 12) return null
    if (day < 1 || day > 31) return null
    if (year < 1) return null

    const date = new Date(year, month - 1, day)
    // Verify the date didn't overflow (e.g. Feb 30 → Mar 2)
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null
    }
    return date
}

// Validate a date string with optional range constraints.
export function validateDate(value: string, options: DateValidationOptions = {}): ValidationResult {
    if (!value) return ok
    const {format = 'DD/MM/YYYY', minDate, maxDate} = options

    const digits = value.replace(/\D/g, '')
    if (digits.length !== 8) return fail('Incomplete date')

    const date = parseDateString(value, format)
    if (!date) return fail('Invalid date')

    if (minDate) {
        const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
        if (date < min) return fail('Date is too early')
    }
    if (maxDate) {
        const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
        if (date > max) return fail('Date is too far in the future')
    }

    return ok
}

export {validatePostCode} from './postalCodes'
export {validateCardNumber} from './creditCards'
