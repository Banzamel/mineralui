import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MErrorIcon = forwardRef<SVGSVGElement, MIconProps>(function MErrorIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M9 9l6 6" />
            <path d="M15 9l-6 6" />
        </MIcon>
    )
})
