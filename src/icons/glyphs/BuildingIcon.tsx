import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const BuildingIcon = forwardRef<SVGSVGElement, IconProps>(function BuildingIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M6 20V7.5A1.5 1.5 0 0 1 7.5 6H16a2 2 0 0 1 2 2v12" />
            <path d="M4 20h16" />
            <path d="M8.5 9.5h1.5M12 9.5h1.5M15.5 9.5H17" />
            <path d="M8.5 13h1.5M12 13h1.5M15.5 13H17" />
            <path d="M10.5 20v-3.5h3V20" />
        </Icon>
    )
})
