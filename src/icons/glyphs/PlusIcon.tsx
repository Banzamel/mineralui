import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const PlusIcon = forwardRef<SVGSVGElement, IconProps>(function PlusIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </Icon>
    )
})
