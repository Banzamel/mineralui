import type {SubTextProps} from './SubText.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './SubText.css'

// Render small, muted secondary text for captions, hints and metadata.
export function SubText({as = 'span', size = 'sm', fcolor, className, children, ...rest}: SubTextProps) {
    const Component = as
    return (
        <Component className={cn('subtext', size, ...getAppearanceClassNames({fcolor}), className)} {...rest}>
            {children}
        </Component>
    )
}
