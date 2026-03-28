import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const BoltIcon = forwardRef<SVGSVGElement, IconProps>(function BoltIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M13.9 3.75 6.8 12h4.15L10.1 20.25 17.2 12h-4.15z" />
        </Icon>
    )
})
