import type {MInlineProps} from './MInline.types'
import {getHiddenProps} from '../../../theme'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import './MInline.css'

// Arrange children horizontally with shared alignment and wrapping helpers.
export function MInline({
    align = 'center',
    justify = 'start',
    wrap = 'wrap',
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
}: MInlineProps) {
    const utilityStyle = getLayoutUtilityStyles({fsize})

    return (
        <div
            className={cn(
                'inline',
                align,
                `justify-${justify}`,
                wrap,
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
