import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagCnIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagCnIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#dc2626" stroke="none" />
            <path
                d="M7.2 7.1l.55 1.1 1.2.2-.9.85.2 1.2-1.05-.55-1.05.55.2-1.2-.9-.85 1.2-.2z"
                fill="#facc15"
                stroke="none"
            />
            <path d="M10.1 6.9h.01M11.5 8.2h.01M11.45 10h.01M10 11.1h.01" stroke="#facc15" strokeWidth="1.9" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
