import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const CommentIcon = forwardRef<SVGSVGElement, IconProps>(function CommentIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d='M6.75 6.25h10.5a2.25 2.25 0 0 1 2.25 2.25v5.2a2.25 2.25 0 0 1-2.25 2.25H11.9L8.25 19v-3.05h-1.5A2.25 2.25 0 0 1 4.5 13.7V8.5a2.25 2.25 0 0 1 2.25-2.25Z' />
            <circle cx='9.2' cy='11.2' r='0.65' fill='currentColor' stroke='none' />
            <circle cx='12' cy='11.2' r='0.65' fill='currentColor' stroke='none' />
            <circle cx='14.8' cy='11.2' r='0.65' fill='currentColor' stroke='none' />
        </Icon>
    )
})
