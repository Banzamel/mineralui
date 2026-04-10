import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MPhoneIcon = forwardRef<SVGSVGElement, MIconProps>(function MPhoneIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="6.5" y="2.5" width="11" height="19" rx="2.75" />
            <path d="M10 5.5h4" />
            <path d="M8.75 7.75h6.5v7.75h-6.5z" />
            <path d="M11.95 18h.1" />
        </MIcon>
    )
})
