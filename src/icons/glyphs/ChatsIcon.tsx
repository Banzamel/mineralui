import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ChatsIcon = forwardRef<SVGSVGElement, IconProps>(function ChatsIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d='M9 5.5h8a2 2 0 0 1 2 2v5.25a2 2 0 0 1-2 2h-4.2L9.75 17v-2.25H9a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2Z' />
            <path d='M7 8.5H6.2a1.7 1.7 0 0 0-1.7 1.7v4.1A1.7 1.7 0 0 0 6.2 16h1.05v2.1L10.7 16H12' />
            <path d='M10.75 9.5h4.75M10.75 12h3' />
        </Icon>
    )
})
