import type {MCardWidgetProps} from './MCardWidget.types'
import {cn} from '../../../utils/cn'
import {MArrowDownIcon, MArrowUpIcon} from '../../../icons'
import './MCardWidget.css'

function resolveTrendType(trend: MCardWidgetProps['trend'], explicit?: MCardWidgetProps['trendType']) {
    if (explicit) return explicit
    if (typeof trend !== 'number' || trend === 0) return 'neutral'
    return trend > 0 ? 'up' : 'down'
}

function formatTrend(trend: MCardWidgetProps['trend']) {
    if (typeof trend === 'number' && trend > 0) {
        return `+${trend}`
    }

    return trend
}

export function MCardWidget({
    title,
    value,
    trend,
    trendType,
    icon,
    color = 'primary',
    helperText,
    className,
    ...rest
}: MCardWidgetProps) {
    const hasTrend = trend !== undefined && trend !== null
    const resolvedTrendType = resolveTrendType(trend, trendType)
    const formattedTrend = formatTrend(trend)

    return (
        <div className={cn('card-widget', `color-${color}`, className)} {...rest}>
            <div className="cw-top">
                <div className="cw-meta">
                    <span className="cw-title">{title}</span>
                    <span className="cw-value">{value}</span>
                </div>
                {icon && <span className="cw-icon">{icon}</span>}
            </div>

            {hasTrend && (
                <div className="cw-bottom">
                    <span className={cn('cw-trend', resolvedTrendType)}>
                        {resolvedTrendType === 'up' && <MArrowUpIcon size={14} />}
                        {resolvedTrendType === 'down' && <MArrowDownIcon size={14} />}
                        <span>{formattedTrend}</span>
                    </span>
                </div>
            )}

            {helperText && <div className="cw-helper">{helperText}</div>}
        </div>
    )
}
