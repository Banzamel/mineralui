import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MDollarIcon = forwardRef<SVGSVGElement, MIconProps>(function MDollarIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M10.6 3.75v16.5M13.4 3.75v16.5" />
            <path d="M16 7.15c-.75-.95-1.95-1.5-3.55-1.5-2.35 0-3.95 1.08-3.95 2.88 0 1.72 1.2 2.45 3.85 3.08 2.25.54 3.15 1.03 3.15 2.4 0 1.45-1.27 2.57-3.48 2.57-1.68 0-3.03-.57-4-1.7" />
        </MIcon>
    )
})
