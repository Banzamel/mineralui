import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FolderPlusIcon = forwardRef<SVGSVGElement, IconProps>(function FolderPlusIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h3.3l1.6 1.75h6.1A2.5 2.5 0 0 1 20 9.25v7.25A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" />
            <path d="M12 10.25v5.5M9.25 13h5.5" />
        </Icon>
    )
})
