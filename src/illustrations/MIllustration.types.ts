import type {CSSProperties, SVGAttributes} from 'react'
import type {MColor} from '../theme'

export interface MIllustrationProps extends Omit<SVGAttributes<SVGSVGElement>, 'color'> {
    /** Width and height in px or a preset */
    size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    /** Primary accent color — maps to --mineral-* tokens */
    color?: MColor | 'inherit'
    /** Accessible label — sets aria-label instead of aria-hidden */
    title?: string
    /** Disable the subtle entrance animation */
    animate?: boolean
    className?: string
    style?: CSSProperties
}
