import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MDevicePhoneIcon = forwardRef<SVGSVGElement, MIconProps>(function MDevicePhoneIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="7.25" y="3.25" width="9.5" height="17.5" rx="2.5" />
            <path d="M10.25 6.25h3.5M12 17.6h.01" />
            <rect x="9.35" y="7.75" width="5.3" height="7.55" rx="0.8" />
        </MIcon>
    )
})
