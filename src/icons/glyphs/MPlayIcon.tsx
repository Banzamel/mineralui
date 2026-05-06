import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MPlayIcon = forwardRef<SVGSVGElement, MIconProps>(function MPlayIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M7 4.5v15a1 1 0 0 0 1.55.83l11-7.5a1 1 0 0 0 0-1.66l-11-7.5A1 1 0 0 0 7 4.5z" />
        </MIcon>
    )
})
