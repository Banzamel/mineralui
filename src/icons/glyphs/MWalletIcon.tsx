import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MWalletIcon = forwardRef<SVGSVGElement, MIconProps>(function MWalletIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M20 8.5V7a1.5 1.5 0 0 0-1.5-1.5H6A2.5 2.5 0 0 0 3.5 8v8A2.5 2.5 0 0 0 6 18.5h12.5a1.5 1.5 0 0 0 1.5-1.5V15.5" />
            <path d="M20.5 9.5h-4a2.5 2.5 0 0 0 0 5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5z" />
            <circle cx="17.25" cy="12" r="1" />
        </MIcon>
    )
})
