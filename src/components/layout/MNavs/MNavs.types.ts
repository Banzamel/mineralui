import type {ComponentType, ElementType, HTMLAttributes, ReactNode} from 'react'
import type {MLinkProps} from '../../typography'
import type {MSize} from '../../../theme'

export type MNavsOrientation = 'horizontal' | 'vertical'

export type MNavsItemIconSize = MSize | number | string

export interface MNavsItemIconProps {
    className?: string
    size?: MNavsItemIconSize
    'aria-hidden'?: boolean
}

export interface MNavsItem extends Pick<MLinkProps, 'href' | 'to' | 'target' | 'rel' | 'title'> {
    key?: string
    component?: ElementType
    label?: ReactNode
    icon?: ComponentType<MNavsItemIconProps>
    iconOnly?: boolean
    iconSize?: MNavsItemIconSize
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
