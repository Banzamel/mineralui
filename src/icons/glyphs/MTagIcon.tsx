import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MTagIcon = forwardRef<SVGSVGElement, MIconProps>(function MTagIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M11 4.5h6.5l2 2v6.5L10 22.5 1.5 14z" />
            <circle cx="15.25" cy="8.75" r="1" />
        </MIcon>
    )
})
