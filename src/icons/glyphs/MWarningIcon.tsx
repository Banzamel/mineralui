import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MWarningIcon = forwardRef<SVGSVGElement, MIconProps>(function MWarningIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 4l8 14H4l8-14z" />
            <path d="M12 9v4.5" />
            <path d="M12 16.5h.01" />
        </MIcon>
    )
})
