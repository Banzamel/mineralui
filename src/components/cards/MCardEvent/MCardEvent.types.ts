import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export interface MCardEventProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    title: string
    description?: string
    price?: number | string
    currency?: string
    duration?: string
    image?: string
    gallery?: string[]
    galleryAutoPlay?: boolean
    favorite?: boolean
    onFavorite?: () => void
    menuItems?: {
        label: string
        onClick?: () => void
        icon?: ReactNode
        danger?: boolean
    }[]
    onRegister?: () => void
    registerLabel?: string
    icon?: ReactNode
    color?: MColor
    date: Date | string
    location?: string
    status?: string
}
