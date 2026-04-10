import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MArrowRightIcon = forwardRef<SVGSVGElement, MIconProps>(function MArrowRightIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M5 12h14" />
            <path d="M13.5 6.5L19 12l-5.5 5.5" />
        </MIcon>
    )
})
