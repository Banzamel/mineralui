import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MSignal4Icon = forwardRef<SVGSVGElement, MIconProps>(function MSignal4Icon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M7.5 16.5v3" />
            <path d="M11 13.5v6" />
            <path d="M14.5 10.5v9" />
            <path d="M18 7.5v12" />
        </MIcon>
    )
})
