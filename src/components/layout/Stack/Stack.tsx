import type {StackProps} from './Stack.types'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import {useReveal} from '../../../utils/useReveal'
import './Stack.css'

// Stack children vertically with shared layout utility props.
export function Stack({
    align = 'stretch',
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
}: StackProps) {
    const utilityStyle = getLayoutUtilityStyles({fsize})
    const revealRef = useReveal<HTMLDivElement>(reveal)

    return (
        <div
            ref={reveal !== undefined && reveal !== false ? revealRef : undefined}
            className={cn(
                'stack',
                align !== 'stretch' && align,
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
