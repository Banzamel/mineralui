import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlatIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlatIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M3 7h7V4h6v3h5v11H8v3H3z" />
            <path d="M3 12h4" />
            <path d="M9 12h3" />
            <path d="M14 12h7" />
            <path d="M11 4v3" />
            <path d="M11 9v3" />
            <path d="M14 12v2" />
            <path d="M14 16v2" />
        </MIcon>
    )
})
