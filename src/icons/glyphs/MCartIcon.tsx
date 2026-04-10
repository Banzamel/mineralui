import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCartIcon = forwardRef<SVGSVGElement, MIconProps>(function MCartIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="10" cy="18" r="1.35" />
            <circle cx="16.5" cy="18" r="1.35" />
            <path d="M4.5 6h2l1.4 7.2h8.8l2.1-5.2H8.15" />
        </MIcon>
    )
})
