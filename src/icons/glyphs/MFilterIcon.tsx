import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFilterIcon = forwardRef<SVGSVGElement, MIconProps>(function MFilterIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M4 6h16L14 12.5v5l-4 2v-7L4 6z" />
            <path d="M8 6h8" />
        </MIcon>
    )
})
