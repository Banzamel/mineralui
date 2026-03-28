import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FileCodeIcon = forwardRef<SVGSVGElement, IconProps>(function FileCodeIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
            <path d="M14 3.5V8h4" />
            <path
                d="M7.15 11.25h9.7a1.25 1.25 0 0 1 1.25 1.25v4.35a1.25 1.25 0 0 1-1.25 1.25h-9.7A1.25 1.25 0 0 1 5.9 16.85V12.5a1.25 1.25 0 0 1 1.25-1.25z"
                fill="#2563eb"
                stroke="none"
            />
            <path d="M9.6 13.6l-1.6 1.55 1.6 1.55M14.4 13.6l1.6 1.55-1.6 1.55M12.8 13l-1.6 4.2" stroke="#f8fafc" />
        </Icon>
    )
})
