import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagSeIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagSeIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#005db8" stroke="none" />
            <rect x="3.5" y="11" width="17" height="2" fill="#fecc00" stroke="none" />
            <rect x="9" y="5" width="2" height="14" fill="#fecc00" stroke="none" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
