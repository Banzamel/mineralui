import type {MTextProps} from './MText.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import './MText.css'

// Render body copy with shared tone, size and weight controls.
export function MText({
    as = 'p',
    tone = 'default',
    size,
    align = 'left',
    color,
    weight = 'normal',
    truncate,
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
}: MTextProps) {
    const Component = as
    const utilityStyle = getLayoutUtilityStyles({fsize})
    const lines = typeof truncate === 'number' ? truncate : undefined

    return (
        <Component
            className={cn(
                'text',
                !color && tone,
                size,
                align,
                weight,
                truncate === true && 'truncate',
                lines != null && 'line-clamp',
                ...getAppearanceClassNames({color}),
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
            style={{
                ...utilityStyle,
                ...(lines ? ({'--line-clamp': lines} as React.CSSProperties) : undefined),
                ...style,
            }}
            {...rest}
        >
            {children}
        </Component>
    )
}
