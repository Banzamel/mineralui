import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'
import type {MSurfaceProps} from '../../layout'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export interface MCardProps extends Omit<MSurfaceProps, 'children'> {
    interactive?: boolean
    stretch?: boolean
    color?: MColor
    clickEffect?: MClickEffect
    rippleColor?: string
    /** Show skeleton placeholder instead of content */
    skeleton?: boolean
    children?: ReactNode
}

export interface MCardSectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}
