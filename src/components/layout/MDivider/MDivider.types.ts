import type {CSSProperties, HTMLAttributes} from 'react'
import type {MHiddenProps} from '../../../theme'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type MDividerOrientation = 'horizontal' | 'vertical'
export type MDividerVariant = 'solid' | 'dashed'

export interface MDividerProps
    extends Omit<HTMLAttributes<HTMLElement>, 'hidden'>,
        LayoutUtilityProps,
        MHiddenProps {
    orientation?: MDividerOrientation
    variant?: MDividerVariant
    className?: string
    style?: CSSProperties
}
