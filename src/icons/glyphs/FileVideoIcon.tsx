import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FileVideoIcon = forwardRef<SVGSVGElement, IconProps>(function FileVideoIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
            <path d="M14 3.5V8h4" />
            <path
                d="M7.15 11.25h9.7a1.25 1.25 0 0 1 1.25 1.25v4.35a1.25 1.25 0 0 1-1.25 1.25h-9.7A1.25 1.25 0 0 1 5.9 16.85V12.5a1.25 1.25 0 0 1 1.25-1.25z"
                fill="#8b5cf6"
                stroke="none"
            />
            <path d="M10.2 13.5l4.15 1.85-4.15 1.85z" fill="#f8fafc" stroke="none" />
        </Icon>
    )
})
