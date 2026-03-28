import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ChatIcon = forwardRef<SVGSVGElement, IconProps>(function ChatIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M6.5 6.5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-5.25L8 19.5v-3H6.5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
            <path d="M8.5 10.5h7M8.5 13h4.5" />
        </Icon>
    )
})
