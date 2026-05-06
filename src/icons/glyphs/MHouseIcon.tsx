import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MHouseIcon = forwardRef<SVGSVGElement, MIconProps>(function MHouseIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M4 11.5L12 5l8 6.5" />
            <path d="M6 11v9h12v-9" />
            <rect x="10" y="14.5" width="4" height="5.5" />
            <circle cx="13" cy="17.5" r="0.35" fill="currentColor" stroke="none" />
            <rect x="7" y="13" width="2.5" height="2.5" />
            <path d="M16 8.5V6h2v4" />
        </MIcon>
    )
})
