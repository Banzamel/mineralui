import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const LightbulbIcon = forwardRef<SVGSVGElement, IconProps>(function LightbulbIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M8.25 10.05A3.75 3.75 0 0 1 12 6.3a3.75 3.75 0 0 1 3.75 3.75c0 1.45-.58 2.42-1.55 3.32-.78.73-1.23 1.43-1.3 2.23h-1.8c-.07-.8-.52-1.5-1.3-2.23-.97-.9-1.55-1.87-1.55-3.32z" />
            <path d="M10 17.6h4M10.45 19.55h3.1M11.15 15.6h1.7" />
            <path d="M12 4.15V2.75M7.15 5.7 6.15 4.7M16.85 5.7l1-1M5 9.15H3.6M20.4 9.15H19" />
        </Icon>
    )
})
