import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagBrIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagBrIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#16a34a" stroke="none" />
            <path d="M12 7.15l4.25 4.85L12 16.85 7.75 12z" fill="#facc15" stroke="none" />
            <circle cx="12" cy="12" r="2.05" fill="#2563eb" stroke="none" />
            <path d="M10.15 12.2c.9-.7 2.85-.75 3.7-.15" stroke="#f8fafc" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
