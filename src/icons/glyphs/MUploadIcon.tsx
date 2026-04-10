import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MUploadIcon = forwardRef<SVGSVGElement, MIconProps>(function MUploadIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M12 15V5" />
            <path d="M8 9l4-4 4 4" />
            <path d="M5 18.5h14" />
        </MIcon>
    )
})
