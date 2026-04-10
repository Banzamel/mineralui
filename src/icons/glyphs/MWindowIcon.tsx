import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MWindowIcon = forwardRef<SVGSVGElement, MIconProps>(function MWindowIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="4" y="5" width="16" height="14" rx="2.5" />
            <path d="M4 8.75h16" />
            <path d="M7 6.9h.01M9.3 6.9h.01M11.6 6.9h.01" strokeWidth="2.2" />
        </MIcon>
    )
})
