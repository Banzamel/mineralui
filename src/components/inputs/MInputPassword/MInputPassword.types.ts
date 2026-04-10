import type {MInputProps} from '../MInput'

export type MPasswordStrength = 'weak' | 'fair' | 'good' | 'strong'

export interface MInputPasswordProps extends Omit<MInputProps, 'type' | 'endIcon'> {
    showToggle?: boolean
    showStrength?: boolean
    onStrengthChange?: (strength: MPasswordStrength) => void
}
