import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MStarIcon = forwardRef<SVGSVGElement, MIconProps>(function MStarIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 4.25l2.45 4.96 5.47.79-3.96 3.86.93 5.46L12 16.9l-4.89 2.42.93-5.46L4.08 10l5.47-.79L12 4.25z" />
        </MIcon>
    )
})
