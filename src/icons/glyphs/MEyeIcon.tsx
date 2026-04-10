import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MEyeIcon = forwardRef<SVGSVGElement, MIconProps>(function MEyeIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M3.5 12c1.9-3 4.8-4.75 8.5-4.75s6.6 1.75 8.5 4.75c-1.9 3-4.8 4.75-8.5 4.75S5.4 15 3.5 12z" />
            <circle cx="12" cy="12" r="2.5" />
            <path d="M12 10.25v.1" />
        </MIcon>
    )
})
