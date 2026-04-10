import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MBankIcon = forwardRef<SVGSVGElement, MIconProps>(function MBankIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 4L4 7.5h16L12 4z" />
            <path d="M5 19.5h14" />
            <path d="M6.5 10v7M10 10v7M14 10v7M17.5 10v7" />
            <path d="M4 8.5h16" />
        </MIcon>
    )
})
