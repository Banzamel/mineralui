import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCloseIcon = forwardRef<SVGSVGElement, MIconProps>(function MCloseIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
        </MIcon>
    )
})
