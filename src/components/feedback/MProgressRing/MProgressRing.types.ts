import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor, MSize} from '../../../theme'

export interface MProgressRingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Progress value, 0–100. Values outside the range are clamped. */
    value: number
    /** Token-aware size palette (xs/sm/md/lg/xl) or a custom diameter in px. Default `md`. */
    size?: MSize | number
    /** Stroke color. Default `primary`. Pass `inherit` to take from CSS context. */
    color?: MColor | 'inherit'
    /** Stroke thickness in px. Default scales with `size`. */
    thickness?: number
    /** Render the centered percentage label. Default `true`. */
    showPercent?: boolean
    /**
     * Override the centered label content (e.g. `12 / 100`, an icon, etc.).
     * When set, takes precedence over `showPercent`.
     */
    label?: ReactNode
    /** Accessible label announced to screen readers. Default `Loading {value}%`. */
    ariaLabel?: string
}
