import type {MButtonProps} from '../MButton'

export type MSocialButtonPlatform = 'google' | 'facebook' | 'apple' | 'microsoft' | 'pinterest' | 'linkedin'
export type MSocialButtonVariant = 'outline' | 'dark' | 'light'
export type MSocialButtonIconShape = 'circle' | 'square'

export interface MSocialButtonProps extends Omit<
    MButtonProps,
    | 'variant'
    | 'color'
    | 'rounded'
    | 'shape'
    | 'startIcon'
    | 'endIcon'
    | 'iconOnly'
    | 'badge'
    | 'badgeColor'
    | 'badgePulsing'
> {
    platform?: MSocialButtonPlatform
    variant?: MSocialButtonVariant
    iconOnly?: boolean
    iconShape?: MSocialButtonIconShape
}
