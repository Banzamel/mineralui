import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MDocPlusIcon = forwardRef<SVGSVGElement, MIconProps>(function MDocPlusIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z" />
            <path d="M14 3.5V8h4" />
            <path d="M12 11.25v5.5M9.25 14h5.5" />
        </MIcon>
    )
})
