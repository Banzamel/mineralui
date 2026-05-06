import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MBookOpenFillIcon = forwardRef<SVGSVGElement, MIconProps>(function MBookOpenFillIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M3 5L12 7L21 5v12L12 19L3 17z" fill="currentColor" />
            <path d="M12 7v12" />
        </MIcon>
    )
})
