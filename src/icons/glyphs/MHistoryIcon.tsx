import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MHistoryIcon = forwardRef<SVGSVGElement, MIconProps>(function MHistoryIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M4 11a8 8 0 1 1 1.5 4.7" />
            <path d="M4 5v5h5" />
            <path d="M12 8v4l3 2" />
        </MIcon>
    )
})
