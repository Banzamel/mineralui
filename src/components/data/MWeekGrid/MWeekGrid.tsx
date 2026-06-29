import {Fragment, useMemo, type CSSProperties, type ReactNode} from 'react'

import {MStack} from '../../layout'
import {MTooltip} from '../../overlays'
import {MHeading, MSubText, MText} from '../../typography'
import {cn} from '../../../utils/cn'

import type {
    MWeekGridBand,
    MWeekGridCell,
    MWeekGridCellContext,
    MWeekGridProps,
} from './MWeekGrid.types'

import './MWeekGrid.css'

const DEFAULT_DAYS = 7
const DEFAULT_SLOTS = 24

const DEFAULT_DAY_LABELS_FROM_SUNDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const DEFAULT_BAND_LABELS: [string, string, string, string] = ['None', 'Few', 'Some', 'Many']

function densityBand(value: number, max: number): MWeekGridBand {
    if (max <= 0 || value <= 0) return 0
    const ratio = value / max
    if (ratio >= 0.66) return 3
    if (ratio >= 0.33) return 2
    return 1
}

function buildGrid(data: MWeekGridProps['data'], days: number, slots: number): number[][] {
    const grid: number[][] = Array.from({length: days}, () => Array.from({length: slots}, () => 0))

    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
        const matrix = data as number[][]
        for (let day = 0; day < Math.min(days, matrix.length); day += 1) {
            const row = matrix[day]
            if (!row) continue
            for (let slot = 0; slot < Math.min(slots, row.length); slot += 1) {
                grid[day][slot] = row[slot] ?? 0
            }
        }
        return grid
    }

    for (const cell of data as MWeekGridCell[]) {
        if (cell.day < 0 || cell.day >= days) continue
        if (cell.slot < 0 || cell.slot >= slots) continue
        grid[cell.day][cell.slot] = cell.value
    }
    return grid
}

function resolveMax(grid: number[][], max?: number): number {
    if (typeof max === 'number') return max
    let best = 0
    for (const row of grid) {
        for (const value of row) {
            if (value > best) best = value
        }
    }
    return best
}

function resolveDayLabels(
    days: number,
    weekStart: 0 | 1,
    custom?: string[]
): {label: string; calendarDay: number}[] {
    if (custom && custom.length >= days) {
        return Array.from({length: days}, (_, index) => ({label: custom[index], calendarDay: index}))
    }

    if (days === 7) {
        const order = weekStart === 1 ? [1, 2, 3, 4, 5, 6, 0] : [0, 1, 2, 3, 4, 5, 6]
        return order.map((calendarDay) => ({
            label: DEFAULT_DAY_LABELS_FROM_SUNDAY[calendarDay],
            calendarDay,
        }))
    }

    return Array.from({length: days}, (_, index) => ({
        label: String(index + 1),
        calendarDay: index,
    }))
}

function resolveSlotLabels(slots: number, custom?: string[]): string[] {
    if (custom && custom.length >= slots) return custom.slice(0, slots)
    if (slots === 24) {
        return Array.from({length: 24}, (_, hour) => hour.toString().padStart(2, '0'))
    }
    return Array.from({length: slots}, (_, slot) => String(slot + 1))
}

function defaultRenderCell(ctx: MWeekGridCellContext): ReactNode {
    return ctx.value > 0 ? ctx.value : ''
}

function defaultRenderTooltip(ctx: MWeekGridCellContext, dayLabel: string, slotLabel: string): ReactNode {
    return `${dayLabel} ${slotLabel} — ${ctx.value}`
}

/**
 * Week-grid heatmap — rows = days, columns = hours (or any fixed slot range).
 * Cells colour-shade by density (four discrete bands) and accept tooltips,
 * custom renderers and click handlers. Common use cases: availability /
 * attendance maps, booking density, opening hours, peak-load views.
 */
