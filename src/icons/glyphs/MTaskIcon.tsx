import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MTaskIcon = forwardRef<SVGSVGElement, MIconProps>(function MTaskIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="4" y="4.5" width="16" height="15" rx="2" />
            <path d="M7.5 9.5l1.4 1.4L11.5 8.25" />
            <path d="M14 10h3.5" />
            <path d="M7.5 14.75l1.4 1.4 2.6-2.65" />
            <path d="M14 15.25h3.5" />
        </MIcon>
    )
})
