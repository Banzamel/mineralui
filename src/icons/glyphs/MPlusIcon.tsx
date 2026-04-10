import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MPlusIcon = forwardRef<SVGSVGElement, MIconProps>(function MPlusIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </MIcon>
    )
})
