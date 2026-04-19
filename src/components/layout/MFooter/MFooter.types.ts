import type {HTMLAttributes, ReactNode} from 'react'
import type {MContainerSize} from '../MContainer'
import type {MHeaderTone} from '../MHeader'
import type {MHiddenProps} from '../../../theme'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export interface MFooterProps extends Omit<HTMLAttributes<HTMLElement>, 'hidden'>, LayoutUtilityProps, MHiddenProps {
    container?: MContainerSize
    padded?: boolean
    bordered?: boolean
    tone?: MHeaderTone
    children?: ReactNode
}
