import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MTerminalIcon = forwardRef<SVGSVGElement, MIconProps>(function MTerminalIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="M7 9l3 3-3 3" />
            <path d="M11.5 14.5H16" />
        </MIcon>
    )
})
