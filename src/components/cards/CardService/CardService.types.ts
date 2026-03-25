import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor} from '../../../theme'

export type CardServiceVariant = 'service' | 'course' | 'product'

export interface CardServicePerson {
    name: string
    avatar?: string
}

export interface CardServiceMenuItem {
    label: string
    onClick?: () => void
    icon?: ReactNode
    danger?: boolean
}

export interface CardServiceProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    variant?: CardServiceVariant
    title: string
    description?: string
    price?: number | string
    currency?: string
    duration?: string
    available?: boolean | number
    image?: string
    gallery?: string[]
    rating?: number
    reviewCount?: number
    favorite?: boolean
    onFavorite?: () => void
    menuItems?: CardServiceMenuItem[]
    onAddToCart?: (quantity: number) => void
    icon?: ReactNode
    color?: MineralColor
    leader?: CardServicePerson
    participants?: CardServicePerson[]
    maxParticipants?: number
    quantity?: number
    onQuantityChange?: (qty: number) => void
}
