import {Children, isValidElement} from 'react'
import type {MGridItemProps, MGridProps} from './MGrid.types'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import './MGrid.css'

// Render either a responsive row or a responsive column using one shared grid API.
export function MGrid({
    type = 'row',
    span,
    sm,
    md,
    lg,
    xl,
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
}: MGridProps) {
    const utilityStyle = getLayoutUtilityStyles({fsize})
    const baseSpan = span ?? xl ?? lg

    if (type === 'col') {
        return (
            <div
                className={cn(
                    'grid',
                    'col',
                    baseSpan ? `span-${baseSpan}` : 'span-auto',
                    xl && `xl-${xl}`,
                    lg && `lg-${lg}`,
                    md && `md-${md}`,
                    sm && `sm-${sm}`,
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

    const childArray = Children.toArray(children)
    const autoColumns = Math.min(Math.max(childArray.length, 1), 12)
    const hasDesktopSizing = childArray.some((child) => {
        if (!isValidElement(child)) {
            return false
        }

        const p = child.props as Record<string, unknown>
        return Boolean(p?.span || p?.lg || p?.xl)
    })

    return (
        <div
            className={cn(
                'grid',
                'row',
                hasDesktopSizing ? 'tracked' : `auto-cols-${autoColumns}`,
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
                    fullWidth: fullWidth ?? true,
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

// Keep MGridItem as a compatibility alias for explicit column declarations.
export function MGridItem({span, sm, md, lg, xl, ...rest}: MGridItemProps) {
    return <MGrid type="col" span={span} sm={sm} md={md} lg={lg} xl={xl} {...rest} />
}
