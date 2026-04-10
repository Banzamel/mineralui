import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCubeIcon = forwardRef<SVGSVGElement, MIconProps>(function MCubeIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="m12 4.25 6.6 3.75v8L12 19.75 5.4 16V8z" />
            <path d="M12 12.05 5.4 8M12 12.05 18.6 8M12 12.05v7.7" />
        </MIcon>
    )
})
