import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MNeutralIcon = forwardRef<SVGSVGElement, MIconProps>(function MNeutralIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M8.5 12h7" />
        </MIcon>
    )
})
