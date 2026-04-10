import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MSortIcon = forwardRef<SVGSVGElement, MIconProps>(function MSortIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M10 6h8" />
            <path d="M10 11h5" />
            <path d="M10 16h3" />
            <path d="M5 5v12" />
            <path d="M3.5 15.5L5 17l1.5-1.5" />
            <path d="M3.5 6.5L5 5l1.5 1.5" />
        </MIcon>
    )
})
