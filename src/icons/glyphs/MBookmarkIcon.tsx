import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MBookmarkIcon = forwardRef<SVGSVGElement, MIconProps>(function MBookmarkIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M6.5 4.5h11v15l-5.5-3.75L6.5 19.5z" />
        </MIcon>
    )
})
