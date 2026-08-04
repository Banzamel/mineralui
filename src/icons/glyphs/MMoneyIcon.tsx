import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MMoneyIcon = forwardRef<SVGSVGElement, MIconProps>(function MMoneyIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="2.5" y="6.5" width="19" height="11" rx="2.5" />
            <circle cx="12" cy="12" r="2.75" />
            <path d="M6 10.75v2.5" />
            <path d="M18 10.75v2.5" />
        </MIcon>
    )
})
