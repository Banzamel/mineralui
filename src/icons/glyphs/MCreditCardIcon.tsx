import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCreditCardIcon = forwardRef<SVGSVGElement, MIconProps>(function MCreditCardIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3" y="6" width="18" height="12" rx="2.5" />
            <path d="M3 10h18" />
            <rect x="5.5" y="12.5" width="3" height="2.5" rx="1" />
            <path d="M12 14h5.5" />
        </MIcon>
    )
})
