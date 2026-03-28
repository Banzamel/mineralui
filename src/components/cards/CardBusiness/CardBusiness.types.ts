import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor} from '../../../theme'

export type CardBusinessVariant = 'user' | 'company'

export interface CardBusinessSocial {
    platform: string
    url: string
    icon?: ReactNode
}

export interface CardBusinessAddress {
    street?: string
    city?: string
    zip?: string
    country?: string
}

export interface CardBusinessContact {
    email?: string
    phone?: string
    website?: string
}

export interface CardBusinessProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    variant?: CardBusinessVariant
    name: string
    title?: string
    avatar?: string
    address?: CardBusinessAddress
    contact?: CardBusinessContact
    socials?: CardBusinessSocial[]
    online?: boolean
    lastActive?: ReactNode
    qrCode?: string
    qrValue?: string
    color?: MineralColor
}
