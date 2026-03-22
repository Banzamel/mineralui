import type {MFooterProps} from './MFooter.types'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import {Container} from '../Container'
import './MFooter.css'

// Render a reusable page footer shell with shared spacing utilities.
export function MFooter({
    container = 'wide',
    padded = true,
    bordered = true,
    tone = 'surface',
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
}: MFooterProps) {
    const utilityStyle = getLayoutUtilityStyles({fsize})

    return (
        <footer
            className={cn(
                'footer',
                tone,
                bordered && 'bordered',
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
            <Container size={container} padded={padded} className="inner" fullWidth>
                {children}
            </Container>
        </footer>
    )
}
