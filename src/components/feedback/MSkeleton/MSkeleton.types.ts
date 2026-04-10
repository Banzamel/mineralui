import type {CSSProperties, HTMLAttributes} from 'react'

export type MSkeletonVariant = 'text' | 'circle' | 'rectangle'

export interface MSkeletonProps extends HTMLAttributes<HTMLDivElement> {
    /** Shape of the skeleton placeholder */
    variant?: MSkeletonVariant
    /** Width — defaults to 100% for text/rectangle, size of circle for circle */
    width?: string | number
    /** Height — auto-derived from variant when omitted */
    height?: string | number
    /** Border radius override */
    radius?: string | number
    /** Number of text lines (only for variant="text") */
    lines?: number
    /** Gap between lines (only for variant="text") */
    gap?: string | number
    /** Animation mode: true resolves to shimmer, false disables animation */
    animate?: boolean | 'pulse' | 'shimmer'
    className?: string
    style?: CSSProperties
}
