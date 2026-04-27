import type {ElementType, HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'
import type {MCardActionProps} from '../shared'

export type MCardTileOverlayPosition = 'top' | 'bottom' | 'center'

export interface MCardTileMenuItem {
    label: string
    onClick?: () => void
    icon?: ReactNode
    danger?: boolean
}

export interface MCardTileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'onClick'>, MCardActionProps {
    title: string
    description?: string
    icon?: ReactNode
    color?: MColor
    onClick?: () => void
    image?: string
    video?: string
    illustration?: ReactNode
    camera?: boolean | MediaStreamConstraints
    mediaFill?: boolean
    overlayPosition?: MCardTileOverlayPosition
    favorite?: boolean
    onFavorite?: () => void
    menuItems?: MCardTileMenuItem[]
}
