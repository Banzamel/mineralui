import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MGalleryIcon = forwardRef<SVGSVGElement, MIconProps>(function MGalleryIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M8.5 4.5h7a2 2 0 0 1 2 2v5" />
            <rect x="4" y="7.5" width="13" height="10" rx="2" />
            <path d="M6.35 14.95l2.1-2.1 2.1 2.1 1.55-1.55 2.55 2.55" />
            <circle cx="13.05" cy="10.8" r="1" />
        </MIcon>
    )
})
