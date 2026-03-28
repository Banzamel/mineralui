import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ClipboardIcon = forwardRef<SVGSVGElement, IconProps>(function ClipboardIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="6" y="5.5" width="12" height="15" rx="2.25" />
            <path d="M9 5.5v-1h6v1" />
            <rect x="9" y="3.5" width="6" height="3" rx="1.25" />
            <path d="M9.25 11h5.5M9.25 14h5.5" />
        </Icon>
    )
})
