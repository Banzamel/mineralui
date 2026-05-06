import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MUrgentIcon = forwardRef<SVGSVGElement, MIconProps>(function MUrgentIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M7 14.5h10v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
            <path d="M8 14.5v-3.5a4 4 0 0 1 8 0v3.5" />
            <path d="M12 5.5V3.5" />
            <path d="M5 11.5H3.5" />
            <path d="M20.5 11.5H19" />
            <path d="M5.5 7L4.5 6" />
            <path d="M18.5 7l1-1" />
        </MIcon>
    )
})
