import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FileArchiveIcon = forwardRef<SVGSVGElement, IconProps>(function FileArchiveIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
            <path d="M14 3.5V8h4" />
            <path
                d="M9.85 11.35h4.3a1 1 0 0 1 1 1v5.65a1 1 0 0 1-1 1h-4.3a1 1 0 0 1-1-1v-5.65a1 1 0 0 1 1-1z"
                fill="#f59e0b"
                stroke="none"
            />
            <path d="M11.2 12.3h1.6M11.2 13.45h1.6M11.2 14.6h1.6M11.2 15.75h1.6" stroke="#fff" />
            <path d="M12 12.3v4.9" stroke="#fff" />
        </Icon>
    )
})
