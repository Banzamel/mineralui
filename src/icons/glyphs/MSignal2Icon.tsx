import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MSignal2Icon = forwardRef<SVGSVGElement, MIconProps>(function MSignal2Icon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M7.5 16.5v3" />
            <path d="M11 13.5v6" />
        </MIcon>
    )
})
