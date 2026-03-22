import type {InputProps} from '../Input'

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong'

export interface InputPasswordProps extends Omit<InputProps, 'type' | 'endIcon'> {
    showToggle?: boolean
    showStrength?: boolean
    onStrengthChange?: (strength: PasswordStrength) => void
}
