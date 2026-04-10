import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCheckCircleIcon = forwardRef<SVGSVGElement, MIconProps>(function MCheckCircleIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.25" />
            <path d="m8.5 12 2.25 2.25L15.6 9.4" />
        </MIcon>
    )
})
