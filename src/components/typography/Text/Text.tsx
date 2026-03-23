import type {TextProps} from './Text.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import './Text.css'

// Render body copy with shared tone, size and weight controls.
export function Text({
    as = 'p',
    tone = 'default',
    size,
    align = 'left',
    color,
    fcolor,
    weight = 'normal',
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
    children,
    ...rest
}: TextProps) {
    const Component = as
    const utilityStyle = getLayoutUtilityStyles({fsize})

    return (
        <Component
            className={cn(
                'text',
                !color && !fcolor && tone,
                size,
                align,
                weight,
                ...getAppearanceClassNames({color, fcolor}),
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
            style={utilityStyle}
            {...rest}
        >
            {children}
        </Component>
    )
}
