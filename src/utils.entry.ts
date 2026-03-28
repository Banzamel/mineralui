export {cn as mergeClasses, cn} from './utils/cn'
export {
    validateRequired,
    validateMinLength,
    validateMaxLength,
    validatePattern,
    validateRange,
    validateEmail,
    validatePhone,
    validateIBAN,
    validateNIP,
    validatePESEL,
    validateREGON,
    validatePostCode,
    validateCardNumber,
    composeValidators,
} from './utils/validators'
export type {ValidationResult, ValidatorFn} from './utils/validators'
export {
    formatPostCode,
    formatIBAN,
    formatCardNumber,
    unformatIBAN,
    formatPhone,
    formatNIP,
    formatCurrency,
    parseCurrencyToNumber,
    stripNonDigits,
    stripNonAlphanumeric,
    capitalizeWords,
    adjustCursorAfterFormat,
} from './utils/formatters'
export type {PhoneFormatOptions, CurrencyFormatOptions} from './utils/formatters'
export {getPostCodeRule, postCodeCountries, postCodeRules} from './utils/postalCodes'
export type {PostCodeRule} from './utils/postalCodes'
export {creditCardBrands, detectCardBrand, stripCardNumber} from './utils/creditCards'
export type {CreditCardBrand, CreditCardBrandDetails} from './utils/creditCards'
export {
    formatDate,
    parseDate,
    daysInMonth,
    firstDayOfMonth,
    isSameDay,
    isDateInRange,
    stripTime,
    addMonths,
    addYears,
    getDayNames,
    getMonthNames,
    parseTime,
    formatTime,
} from './utils/dateUtils'
export {useDebounce, useDebouncedCallback} from './utils/useDebounce'
export {useClickOutside as useOutsideClick, useClickOutside} from './utils/useClickOutside'
export {useKeyboardNav as useKeyNavigation, useKeyboardNav} from './utils/useKeyboardNav'
export type {UseKeyboardNavOptions, UseKeyboardNavOptions as UseKeyNavigationOptions} from './utils/useKeyboardNav'
export {useInteractionEffect as useClickEffect, useInteractionEffect} from './utils/useInteractionEffect'
export type {
    MineralClickEffect,
    UseInteractionEffectOptions,
    UseInteractionEffectResult,
} from './utils/useInteractionEffect'
export {useReveal} from './utils/useReveal'
export type {RevealProp} from './utils/useReveal'
export {useGhostText} from './utils/useGhostText'
export type {GhostTextOptions, GhostTextReturn} from './utils/useGhostText'
