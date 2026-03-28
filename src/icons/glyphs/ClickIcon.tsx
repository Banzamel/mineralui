import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ClickIcon = forwardRef<SVGSVGElement, IconProps>(function ClickIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path
                d="M6.25 10.25v-2a5.75 5.75 0 0 1 5.75-5.75v7.75z"
                fill="currentColor"
                fillOpacity="0.18"
                stroke="none"
            />
            <rect x="6.25" y="2.5" width="11.5" height="19" rx="5.75" />
            <path d="M12 2.5v7.75" />
            <path d="M6.25 10.25h11.5" />
            <rect x="10.9" y="4" width="2.2" height="4.2" rx="1.1" />
        </Icon>
    )
})
