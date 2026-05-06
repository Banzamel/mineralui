import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagAtIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagAtIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#ed2939" stroke="none" />
            <rect x="3.5" y="9.65" width="17" height="4.7" fill="#f8fafc" stroke="none" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
