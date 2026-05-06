import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MMoveIcon = forwardRef<SVGSVGElement, MIconProps>(function MMoveIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 3v18" />
            <path d="M3 12h18" />
            <path d="M9 6l3-3 3 3" />
            <path d="M9 18l3 3 3-3" />
            <path d="M6 9l-3 3 3 3" />
            <path d="M18 9l3 3-3 3" />
        </MIcon>
    )
})
