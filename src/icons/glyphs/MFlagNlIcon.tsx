import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagNlIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagNlIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#cd1f2a" stroke="none" />
            <path d="M3.5 9.65h17v4.7h-17z" fill="#f8fafc" stroke="none" />
            <path d="M3.5 14.35h17v4.65A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5z" fill="#21468b" stroke="none" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
