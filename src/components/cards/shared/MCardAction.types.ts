import type {ElementType} from 'react'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export interface MCardActionProps {
    component?: ElementType
    to?: string
    href?: string
    target?: string
    rel?: string
    interactive?: boolean
    clickEffect?: MClickEffect
    rippleColor?: string
}
