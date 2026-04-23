import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export type SharedServiceCardVariant = 'service' | 'course' | 'product' | 'event'

export interface SharedServiceCardPerson {
    name: string
    avatar?: string
}

export interface SharedServiceCardMenuItem {
    label: string
    onClick?: () => void
    icon?: ReactNode
    danger?: boolean
}

export interface SharedServiceCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    variant: SharedServiceCardVariant
    title: string
    description?: string
    price?: number | string
    currency?: string
    duration?: string
    available?: boolean | number
    image?: string
    gallery?: string[]
    galleryAutoPlay?: boolean
    rating?: number
    reviewCount?: number
    favorite?: boolean
    onFavorite?: () => void
    menuItems?: SharedServiceCardMenuItem[]
    onAddToCart?: (quantity: number) => void
    actionLabel?: string
    icon?: ReactNode
    color?: MColor
    leader?: SharedServiceCardPerson
    participants?: SharedServiceCardPerson[]
    maxParticipants?: number
    quantity?: number
    onQuantityChange?: (qty: number) => void
    date?: Date | string
    location?: string
    status?: string
}
