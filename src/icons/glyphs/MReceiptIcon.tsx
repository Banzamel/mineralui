import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MReceiptIcon = forwardRef<SVGSVGElement, MIconProps>(function MReceiptIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M5.5 20.5V3.5h13v17l-3.25-1.75-3.25 1.75-3.25-1.75-3.25 1.75z" />
            <path d="M9 7.5h6M9 11h6M9 14.5h3.5" />
        </MIcon>
    )
})
