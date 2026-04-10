import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MMinusIcon = forwardRef<SVGSVGElement, MIconProps>(function MMinusIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M5 12h14" />
        </MIcon>
    )
})
