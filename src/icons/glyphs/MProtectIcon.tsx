import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MProtectIcon = forwardRef<SVGSVGElement, MIconProps>(function MProtectIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 4.5l6 2.35V11c0 4.15-2.3 6.9-6 8.5-3.7-1.6-6-4.35-6-8.5V6.85z" />
            <path d="M9.25 12.15l1.75 1.75 3.75-3.9" />
        </MIcon>
    )
})
