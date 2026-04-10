import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MClickIcon = forwardRef<SVGSVGElement, MIconProps>(function MClickIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
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
        </MIcon>
    )
})
