import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const BankIcon = forwardRef<SVGSVGElement, IconProps>(function BankIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 4L4 7.5h16L12 4z" />
            <path d="M5 19.5h14" />
            <path d="M6.5 10v7M10 10v7M14 10v7M17.5 10v7" />
            <path d="M4 8.5h16" />
        </Icon>
    )
})
