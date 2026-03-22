import type {ContainerProps} from './Container.types'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import './Container.css'

// Constrain page content widths and apply shared spacing utilities.
export function Container({
    size = 'content',
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
}: ContainerProps) {
    const utilityStyle = getLayoutUtilityStyles({fsize})

    return (
        <div
            className={cn(
                'container',
                size,
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
