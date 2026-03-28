import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FileTextIcon = forwardRef<SVGSVGElement, IconProps>(function FileTextIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7 3.5h7l4 4v12a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
            <path d="M14 3.5V8h4" />
            <path d="M8.5 11h7M8.5 13.75h7M8.5 16.5h5.5" />
        </Icon>
    )
})
