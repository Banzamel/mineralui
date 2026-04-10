import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCopyrightIcon = forwardRef<SVGSVGElement, MIconProps>(function MCopyrightIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M14.8 9.5a3.35 3.35 0 1 0 0 5" />
        </MIcon>
    )
})
