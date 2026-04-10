import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MDocIcon = forwardRef<SVGSVGElement, MIconProps>(function MDocIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M7 4.5h7l4 4v10a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z" />
            <path d="M14 4.5V8.5h4" />
            <path d="M8.75 12h6.5M8.75 15h5" />
        </MIcon>
    )
})
