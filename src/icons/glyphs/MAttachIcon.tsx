import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MAttachIcon = forwardRef<SVGSVGElement, MIconProps>(function MAttachIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path
                d="M16.5 7.5v7.25a4.5 4.5 0 1 1-9 0V6.75a3 3 0 0 1 6 0v7.25a1.5 1.5 0 0 1-3 0V7.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </MIcon>
    )
})
