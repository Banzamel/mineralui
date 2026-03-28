import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const KanbanIcon = forwardRef<SVGSVGElement, IconProps>(function KanbanIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
            <path d="M3.5 9.5h17" />
            <path d="M9 9.5V19M15 9.5V19" />
            <path d="M6 7.25h1.5M11 7.25h2M17.5 7.25H18" />
        </Icon>
    )
})
