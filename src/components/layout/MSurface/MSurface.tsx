import type {MSurfaceProps} from './MSurface.types'
import {getHiddenProps} from '../../../theme'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import './MSurface.css'

// Render a reusable surface primitive for cards, panels and preview blocks.
export function MSurface({
    tone = 'default',
    outlined = true,
    padded = true,
    hidden,
    spacing,
    padding,
    fsize,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    pt,
    pb,
    pl,
    pr,
    px,
    py,
    fullWidth,
    className,
    style,
    children,
    ...rest
}: MSurfaceProps) {
    const utilityStyle = getLayoutUtilityStyles({fsize})

    return (
        <div
            className={cn(
                'surface',
                tone,
                outlined && 'outlined',
                padded && 'padded',
                ...getLayoutUtilityClassNames({
                    spacing,
                    padding,
                    fsize,
                    mt,
                    mb,
                    ml,
                    mr,
                    mx,
                    my,
                    pt,
                    pb,
                    pl,
                    pr,
                    px,
                    py,
                    fullWidth,
                }),
                className
            )}
            style={{...utilityStyle, ...style}}
            {...getHiddenProps(hidden)}
            {...rest}
        >
            {children}
        </div>
    )
}
