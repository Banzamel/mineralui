import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FormIcon = forwardRef<SVGSVGElement, IconProps>(function FormIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
            <path d="M8 8h8M8 12h8M8 16h5.5" />
            <path d="M3.5 8.5l1.5 1.5L7 7.75" />
            <path d="M3.5 16.5l1.5 1.5L7 15.75" />
        </Icon>
    )
})
