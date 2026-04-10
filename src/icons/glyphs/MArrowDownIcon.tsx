import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MArrowDownIcon = forwardRef<SVGSVGElement, MIconProps>(function MArrowDownIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 5v14" />
            <path d="M6.5 13.5L12 19l5.5-5.5" />
        </MIcon>
    )
})
