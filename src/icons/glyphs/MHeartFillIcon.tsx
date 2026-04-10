import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MHeartFillIcon = forwardRef<SVGSVGElement, MIconProps>(function MHeartFillIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path
                d="M12 19.15l-1.05-.95C6.25 13.95 4 11.55 4 8.85A3.6 3.6 0 0 1 7.6 5.25c1.65 0 3.05.9 3.85 2.2.8-1.3 2.2-2.2 3.85-2.2A3.6 3.6 0 0 1 18.9 8.85c0 2.7-2.25 5.1-6.95 9.35z"
                fill="currentColor"
                stroke="none"
            />
        </MIcon>
    )
})
