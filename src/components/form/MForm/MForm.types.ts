import type {ReactNode, FormHTMLAttributes} from 'react'
import type {ValidatorFn, ValidationResult} from '../../../utils/validators'

export interface MFieldRegistration {
    name: string
    validate?: ValidatorFn[]
    required?: boolean
}

export interface MFormContextValue {
    values: Record<string, unknown>
    errors: Record<string, string>
    touched: Record<string, boolean>
    registerField: (reg: MFieldRegistration) => void
    unregisterField: (name: string) => void
    setFieldValue: (name: string, value: unknown) => void
    setFieldError: (name: string, error: string) => void
    setFieldTouched: (name: string, touched: boolean) => void
    validateField: (name: string) => ValidationResult
    validateAll: () => boolean
    resetForm: () => void
    isSubmitting: boolean
}

export interface MFormHelpers {
    setSubmitting: (isSubmitting: boolean) => void
    resetForm: () => void
    setFieldError: (name: string, error: string) => void
}

export interface MFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange' | 'children'> {
    initialValues?: Record<string, unknown>
    onSubmit?: (values: Record<string, unknown>, helpers: MFormHelpers) => void | Promise<void>
    onChange?: (values: Record<string, unknown>) => void
    validationMode?: 'onSubmit' | 'onBlur' | 'onChange'
    children: ReactNode | ((ctx: MFormContextValue) => ReactNode)
}

export interface MFormFieldProps {
    name: string
    validate?: ValidatorFn[]
    required?: boolean
    children: ReactNode
}
