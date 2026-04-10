import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MEyeOffIcon = forwardRef<SVGSVGElement, MIconProps>(function MEyeOffIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M3.5 12c.75-1.2 1.66-2.23 2.75-3.03" />
            <path d="M8.5 7.85c1.06-.4 2.22-.6 3.5-.6 3.7 0 6.6 1.75 8.5 4.75-.68 1.07-1.48 2-2.4 2.77" />
            <path d="M6.75 14.95A9.76 9.76 0 0 0 12 16.75c1.9 0 3.58-.46 5.02-1.34" />
            <path d="M10.05 10.05A2.85 2.85 0 0 1 14.9 12" />
            <path d="M12 9.15A2.85 2.85 0 0 1 14.85 12" />
            <path d="M4.5 4.5 19.5 19.5" />
        </MIcon>
    )
})
