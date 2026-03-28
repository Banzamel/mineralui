import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FileIcon = forwardRef<SVGSVGElement, IconProps>(function FileIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
            <path d="M14 3.5V8h4" />
        </Icon>
    )
})
