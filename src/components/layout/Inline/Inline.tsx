import type {InlineProps} from './Inline.types'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import {useReveal} from '../../../utils/useReveal'
import './Inline.css'

// Arrange children horizontally with configurable alignment and wrapping.
export function Inline({
    gap = 'md',
    align = 'center',
    justify = 'start',
    wrap = 'wrap',
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
}: InlineProps) {
    const utilityStyle = getLayoutUtilityStyles({fsize})
    const revealRef = useReveal<HTMLDivElement>(reveal)
    const gapClassName = gap === '2xl' ? 'gap-2xl' : gap

    return (
        <div
            ref={reveal !== undefined && reveal !== false ? revealRef : undefined}
            className={cn(
                'inline',
                gapClassName,
                align,
                `justify-${justify}`,
                wrap,
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
