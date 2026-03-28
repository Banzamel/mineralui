import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FilePdfIcon = forwardRef<SVGSVGElement, IconProps>(function FilePdfIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
            <path d="M14 3.5V8h4" />
            <path
                d="M7.1 11.35h9.8a1.3 1.3 0 0 1 1.3 1.3v4.15a1.3 1.3 0 0 1-1.3 1.3H7.1a1.3 1.3 0 0 1-1.3-1.3v-4.15a1.3 1.3 0 0 1 1.3-1.3z"
                fill="#ef4444"
                stroke="none"
            />
            <path d="M9 16v-2.75h1.05a.8.8 0 1 1 0 1.6H9" stroke="#fff" />
            <path d="M11.95 16v-2.75h.55a1.1 1.1 0 0 1 0 2.75h-.55z" stroke="#fff" />
            <path d="M14.9 16v-2.75h1.45M14.9 14.65h1.05" stroke="#fff" />
        </Icon>
    )
})
