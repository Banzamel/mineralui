import type {CSSProperties, HTMLAttributes} from 'react'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerVariant = 'solid' | 'dashed'

export interface DividerProps extends HTMLAttributes<HTMLElement> {
    orientation?: DividerOrientation
    variant?: DividerVariant
    className?: string
    style?: CSSProperties
}
