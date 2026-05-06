import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MRoomIcon = forwardRef<SVGSVGElement, MIconProps>(function MRoomIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3" y="6" width="18" height="14" rx="0.5" />
            <rect x="5" y="11" width="6" height="6" rx="0.5" />
            <path d="M5 13h6" />
            <path d="M16 20v-7h3v7" />
            <circle cx="16.6" cy="16.5" r="0.4" fill="currentColor" stroke="none" />
        </MIcon>
    )
})
