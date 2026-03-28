import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const PaletteIcon = forwardRef<SVGSVGElement, IconProps>(function PaletteIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 4a8 8 0 0 0 0 16h1.15c1.05 0 1.7-.62 1.7-1.52 0-.62-.3-1.12-.3-1.7 0-.87.65-1.48 1.82-1.48H17A3 3 0 0 0 20 12c0-4.4-3.58-8-8-8z" />
            <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
            <circle cx="11" cy="7.75" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="8.8" cy="14.1" r="1" fill="currentColor" stroke="none" />
        </Icon>
    )
})
