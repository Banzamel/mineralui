import type {DividerProps} from './Divider.types'
import {cn} from '../../../utils/cn'

// Render a semantic divider line between related content blocks.
export function Divider({className, style, ...rest}: DividerProps) {
    return <hr className={cn('divider', className)} style={style} {...rest} />
}
