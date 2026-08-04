import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCoinIcon = forwardRef<SVGSVGElement, MIconProps>(function MCoinIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5v11" />
            <path d="M14.5 10.25h-3.75a1.75 1.75 0 0 0 0 3.5h2.5a1.75 1.75 0 0 1 0 3.5H9.5" />
        </MIcon>
    )
})
