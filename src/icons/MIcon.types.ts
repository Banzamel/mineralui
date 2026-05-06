import type {ReactNode, SVGAttributes} from 'react'
import type {MColor, MSize} from '../theme'

export interface MIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'color'> {
    size?: MSize | number | string
    color?: MColor | 'inherit'
    title?: string
    children?: ReactNode
    /**
     * Only respected by v2 illustration-style icons (`MIconV2` and the
     * generated `M*IconV2` glyph components). When true, the rounded shell
     * card background is drawn behind the glyph. Ignored by v1 icons.
     */
    shell?: boolean
}
