import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ImageIcon = forwardRef<SVGSVGElement, IconProps>(function ImageIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="4" y="5.5" width="16" height="13" rx="2.5" />
            <circle cx="15.25" cy="9" r="1.15" />
            <path d="M6.5 16l3.15-3.15 2.4 2.4 2.85-3.1 3.6 3.85" />
        </Icon>
    )
})
