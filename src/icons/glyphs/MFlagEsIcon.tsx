import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagEsIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagEsIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#dc2626" stroke="none" />
            <path d="M3.5 8.8h17v6.4h-17z" fill="#facc15" stroke="none" />
            <path d="M7.25 10.15h1.55v3.7H7.25z" fill="#a16207" stroke="none" />
            <path d="M6.75 10.55h2.55M6.75 13.35h2.55" stroke="#f8fafc" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
