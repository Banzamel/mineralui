import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'
import type {MTextTone} from '../MText'

export type MSubTextSize = 'xs' | 'sm' | 'md'
export type MSubTextTone = MTextTone

export interface MSubTextProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
    as?: 'span' | 'p' | 'div' | 'small'
    size?: MSubTextSize
    tone?: MSubTextTone
    color?: MColor
    children?: ReactNode
}
