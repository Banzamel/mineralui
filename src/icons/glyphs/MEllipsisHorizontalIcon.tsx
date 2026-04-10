import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MEllipsisHorizontalIcon = forwardRef<SVGSVGElement, MIconProps>(
    function MEllipsisHorizontalIcon(props, ref) {
        return (
            <MIcon ref={ref} {...props}>
                <circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none" />
            </MIcon>
        )
    }
)
