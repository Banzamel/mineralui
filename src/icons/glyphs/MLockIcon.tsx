import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MLockIcon = forwardRef<SVGSVGElement, MIconProps>(function MLockIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="5.5" y="10.5" width="13" height="9" rx="2.25" />
            <path d="M8.25 10.5V8.25a3.75 3.75 0 1 1 7.5 0v2.25" />
            <path d="M12 14v2.25" />
        </MIcon>
    )
})
