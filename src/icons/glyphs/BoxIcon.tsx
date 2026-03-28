import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const BoxIcon = forwardRef<SVGSVGElement, IconProps>(function BoxIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="m12 5.2 5.4 3.12v6.36L12 17.8 6.6 14.68V8.32z" />
            <path d="M12 5.2v6.1M6.6 8.32l5.4 3.12 5.4-3.12M12 17.8v-6.1" />
        </Icon>
    )
})
