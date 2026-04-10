import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFolderOpenIcon = forwardRef<SVGSVGElement, MIconProps>(function MFolderOpenIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M3.75 8.2V7.2A2.2 2.2 0 0 1 5.95 5h3.3l1.8 1.9H18a2.25 2.25 0 0 1 2.25 2.25v.95" />
            <path d="M4.2 10.2h16.05a1.2 1.2 0 0 1 1.14 1.54l-1.42 4.52a2.35 2.35 0 0 1-2.24 1.64H5.55a2 2 0 0 1-1.92-2.56l1.42-4.52A.9.9 0 0 1 4.2 10.2z" />
        </MIcon>
    )
})
