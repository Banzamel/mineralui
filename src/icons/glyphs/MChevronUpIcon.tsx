import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MChevronUpIcon = forwardRef<SVGSVGElement, MIconProps>(function MChevronUpIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M6.5 14.5L12 9l5.5 5.5" />
        </MIcon>
    )
})
