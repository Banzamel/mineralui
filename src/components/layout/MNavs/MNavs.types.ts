import type {ElementType, HTMLAttributes, ReactNode} from 'react'
import type {MLinkProps} from '../../typography'

export type MNavsOrientation = 'horizontal' | 'vertical'

export interface MNavsItem extends Pick<MLinkProps, 'href' | 'to' | 'target' | 'rel' | 'title'> {
    key?: string
    component?: ElementType
    label: ReactNode
    current?: boolean
    disabled?: boolean
    className?: string
}

export interface MNavsProps extends HTMLAttributes<HTMLElement> {
    items?: MNavsItem[]
    orientation?: MNavsOrientation
    wrap?: boolean
    children?: ReactNode
}
