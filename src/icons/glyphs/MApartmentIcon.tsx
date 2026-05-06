import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MApartmentIcon = forwardRef<SVGSVGElement, MIconProps>(function MApartmentIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M3.5 5.5h7v14h-7z" />
            <path d="M11.5 8.5h7v11h-7z" />
            <path d="M5 8h1.5M7.5 8h1.5" />
            <path d="M5 11h1.5M7.5 11h1.5" />
            <path d="M5 14h1.5M7.5 14h1.5" />
            <path d="M13 11h1.5M15.5 11h1.5" />
            <path d="M13 14h1.5M15.5 14h1.5" />
            <path d="M6 19.5v-2.5h2v2.5" />
        </MIcon>
    )
})
