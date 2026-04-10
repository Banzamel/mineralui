import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MEditIcon = forwardRef<SVGSVGElement, MIconProps>(function MEditIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M5.25 18.1h13.5" />
            <path d="m7.2 14.55 6.85-6.85 2.75 2.75-6.85 6.85-3.3.55z" />
            <path d="m14.05 7.7 1.3-1.3a1.7 1.7 0 0 1 2.4 0l.25.25a1.7 1.7 0 0 1 0 2.4l-1.2 1.2" />
            <path d="M12.95 8.8 15.7 11.55" />
            <path d="m7.2 14.55 2.25 2.25" />
        </MIcon>
    )
})
