import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MHomeIcon = forwardRef<SVGSVGElement, MIconProps>(function MHomeIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M4 10.75L12 4.5l8 6.25" />
            <path d="M6 10.1V19.5h12V10.1" />
            <path d="M9.25 19.5v-4.75h5.5v4.75" />
            <path d="M14.9 6.8h2.2v2.25" />
            <path d="M8 11.4h2.35" />
        </MIcon>
    )
})
