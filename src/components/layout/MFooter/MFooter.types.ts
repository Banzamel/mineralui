import type {HTMLAttributes, ReactNode} from 'react'
import type {MContainerSize} from '../MContainer'
import type {MHeaderTone} from '../MHeader'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export interface MFooterProps extends HTMLAttributes<HTMLElement>, LayoutUtilityProps {
    container?: MContainerSize
    padded?: boolean
    bordered?: boolean
    tone?: MHeaderTone
    children?: ReactNode
}
