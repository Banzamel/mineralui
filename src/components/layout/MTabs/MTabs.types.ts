import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralFontColor} from '../../../theme'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export type MTabsVariant = 'underline' | 'pills'
export type MTabsSize = 'sm' | 'md' | 'lg'
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
    fcolor?: MineralFontColor
    showPanels?: boolean
    panelClassName?: string
    clickEffect?: MineralClickEffect
    rippleColor?: string
}
