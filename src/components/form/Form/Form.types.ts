import type {ReactNode, CSSProperties} from 'react'
import type {ValidatorFn, ValidationResult} from '../../../utils/validators'

export interface FieldRegistration {
    name: string
    validate?: ValidatorFn[]
    required?: boolean
}

export interface FormContextValue {
    values: Record<string, unknown>
    errors: Record<string, string>
    touched: Record<string, boolean>
    registerField: (reg: FieldRegistration) => void
    unregisterField: (name: string) => void
    setFieldValue: (name: string, value: unknown) => void
    setFieldError: (name: string, error: string) => void
    setFieldTouched: (name: string, touched: boolean) => void
    validateField: (name: string) => ValidationResult
    validateAll: () => boolean
    resetForm: () => void
    isSubmitting: boolean
}

export interface FormHelpers {
    setSubmitting: (isSubmitting: boolean) => void
    resetForm: () => void
    setFieldError: (name: string, error: string) => void
}

export interface FormProps {
    initialValues?: Record<string, unknown>
    onSubmit?: (values: Record<string, unknown>, helpers: FormHelpers) => void | Promise<void>
    onChange?: (values: Record<string, unknown>) => void
    validationMode?: 'onSubmit' | 'onBlur' | 'onChange'
    children: ReactNode | ((ctx: FormContextValue) => ReactNode)
    className?: string
    style?: CSSProperties
    noValidate?: boolean
}

export interface FormFieldProps {
    name: string
    validate?: ValidatorFn[]
    required?: boolean
    children: ReactNode
}
