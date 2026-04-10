import type {MColor} from '../../../theme'
import type {MButtonVariant} from '../MButton/MButton.types'

export interface MScrollTopProps {
    threshold?: number
    variant?: MButtonVariant
    color?: MColor
    smooth?: boolean
    className?: string
}
