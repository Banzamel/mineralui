import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MBooksIcon = forwardRef<SVGSVGElement, MIconProps>(function MBooksIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="5" y="3.5" width="14" height="3.5" rx="0.3" />
            <path d="M7 3.5v3.5" />
            <rect x="3.5" y="8.5" width="15.5" height="3.5" rx="0.3" />
            <path d="M5.5 8.5v3.5" />
            <rect x="4" y="13.5" width="14.5" height="3.5" rx="0.3" />
            <path d="M6 13.5v3.5" />
            <rect x="5" y="18.5" width="13" height="2" rx="0.3" />
            <path d="M7 18.5v2" />
        </MIcon>
    )
})
