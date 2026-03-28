import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const DocCopyIcon = forwardRef<SVGSVGElement, IconProps>(function DocCopyIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="9.25" y="6.1" width="9" height="11.65" rx="1.5" />
            <path d="M7.25 16.4H6.5A1.75 1.75 0 0 1 4.75 14.65V6.25A1.75 1.75 0 0 1 6.5 4.5h7.75A1.75 1.75 0 0 1 16 6.25V7" />
            <path d="M11.5 10.1h4.4M11.5 12.85h4.4M11.5 15.6h3.2" />
        </Icon>
    )
})
