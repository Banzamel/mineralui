import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MRedoIcon = forwardRef<SVGSVGElement, MIconProps>(function MRedoIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M20 8H9a5 5 0 0 0 0 10h3" />
            <path d="M17 5l3 3-3 3" />
        </MIcon>
    )
})
