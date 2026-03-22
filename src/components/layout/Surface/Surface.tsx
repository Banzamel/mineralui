import type {SurfaceProps} from './Surface.types'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import './Surface.css'

// Render a reusable surface primitive for cards, panels and preview blocks.
export function Surface({
    tone = 'default',
    outlined = true,
    padded = true,
    spacing,
    padding,
    fsize,
    fcolor,
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
}: SurfaceProps) {
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
                    fcolor,
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
            {...rest}
        >
            {children}
        </div>
    )
}
