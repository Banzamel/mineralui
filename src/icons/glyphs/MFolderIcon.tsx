import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFolderIcon = forwardRef<SVGSVGElement, MIconProps>(function MFolderIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M3.75 8V7.2A2.2 2.2 0 0 1 5.95 5h3.3l1.8 1.9H18a2.25 2.25 0 0 1 2.25 2.25v6.65A2.2 2.2 0 0 1 18.05 18H5.95a2.2 2.2 0 0 1-2.2-2.2V8z" />
            <path d="M3.75 9h16.5" />
        </MIcon>
    )
})
