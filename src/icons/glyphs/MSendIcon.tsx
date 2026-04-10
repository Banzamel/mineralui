import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MSendIcon = forwardRef<SVGSVGElement, MIconProps>(function MSendIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M4.5 11.5l14-6-4.75 13-2.35-4.65z" />
            <path d="M11.4 13.85l7.1-8.35" />
        </MIcon>
    )
})
