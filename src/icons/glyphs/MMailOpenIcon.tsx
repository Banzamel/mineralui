import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MMailOpenIcon = forwardRef<SVGSVGElement, MIconProps>(function MMailOpenIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="m4.25 9.4 7.75-5.15 7.75 5.15" />
            <path d="M5.1 9.15h13.8v8.1a2.25 2.25 0 0 1-2.25 2.25H7.35A2.25 2.25 0 0 1 5.1 17.25z" />
            <path d="m5.75 10.1 6.25 4.6 6.25-4.6" />
        </MIcon>
    )
})
