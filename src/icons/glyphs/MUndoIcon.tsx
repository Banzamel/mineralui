import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MUndoIcon = forwardRef<SVGSVGElement, MIconProps>(function MUndoIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M4 8h11a5 5 0 0 1 0 10h-3" />
            <path d="M7 5L4 8l3 3" />
        </MIcon>
    )
})
