import type {ReactNode} from 'react'
import type {MCardProps} from '../../cards'

export interface MCodeBlockProps extends Omit<MCardProps, 'children' | 'padded' | 'title'> {
    code: string
    language?: string
    title?: ReactNode
    showHeader?: boolean
    showLanguage?: boolean
    showCopyButton?: boolean
    copyLabel?: string
    copiedLabel?: string
    maxHeight?: number | string
    animated?: boolean
    lineNumbers?: boolean
}
