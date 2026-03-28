import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const DocIcon = forwardRef<SVGSVGElement, IconProps>(function DocIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7 4.5h7l4 4v10a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z" />
            <path d="M14 4.5V8.5h4" />
            <path d="M8.75 12h6.5M8.75 15h5" />
        </Icon>
    )
})
