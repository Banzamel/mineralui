import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MMailIcon = forwardRef<SVGSVGElement, MIconProps>(function MMailIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="6" width="17" height="12" rx="3" />
            <path d="M4.5 7.5L12 13l7.5-5.5" />
        </MIcon>
    )
})
