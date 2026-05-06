import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCarFillIcon = forwardRef<SVGSVGElement, MIconProps>(function MCarFillIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path
                d="M3 17v-2.5l1.5-0.5L7 10h10l2.5 4 1.5 0.5V17a1 1 0 0 1-1 1h-1.5a1.7 1.7 0 0 0-3.4 0H8.4a1.7 1.7 0 0 0-3.4 0H4a1 1 0 0 1-1-1z"
                fill="currentColor"
            />
            <circle cx="7" cy="18" r="1.7" />
            <circle cx="17" cy="18" r="1.7" />
        </MIcon>
    )
})
