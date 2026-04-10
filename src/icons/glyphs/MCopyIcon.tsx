import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCopyIcon = forwardRef<SVGSVGElement, MIconProps>(function MCopyIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="8.85" y="8.2" width="8.85" height="9.3" rx="1.55" />
            <rect x="6.3" y="5.4" width="8.85" height="9.3" rx="1.55" />
            <path d="M10.2 10.05h4.2" />
            <path d="M9.15 11.95l1.05-1.9 1.05 1.9" />
        </MIcon>
    )
})
