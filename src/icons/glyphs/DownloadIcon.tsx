import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const DownloadIcon = forwardRef<SVGSVGElement, IconProps>(function DownloadIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 4.5v10" />
            <path d="M8.5 11.5L12 15l3.5-3.5" />
            <path d="M5 18.5h14" />
            <path d="M7 18.5v1M17 18.5v1" />
        </Icon>
    )
})
