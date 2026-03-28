import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const CloseIcon = forwardRef<SVGSVGElement, IconProps>(function CloseIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
        </Icon>
    )
})
