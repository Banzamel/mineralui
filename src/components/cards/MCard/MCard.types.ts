import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'
import type {MSurfaceProps} from '../../layout'
import type {MCardActionProps} from '../shared'

export interface MCardProps
    extends Omit<MSurfaceProps, 'children' | 'component' | 'to' | 'href' | 'target' | 'rel'>, MCardActionProps {
    stretch?: boolean
    color?: MColor
    /** Show skeleton placeholder instead of content */
    skeleton?: boolean
    children?: ReactNode
}

export interface MCardSectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}
