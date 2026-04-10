import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MMenuIcon = forwardRef<SVGSVGElement, MIconProps>(function MMenuIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M5 7h14" />
            <path d="M5 12h10" />
            <path d="M5 17h14" />
            <path d="M17.5 12h1.5" />
        </MIcon>
    )
})