export function MWeekGrid({
    data,
    max,
    days = DEFAULT_DAYS,
    slots = DEFAULT_SLOTS,
    dayLabels,
    slotLabels,
    weekStart = 1,
    color = 'warning',
    title,
    description,
    hint,
    peakLabel,
    renderCell,
    renderTooltip,
    onCellClick,
    showLegend = true,
    bandLabels = DEFAULT_BAND_LABELS,
    legendUnit,
    rowLabelWidth = 48,
    cellHeight = 24,
    cellMinWidth = 24,
    className,
    style,
    ...rest
}: MWeekGridProps) {
    const grid = useMemo(() => buildGrid(data, days, slots), [data, days, slots])
    const resolvedMax = useMemo(() => resolveMax(grid, max), [grid, max])
    const rows = useMemo(
        () => resolveDayLabels(days, weekStart, dayLabels),
        [days, weekStart, dayLabels]
    )
    const cols = useMemo(() => resolveSlotLabels(slots, slotLabels), [slots, slotLabels])

    const matrixStyle: CSSProperties = {
        gridTemplateColumns: `${rowLabelWidth}px repeat(${slots}, minmax(${cellMinWidth}px, 1fr))`,
    }

    const wrapperStyle: CSSProperties = {
        ['--mineral-week-grid-color' as never]: `var(--mineral-${color})`,
        ...style,
    }

    const hasHeader = title != null || description != null || hint != null || peakLabel != null

    return (
        <div className={cn('mineral-week-grid', className)} style={wrapperStyle} {...rest}>
            {hasHeader && (
                <MStack spacing={'xs'}>
                    <div className={'mineral-week-grid__title-row'}>
                        <div className={'mineral-week-grid__title-text'}>
                            {title != null && (
                                typeof title === 'string' ? <MHeading level={5}>{title}</MHeading> : title
                            )}
                            {description != null && (
                                typeof description === 'string' ? (
                                    <MSubText tone={'muted'}>{description}</MSubText>
                                ) : (
                                    description
                                )
                            )}
                        </div>
                        {peakLabel != null && (
                            <MText size={'sm'} tone={'muted'}>
                                {peakLabel}
                            </MText>
                        )}
                    </div>
                    {hint != null && (
                        <MSubText size={'xs'} tone={'muted'}>
                            {hint}
                        </MSubText>
                    )}
                </MStack>
            )}

            <div className={'mineral-week-grid__matrix'} style={matrixStyle}>
                <div />
                {cols.map((label, slot) => (
                    <div key={`col-${slot}`} className={'mineral-week-grid__col-header'}>
                        <MSubText size={'xs'} tone={'muted'}>
                            {label}
                        </MSubText>
                    </div>
                ))}

                {rows.map(({label: dayLabel, calendarDay}, rowIndex) => (
                    <Fragment key={`row-${rowIndex}-${calendarDay}`}>
                        <div className={'mineral-week-grid__row-label'}>
                            <MSubText size={'xs'} tone={'muted'}>
                                {dayLabel}
                            </MSubText>
                        </div>
                        {cols.map((slotLabel, slot) => {
                            const value = grid[calendarDay]?.[slot] ?? 0
                            const band = densityBand(value, resolvedMax)
                            const ctx: MWeekGridCellContext = {day: calendarDay, slot, value, band}
                            const cellContent = renderCell ? renderCell(ctx) : defaultRenderCell(ctx)
                            const tooltipContent = renderTooltip
                                ? renderTooltip(ctx)
                                : defaultRenderTooltip(ctx, dayLabel, slotLabel)

                            const cellClasses = cn(
                                'mineral-week-grid__cell',
                                `mineral-week-grid__cell--band-${band}`,
                                onCellClick && 'mineral-week-grid__cell--interactive',
                                !onCellClick && tooltipContent != null && 'mineral-week-grid__cell--tooltip'
                            )

                            const cellNode = (
                                <div
                                    className={cellClasses}
                                    style={{height: cellHeight}}
                                    onClick={onCellClick ? () => onCellClick(ctx) : undefined}
                                    role={onCellClick ? 'button' : undefined}
                                    tabIndex={onCellClick ? 0 : undefined}
                                >
                                    {cellContent}
                                </div>
                            )

                            if (tooltipContent == null) {
                                return <Fragment key={`cell-${rowIndex}-${slot}`}>{cellNode}</Fragment>
                            }

                            return (
                                <MTooltip key={`cell-${rowIndex}-${slot}`} content={tooltipContent}>
                                    {cellNode}
                                </MTooltip>
                            )
                        })}
                    </Fragment>
                ))}
            </div>

            {showLegend && (
                <div className={'mineral-week-grid__legend'}>
                    <MSubText size={'xs'} tone={'muted'}>
                        {`Scale: 0 — ${resolvedMax}${legendUnit ? ` ${legendUnit}` : ''}`}
                    </MSubText>
                    <div className={'mineral-week-grid__legend-bands'}>
                        {([0, 1, 2, 3] as const).map((band) => (
                            <div key={`legend-${band}`} className={'mineral-week-grid__legend-band'}>
                                <span
                                    className={cn(
                                        'mineral-week-grid__legend-swatch',
                                        `mineral-week-grid__cell--band-${band}`
                                    )}
                                />
                                <MSubText size={'xs'} tone={'muted'}>
                                    {bandLabels[band]}
                                </MSubText>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
