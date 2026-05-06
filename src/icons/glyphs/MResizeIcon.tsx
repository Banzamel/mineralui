import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MResizeIcon = forwardRef<SVGSVGElement, MIconProps>(function MResizeIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M5 5l14 14" />
            <path d="M5 10V5h5" />
            <path d="M19 14v5h-5" />
        </MIcon>
    )
})
