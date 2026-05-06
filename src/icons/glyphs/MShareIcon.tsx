import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MShareIcon = forwardRef<SVGSVGElement, MIconProps>(function MShareIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="6" cy="12" r="2.6" />
            <circle cx="17.5" cy="6" r="2.6" />
            <circle cx="17.5" cy="18" r="2.6" />
            <path d="M8.3 10.8l6.9-3.6" />
            <path d="M8.3 13.2l6.9 3.6" />
        </MIcon>
    )
})
