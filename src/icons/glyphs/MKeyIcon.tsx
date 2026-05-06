import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MKeyIcon = forwardRef<SVGSVGElement, MIconProps>(function MKeyIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="8" cy="12" r="3.5" />
            <path d="M11.5 12h8.5" />
            <path d="M17.5 12v3" />
            <path d="M14.5 12v2.25" />
        </MIcon>
    )
})
