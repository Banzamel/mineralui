import type {HTMLAttributes, ReactNode} from 'react'
import type {ContainerSize} from '../Container'
import type {MHeaderTone} from '../MHeader'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export interface MFooterProps extends HTMLAttributes<HTMLElement>, LayoutUtilityProps {
    container?: ContainerSize
    padded?: boolean
    bordered?: boolean
    tone?: MHeaderTone
    children?: ReactNode
}
