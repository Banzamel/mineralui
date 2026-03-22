import type {StackProps} from './Stack.types'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import './Stack.css'

// Stack children vertically with shared gap and utility props.
export function Stack({
    gap = 'md',
    align = 'stretch',
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
}: StackProps) {
    const utilityStyle = getLayoutUtilityStyles({fsize})
    const gapClassName = gap === '2xl' ? 'gap-2xl' : gap

    return (
        <div
            className={cn(
                'stack',
                gapClassName,
                align !== 'stretch' && align,
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
