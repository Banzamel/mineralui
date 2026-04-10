import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MArrowUpIcon = forwardRef<SVGSVGElement, MIconProps>(function MArrowUpIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 19V5" />
            <path d="M6.5 10.5L12 5l5.5 5.5" />
        </MIcon>
    )
})
