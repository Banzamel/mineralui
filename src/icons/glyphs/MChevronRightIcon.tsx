import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MChevronRightIcon = forwardRef<SVGSVGElement, MIconProps>(function MChevronRightIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M9.5 6.5L15 12l-5.5 5.5" />
        </MIcon>
    )
})
