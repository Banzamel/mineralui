import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MChevronLeftIcon = forwardRef<SVGSVGElement, MIconProps>(function MChevronLeftIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M14.5 6.5L9 12l5.5 5.5" />
        </MIcon>
    )
})
