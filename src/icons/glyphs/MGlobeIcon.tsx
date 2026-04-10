import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MGlobeIcon = forwardRef<SVGSVGElement, MIconProps>(function MGlobeIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M3.8 12h16.4" />
            <path d="M12 3.5c2.5 2.4 4 5.3 4 8.5s-1.5 6.1-4 8.5c-2.5-2.4-4-5.3-4-8.5s1.5-6.1 4-8.5z" />
        </MIcon>
    )
})
