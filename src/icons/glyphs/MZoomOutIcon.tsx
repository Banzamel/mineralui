import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MZoomOutIcon = forwardRef<SVGSVGElement, MIconProps>(function MZoomOutIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="10.5" cy="10.5" r="5.75" />
            <path d="M8 10.5h5" />
            <path d="M15.25 15.25L19.5 19.5" />
        </MIcon>
    )
})
