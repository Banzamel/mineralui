import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MArrowLeftIcon = forwardRef<SVGSVGElement, MIconProps>(function MArrowLeftIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M19 12H5" />
            <path d="M10.5 6.5L5 12l5.5 5.5" />
        </MIcon>
    )
})
