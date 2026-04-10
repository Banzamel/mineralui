import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MExternalLinkIcon = forwardRef<SVGSVGElement, MIconProps>(function MExternalLinkIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M9 8.5h-2.5A2.5 2.5 0 0 0 4 11v7a2.5 2.5 0 0 0 2.5 2.5h7A2.5 2.5 0 0 0 16 18v-2.5" />
            <path d="M11 4h9v9" />
            <path d="M20 4 10.75 13.25" />
        </MIcon>
    )
})
