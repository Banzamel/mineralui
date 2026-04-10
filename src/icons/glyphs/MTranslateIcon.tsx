import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MTranslateIcon = forwardRef<SVGSVGElement, MIconProps>(function MTranslateIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M4.4 6.3h8" />
            <path d="M8.4 6.3v1.1c0 3.35-1.45 6.2-3.75 8.4" />
            <path d="M5.95 10.85L10 15.2" />
            <path d="M15 19.1l3.35-8.1 3.35 8.1" />
            <path d="M16.25 16.05h4.2" />
        </MIcon>
    )
})
