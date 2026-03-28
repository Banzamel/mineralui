import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const PuzzleIcon = forwardRef<SVGSVGElement, IconProps>(function PuzzleIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M6.25 8V5.9h2.95c.2-1.28 1.22-2.2 2.8-2.2 1.62 0 2.66.95 2.84 2.2h3.1v3.05c1.27.19 2.2 1.22 2.2 2.8 0 1.61-.95 2.65-2.2 2.84v3.1h-4.1c0-1.54-.96-2.55-2.44-2.55-1.49 0-2.45 1.01-2.45 2.55H6.25v-3.1c-1.25-.19-2.2-1.23-2.2-2.84 0-1.58.93-2.61 2.2-2.8z" />
        </Icon>
    )
})
