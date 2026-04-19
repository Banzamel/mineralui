import {Children, cloneElement, isValidElement} from 'react'
import type {ReactElement} from 'react'
import type {MGridColumns, MGridItemProps, MGridProps} from './MGrid.types'
import {getHiddenProps} from '../../../theme'
import {cn} from '../../../utils/cn'
import {getLayoutUtilityClassNames, getLayoutUtilityStyles} from '../../../utils/layoutProps'
import './MGrid.css'

type GridBreakpoint = 'span' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm'

function isGridColumnElement(child: unknown): child is ReactElement<MGridProps | MGridItemProps> {
    if (!isValidElement(child)) {
        return false
    }

    if (child.type === MGridItem) {
        return true
    }

    return child.type === MGrid && (child.props as MGridProps).type === 'col'
}

function getNormalizedSpans(props: Partial<MGridProps>) {
    return {
        span: props.span ?? props.xxl ?? props.xl ?? props.lg ?? props.md ?? props.sm,
        xxl: props.xxl ?? props.xl ?? props.lg ?? props.md ?? props.sm,
        xl: props.xl ?? props.lg ?? props.md ?? props.sm,
        lg: props.lg ?? props.md ?? props.sm,
        md: props.md ?? props.sm,
        sm: props.sm,
    }
}

function distributeRemainingColumns(remaining: number, count: number): Array<MGridColumns | undefined> {
    if (count <= 0) {
        return []
    }

    if (remaining <= 0) {
        return Array.from({length: count}, () => undefined)
    }

    const base = Math.floor(remaining / count)
    const extra = remaining % count

    return Array.from({length: count}, (_, index) => {
        const value = base + (index < extra ? 1 : 0)
        return value >= 1 ? (value as MGridColumns) : undefined
    })
}

function resolveAutoSpans(columnProps: Array<Partial<MGridProps>>) {
    const breakpoints: GridBreakpoint[] = ['span', 'xxl', 'xl', 'lg', 'md', 'sm']
    const normalized = columnProps.map((props) => getNormalizedSpans(props))
    const resolved = normalized.map((spans) => ({...spans}))

    for (const breakpoint of breakpoints) {
        const autoIndexes: number[] = []
        let usedColumns = 0

        normalized.forEach((spans, index) => {
            const value = spans[breakpoint]

            if (value) {
                usedColumns += value
                return
            }

            autoIndexes.push(index)
        })

        const distributed = distributeRemainingColumns(Math.max(12 - usedColumns, 0), autoIndexes.length)

        autoIndexes.forEach((columnIndex, autoIndex) => {
            resolved[columnIndex][breakpoint] = distributed[autoIndex]
        })
    }

    return resolved
}

// Render either a responsive row or a responsive column using one shared grid API.
export function MGrid({
    type = 'row',
    span,
    sm,
    md,
    lg,
    xl,
    xxl,
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
}: MGridProps) {
    const utilityStyle = getLayoutUtilityStyles({fsize})
    const baseSpan = span ?? xxl ?? xl ?? lg

    if (type === 'col') {
        return (
            <div
                className={cn(
                    'grid',
                    'col',
                    baseSpan ? `span-${baseSpan}` : 'span-auto',
                    xxl && `xxl-${xxl}`,
                    xl && `xl-${xl}`,
                    lg && `lg-${lg}`,
                    md && `md-${md}`,
                    sm && `sm-${sm}`,
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

    const childArray = Children.toArray(children)
    const columnEntries = childArray.flatMap((child, index) => (isGridColumnElement(child) ? [{child, index}] : []))
    const autoColumns = Math.min(Math.max(columnEntries.length || childArray.length, 1), 12)
    const hasTrackedSizing = columnEntries.some(({child}) => {
        const p = child.props as MGridProps
        return Boolean(p.span || p.xxl || p.xl || p.lg || p.md || p.sm)
    })
    const resolvedSpans = hasTrackedSizing
        ? resolveAutoSpans(columnEntries.map(({child}) => child.props as Partial<MGridProps>))
        : null
    const resolvedChildren =
        hasTrackedSizing && resolvedSpans
            ? childArray.map((child, childIndex) => {
                  const columnIndex = columnEntries.findIndex((entry) => entry.index === childIndex)

                  if (columnIndex === -1 || !isGridColumnElement(child)) {
                      return child
                  }

                  const spans = resolvedSpans[columnIndex]

                  return cloneElement(child, {
                      span: spans.span,
                      xxl: spans.xxl,
                      xl: spans.xl,
                      lg: spans.lg,
                      md: spans.md,
                      sm: spans.sm,
                  })
              })
            : childArray

    return (
        <div
            className={cn(
                'grid',
                'row',
                hasTrackedSizing ? 'tracked' : `auto-cols-${autoColumns}`,
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
                    fullWidth: fullWidth ?? true,
                }),
                className
            )}
            style={{...utilityStyle, ...style}}
            {...getHiddenProps(hidden)}
            {...rest}
        >
            {resolvedChildren}
        </div>
    )
}

// Keep MGridItem as a compatibility alias for explicit column declarations.
export function MGridItem({span, sm, md, lg, xl, xxl, ...rest}: MGridItemProps) {
    return <MGrid type="col" span={span} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl} {...rest} />
}
