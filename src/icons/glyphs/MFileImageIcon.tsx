import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFileImageIcon = forwardRef<SVGSVGElement, MIconProps>(function MFileImageIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
            <path d="M14 3.5V8h4" />
            <path
                d="M7.15 11.25h9.7a1.25 1.25 0 0 1 1.25 1.25v4.35a1.25 1.25 0 0 1-1.25 1.25h-9.7A1.25 1.25 0 0 1 5.9 16.85V12.5a1.25 1.25 0 0 1 1.25-1.25z"
                fill="#14b8a6"
                stroke="none"
            />
            <circle cx="14.7" cy="13.4" r="0.9" fill="#f8fafc" stroke="none" />
            <path d="M7.65 17.2l2.6-2.8 1.8 1.9 1.4-1.4 2.9 2.3" stroke="#f8fafc" />
        </MIcon>
    )
})
