import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MBoxIcon = forwardRef<SVGSVGElement, MIconProps>(function MBoxIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="m12 5.2 5.4 3.12v6.36L12 17.8 6.6 14.68V8.32z" />
            <path d="M12 5.2v6.1M6.6 8.32l5.4 3.12 5.4-3.12M12 17.8v-6.1" />
        </MIcon>
    )
})
