import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MBugIcon = forwardRef<SVGSVGElement, MIconProps>(function MBugIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M9 8.25V6.75A3 3 0 0 1 12 3.75a3 3 0 0 1 3 3v1.5" />
            <rect x="7.25" y="8.25" width="9.5" height="10.25" rx="4.75" />
            <path d="M5 10h2.25M16.75 10H19M5 14h2.25M16.75 14H19M7.2 7 5.35 5.15M16.8 7l1.85-1.85" />
            <path d="M12 11v4.5" />
        </MIcon>
    )
})
