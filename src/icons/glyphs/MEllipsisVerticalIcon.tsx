import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MEllipsisVerticalIcon = forwardRef<SVGSVGElement, MIconProps>(function MEllipsisVerticalIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="6" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="12" cy="18" r="1.8" fill="currentColor" stroke="none" />
        </MIcon>
    )
})
