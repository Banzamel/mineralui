import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MMoonIcon = forwardRef<SVGSVGElement, MIconProps>(function MMoonIcon(props, ref) {
    return (
        <MIcon ref={ref} fill={'currentColor'} stroke={'none'} {...props}>
            <path d={'M15 3.8A8.75 8.75 0 1 0 15 20.2A6.15 6.15 0 1 1 15 3.8Z'} transform={'rotate(-18 12 12)'} />
        </MIcon>
    )
})
