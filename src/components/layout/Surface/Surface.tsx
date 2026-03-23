import type {SurfaceProps} from './Surface.types'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import {useReveal} from '../../../utils/useReveal'
import './Surface.css'

// Render a reusable surface primitive for cards, panels and preview blocks.
export function Surface({
    tone = 'default',
    outlined = true,
    padded = true,
    reveal,
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
    const revealRef = useReveal<HTMLDivElement>(reveal)

    return (
        <div
            ref={reveal !== undefined && reveal !== false ? revealRef : undefined}
            className={cn(
                'surface',
                tone,
                outlined && 'outlined',
                padded && 'padded',
                reveal !== undefined && reveal !== false && 'mineral-reveal',
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
