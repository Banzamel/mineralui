import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MTrashIcon = forwardRef<SVGSVGElement, MIconProps>(function MTrashIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M5.5 7.5h13" />
            <path d="M9 7.5V5.75A1.75 1.75 0 0 1 10.75 4h2.5A1.75 1.75 0 0 1 15 5.75V7.5" />
            <path d="M7 7.5l.8 11a2 2 0 0 0 2 1.85h4.4a2 2 0 0 0 2-1.85l.8-11" />
            <path d="M10 11v5.5M14 11v5.5" />
        </MIcon>
    )
})
