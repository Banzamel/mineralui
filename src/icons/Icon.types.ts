import type {ReactNode, SVGAttributes} from 'react'
import type {MineralColor, MineralSize} from '../theme'

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'color'> {
    size?: MineralSize | number | string
    color?: MineralColor | 'inherit'
    title?: string
    children?: ReactNode
}
