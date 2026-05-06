import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagNoIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagNoIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#ba0c2f" stroke="none" />
            <rect x="3.5" y="10.5" width="17" height="3" fill="#f8fafc" stroke="none" />
            <rect x="8" y="5" width="3" height="14" fill="#f8fafc" stroke="none" />
            <rect x="3.5" y="11.25" width="17" height="1.5" fill="#00205b" stroke="none" />
            <rect x="8.75" y="5" width="1.5" height="14" fill="#00205b" stroke="none" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
