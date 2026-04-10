import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MArrowUpDownIcon = forwardRef<SVGSVGElement, MIconProps>(function MArrowUpDownIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 5v14" />
            <path d="M8.5 8.5L12 5l3.5 3.5" />
            <path d="M8.5 15.5L12 19l3.5-3.5" />
        </MIcon>
    )
})
