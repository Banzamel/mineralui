import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ChartIcon = forwardRef<SVGSVGElement, IconProps>(function ChartIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d='M5.25 18.5v-7.75a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v7.75' fill='currentColor' stroke='none' />
            <path d='M10.75 18.5V8a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v10.5' fill='currentColor' stroke='none' />
            <path d='M16.25 18.5v-5.75a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v5.75' fill='currentColor' stroke='none' />
            <path d='m4.75 11.25 4.4-4.4 3.1 3.1 6-6' />
            <path d='M15.95 3.95h4.1v4.1' />
        </Icon>
    )
})
