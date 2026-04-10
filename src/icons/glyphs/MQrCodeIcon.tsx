import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MQrCodeIcon = forwardRef<SVGSVGElement, MIconProps>(function MQrCodeIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="3" height="3" />
            <rect x="18" y="14" width="3" height="3" />
            <rect x="14" y="18" width="3" height="3" />
            <rect x="18" y="18" width="3" height="3" />
            <rect x="5.5" y="5.5" width="2" height="2" fill="currentColor" stroke="none" />
            <rect x="16.5" y="5.5" width="2" height="2" fill="currentColor" stroke="none" />
            <rect x="5.5" y="16.5" width="2" height="2" fill="currentColor" stroke="none" />
        </MIcon>
    )
})
