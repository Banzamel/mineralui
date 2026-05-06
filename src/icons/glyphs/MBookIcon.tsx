import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MBookIcon = forwardRef<SVGSVGElement, MIconProps>(function MBookIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="4" y="3.5" width="3" height="17" rx="0.5" />
            <rect x="7" y="3.5" width="13" height="17" rx="0.5" />
            <path d="M4 7.5h3" />
            <path d="M4 16.5h3" />
            <path d="M10 9h7" />
            <path d="M10 12.5h5" />
        </MIcon>
    )
})
