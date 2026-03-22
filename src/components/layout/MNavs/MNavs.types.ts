import type {ElementType, HTMLAttributes, ReactNode} from 'react'
import type {MLinkProps} from '../../typography/Link/Link.types'
import type {MineralFontColor} from '../../../theme'

export type MNavsOrientation = 'horizontal' | 'vertical'
export type MNavsGap = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

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
    gap?: MNavsGap
    fcolor?: MineralFontColor
    wrap?: boolean
    children?: ReactNode
}
