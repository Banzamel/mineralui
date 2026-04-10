import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MMagicIcon = forwardRef<SVGSVGElement, MIconProps>(function MMagicIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M6 18L18 6" />
            <path d="M14.5 5.5h3M16 4v3" />
            <path d="M6.5 8h2.5M7.75 6.75v2.5" />
            <path d="M15.25 15.25h2.5M16.5 14v2.5" />
        </MIcon>
    )
})
