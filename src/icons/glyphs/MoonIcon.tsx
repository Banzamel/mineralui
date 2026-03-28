import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const MoonIcon = forwardRef<SVGSVGElement, IconProps>(function MoonIcon(props, ref) {
    return (
        <Icon ref={ref} fill={'currentColor'} stroke={'none'} {...props}>
            <path d={'M15 3.8A8.75 8.75 0 1 0 15 20.2A6.15 6.15 0 1 1 15 3.8Z'} transform={'rotate(-18 12 12)'} />
        </Icon>
    )
})
