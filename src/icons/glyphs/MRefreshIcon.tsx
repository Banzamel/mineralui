import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MRefreshIcon = forwardRef<SVGSVGElement, MIconProps>(function MRefreshIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M18.75 5.25v4.5h-4.5" />
            <path d="m18.75 5.25-3.35 3.35" />
            <path d="M18.1 9.35A6.75 6.75 0 1 0 12.65 18.7" />
        </MIcon>
    )
})
