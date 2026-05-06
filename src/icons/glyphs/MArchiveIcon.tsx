import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MArchiveIcon = forwardRef<SVGSVGElement, MIconProps>(function MArchiveIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="4" rx="0.75" />
            <path d="M5 9v9.5a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V9" />
            <path d="M9.75 13h4.5" />
        </MIcon>
    )
})
