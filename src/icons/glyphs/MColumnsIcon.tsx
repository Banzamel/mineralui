import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MColumnsIcon = forwardRef<SVGSVGElement, MIconProps>(function MColumnsIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="4.5" width="4.5" height="15" rx="0.75" />
            <rect x="9.75" y="4.5" width="4.5" height="15" rx="0.75" />
            <rect x="16" y="4.5" width="4.5" height="15" rx="0.75" />
        </MIcon>
    )
})
