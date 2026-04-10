import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export interface MCardCourseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
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
    menuItems?: {
        label: string
        onClick?: () => void
        icon?: ReactNode
        danger?: boolean
    }[]
    onAction?: () => void
    actionLabel?: string
    icon?: ReactNode
    color?: MColor
    leader?: {
        name: string
        avatar?: string
    }
    participants?: {
        name: string
        avatar?: string
    }[]
    maxParticipants?: number
}
