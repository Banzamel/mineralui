import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MSearchIcon = forwardRef<SVGSVGElement, MIconProps>(function MSearchIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="10.25" cy="10.25" r="6" />
            <path d="M14.55 14.55L19 19" />
            <path d="M7 10.1a3.25 3.25 0 0 1 3.25-3.25" />
            <path d="M10.25 6.85a3.25 3.25 0 0 1 2.35 1" />
        </MIcon>
    )
})
