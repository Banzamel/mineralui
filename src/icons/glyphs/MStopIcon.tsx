import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MStopIcon = forwardRef<SVGSVGElement, MIconProps>(function MStopIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="5" y="5" width="14" height="14" rx="1.5" />
        </MIcon>
    )
})
