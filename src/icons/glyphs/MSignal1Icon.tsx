import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MSignal1Icon = forwardRef<SVGSVGElement, MIconProps>(function MSignal1Icon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M7.5 16.5v3" />
        </MIcon>
    )
})
