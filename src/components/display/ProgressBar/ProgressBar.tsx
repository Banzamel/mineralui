import type {ProgressBarProps} from './ProgressBar.types'
import {cn} from '../../../utils/cn'
import './ProgressBar.css'

// Render a horizontal bar that fills to represent progress as a percentage.
export function ProgressBar({
    value,
    max = 100,
    color = 'primary',
    size = 'md',
    label,
    showValue = false,
    animated = false,
    striped = false,
    className,
    ...rest
}: ProgressBarProps) {
    const percent = Math.min(100, Math.max(0, (value / max) * 100))

    return (
        <div
            className={cn('progress-bar', color, size, className)}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={label}
            {...rest}
        >
            {(label || showValue) && (
                <div className="progress-bar-header">
                    {label && <span className="progress-bar-label">{label}</span>}
                    {showValue && <span className="progress-bar-value">{Math.round(percent)}%</span>}
                </div>
            )}
            <div className="progress-bar-track">
                <div
                    className={cn(
                        'progress-bar-fill',
                        animated && 'animated',
                        striped && 'striped'
                    )}
                    style={{width: `${percent}%`}}
                />
            </div>
        </div>
    )
}
