import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MLayoutIcon = forwardRef<SVGSVGElement, MIconProps>(function MLayoutIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="4" y="5" width="16" height="14" rx="2.5" />
            <path d="M9 5v14" />
            <path d="M9 10.25h11" />
        </MIcon>
    )
})
