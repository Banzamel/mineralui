import type {HTMLAttributes, ReactNode} from 'react'
import type {ContainerSize} from '../Container/Container.types'
import type {MHeaderTone} from '../MHeader/MHeader.types'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export interface MFooterProps extends HTMLAttributes<HTMLElement>, LayoutUtilityProps {
    container?: ContainerSize
    padded?: boolean
    bordered?: boolean
    tone?: MHeaderTone
    children?: ReactNode
}
