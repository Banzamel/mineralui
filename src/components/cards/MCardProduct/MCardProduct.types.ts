import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export interface MCardProductProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    title: string
    description?: string
    price?: number | string
    currency?: string
    available?: boolean | number
    image?: string
    gallery?: string[]
    galleryAutoPlay?: boolean
    rating?: number
    reviewCount?: number
    favorite?: boolean
    onFavorite?: () => void
    menuItems?: {
        label: string
        onClick?: () => void
        icon?: ReactNode
        danger?: boolean
    }[]
    onAddToCart?: (quantity: number) => void
    addToCartLabel?: string
    icon?: ReactNode
    color?: MColor
    quantity?: number
    onQuantityChange?: (qty: number) => void
}
