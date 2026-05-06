import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MShopIcon = forwardRef<SVGSVGElement, MIconProps>(function MShopIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M3.5 9.5h17l-1.5-3.5h-14z" />
            <path d="M5 9.5v9.5a0.5 0.5 0 0 0 0.5 0.5h13a0.5 0.5 0 0 0 0.5-0.5V9.5" />
            <rect x="9.5" y="13" width="5" height="6.5" />
            <path d="M5 12h6" />
        </MIcon>
    )
})
