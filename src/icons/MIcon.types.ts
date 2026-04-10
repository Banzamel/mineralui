import type {ReactNode, SVGAttributes} from 'react'
import type {MColor, MSize} from '../theme'

export interface MIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'color'> {
    size?: MSize | number | string
    color?: MColor | 'inherit'
    title?: string
    children?: ReactNode
}
