import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MBoltIcon = forwardRef<SVGSVGElement, MIconProps>(function MBoltIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M13.9 3.75 6.8 12h4.15L10.1 20.25 17.2 12h-4.15z" />
        </MIcon>
    )
})
