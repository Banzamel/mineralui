import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagPtIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagPtIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#da291c" stroke="none" />
            <path d="M3.5 5h6.8v14H6A2.5 2.5 0 0 1 3.5 16.5z" fill="#006233" stroke="none" />
            <circle cx="10.3" cy="12" r="1.6" fill="#f8fafc" stroke="#ffd040" strokeWidth="0.4" />
            <rect x="9.55" y="11.1" width="1.5" height="1.8" fill="#da291c" stroke="none" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
