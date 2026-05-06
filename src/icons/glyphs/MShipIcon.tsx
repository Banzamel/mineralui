import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MShipIcon = forwardRef<SVGSVGElement, MIconProps>(function MShipIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M3 16.5l1.5 3a1 1 0 0 0 0.9 0.5h13.2a1 1 0 0 0 0.9-0.5L21 16.5" />
            <path d="M5 16.5v-4h14v4" />
            <path d="M5 16.5h14" />
            <path d="M12 12.5V4l5 3.5-5 1.25" />
        </MIcon>
    )
})
