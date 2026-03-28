import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const UploadIcon = forwardRef<SVGSVGElement, IconProps>(function UploadIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 15V5" />
            <path d="M8 9l4-4 4 4" />
            <path d="M5 18.5h14" />
        </Icon>
    )
})
