import type {MStackProps} from './MStack.types'
import {getHiddenProps} from '../../../theme'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import {useReveal} from '../../../utils/useReveal'
import './MStack.css'

// MStack children vertically with shared layout utility props.
export function MStack({
    align = 'stretch',
    hidden,
    reveal,
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
}: MStackProps) {
    const utilityStyle = getLayoutUtilityStyles({fsize})
    const revealRef = useReveal<HTMLDivElement>(reveal)

    return (
        <div
            ref={reveal !== undefined && reveal !== false ? revealRef : undefined}
            className={cn(
                'stack',
                align !== 'stretch' && align,
                reveal !== undefined && reveal !== false && 'reveal',
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
