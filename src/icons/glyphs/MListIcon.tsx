import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MListIcon = forwardRef<SVGSVGElement, MIconProps>(function MListIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="5" cy="7" r="1" fill="currentColor" stroke="none" />
            <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
            <circle cx="5" cy="17" r="1" fill="currentColor" stroke="none" />
            <path d="M9 7h11" />
            <path d="M9 12h11" />
            <path d="M9 17h11" />
        </MIcon>
    )
})
