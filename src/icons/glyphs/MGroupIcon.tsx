import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MGroupIcon = forwardRef<SVGSVGElement, MIconProps>(function MGroupIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="4" y="7" width="7" height="6" rx="1.75" />
            <rect x="9" y="4" width="11" height="8" rx="2.25" />
            <path d="M9 16h11" />
            <path d="M4 19h9" />
            <path d="M12 8h5" />
            <path d="M6.25 10h2.5" />
        </MIcon>
    )
})
