import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MSunIcon = forwardRef<SVGSVGElement, MIconProps>(function MSunIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="12" r="2.75" />
            <path d="M12 4.25v2.1M12 17.65v2.1M19.75 12h-2.1M6.35 12h-2.1" />
            <path d="M17.5 6.5l-1.45 1.45M7.95 16.05L6.5 17.5M17.5 17.5l-1.45-1.45M7.95 7.95L6.5 6.5" />
        </MIcon>
    )
})
