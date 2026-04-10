import type {HTMLAttributes, ReactNode} from 'react'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export type MTabsVariant = 'underline' | 'pills'
export type MTabsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type MTabsOrientation = 'horizontal' | 'vertical'

export interface MTabsItem {
    value: string
    label: ReactNode
    content?: ReactNode
    icon?: ReactNode
    disabled?: boolean
}

export interface MTabsProps extends HTMLAttributes<HTMLDivElement> {
    items: MTabsItem[]
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    variant?: MTabsVariant
    orientation?: MTabsOrientation
    size?: MTabsSize
    fullWidth?: boolean
    showPanels?: boolean
    panelClassName?: string
    clickEffect?: MClickEffect
    rippleColor?: string
}
