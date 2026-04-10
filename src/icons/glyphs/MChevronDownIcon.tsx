import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MChevronDownIcon = forwardRef<SVGSVGElement, MIconProps>(function MChevronDownIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M6.5 9.5L12 15l5.5-5.5" />
        </MIcon>
    )
})
