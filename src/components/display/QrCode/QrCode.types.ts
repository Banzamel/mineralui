import type {HTMLAttributes} from 'react'

export interface QrCodeProps extends HTMLAttributes<HTMLDivElement> {
    value: string
    size?: number
    padding?: number
    fg?: string
    bg?: string
}
