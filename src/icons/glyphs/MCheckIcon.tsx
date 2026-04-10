import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCheckIcon = forwardRef<SVGSVGElement, MIconProps>(function MCheckIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M5.5 12.5l4.25 4.25L18.5 8" />
        </MIcon>
    )
})
