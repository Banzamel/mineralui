import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MLessonIcon = forwardRef<SVGSVGElement, MIconProps>(function MLessonIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M3.5 6.5l8.5 1.5 8.5-1.5v12l-8.5 1.5-8.5-1.5z" />
            <path d="M12 8v12" />
            <path d="M6.25 10.25h3" />
            <path d="M6.25 12.5h3" />
            <path d="M14.75 10.25h3" />
            <path d="M14.75 12.5h3" />
        </MIcon>
    )
})
