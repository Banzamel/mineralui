import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MSuccessIcon = forwardRef<SVGSVGElement, MIconProps>(function MSuccessIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M8.5 12.25l2.5 2.5 4.75-5" />
        </MIcon>
    )
})
