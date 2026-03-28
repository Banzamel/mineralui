import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const CartIcon = forwardRef<SVGSVGElement, IconProps>(function CartIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="10" cy="18" r="1.35" />
            <circle cx="16.5" cy="18" r="1.35" />
            <path d="M4.5 6h2l1.4 7.2h8.8l2.1-5.2H8.15" />
        </Icon>
    )
})
