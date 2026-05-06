import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MAirplaneFillIcon = forwardRef<SVGSVGElement, MIconProps>(function MAirplaneFillIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 3l1 6 8 5v1.5l-8-2v4l2 1.5v0.7l-3-1l-3 1v-0.7l2-1.5v-4l-8 2V14l8-5z" fill="currentColor" />
        </MIcon>
    )
})
