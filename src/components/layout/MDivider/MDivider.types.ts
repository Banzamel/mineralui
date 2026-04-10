import type {CSSProperties, HTMLAttributes} from 'react'

export type MDividerOrientation = 'horizontal' | 'vertical'
export type MDividerVariant = 'solid' | 'dashed'

export interface MDividerProps extends HTMLAttributes<HTMLElement> {
    orientation?: MDividerOrientation
    variant?: MDividerVariant
    className?: string
    style?: CSSProperties
}
