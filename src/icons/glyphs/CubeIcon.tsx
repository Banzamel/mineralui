import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const CubeIcon = forwardRef<SVGSVGElement, IconProps>(function CubeIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="m12 4.25 6.6 3.75v8L12 19.75 5.4 16V8z" />
            <path d="M12 12.05 5.4 8M12 12.05 18.6 8M12 12.05v7.7" />
        </Icon>
    )
})
