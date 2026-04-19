import type {CSSProperties, HTMLAttributes} from 'react'
import type {MHiddenProps} from '../../../theme'

export type MDividerOrientation = 'horizontal' | 'vertical'
export type MDividerVariant = 'solid' | 'dashed'

export interface MDividerProps extends Omit<HTMLAttributes<HTMLElement>, 'hidden'>, MHiddenProps {
    orientation?: MDividerOrientation
    variant?: MDividerVariant
    className?: string
    style?: CSSProperties
}
