import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagChIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagChIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#d52b1e" stroke="none" />
            <rect x="11" y="7.5" width="2" height="9" fill="#f8fafc" stroke="none" />
            <rect x="7.5" y="11" width="9" height="2" fill="#f8fafc" stroke="none" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
