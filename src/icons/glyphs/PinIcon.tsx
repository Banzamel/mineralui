import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const PinIcon = forwardRef<SVGSVGElement, IconProps>(function PinIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 20c3.5-4.2 5.25-7.3 5.25-9.4a5.25 5.25 0 1 0-10.5 0C6.75 12.7 8.5 15.8 12 20z" />
            <circle cx="12" cy="10.5" r="1.75" />
        </Icon>
    )
})
