import {useEffect, useState} from 'react'
import type {ReactNode} from 'react'
import type {ToastEntry} from './Toast.types'
import {cn} from '../../../utils/cn'
import {CloseIcon, ErrorIcon, InfoIcon, NeutralIcon, SuccessIcon, WarningIcon} from '../../../icons'

const icons: Record<string, ReactNode> = {
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
    danger: <ErrorIcon />,
    info: <InfoIcon />,
    primary: <InfoIcon />,
    neutral: <NeutralIcon />,
}

// Single toast notification with enter/exit animation.
export function ToastItem({entry, onDismiss}: {entry: ToastEntry; onDismiss: (id: string) => void}) {
    const [exiting, setExiting] = useState(false)
    const duration = entry.duration ?? 4000

    useEffect(() => {
        if (duration <= 0) return
        const timer = setTimeout(() => setExiting(true), duration)
        return () => clearTimeout(timer)
    }, [duration])

    function handleEnd() {
        if (exiting) onDismiss(entry.id)
    }

    const color = entry.color || 'info'
    const icon =
        entry.icon === false ? null : entry.icon === undefined || entry.icon === true ? icons[color] : entry.icon

    return (
        <div className={cn('toast item', color, exiting && 'exit')} role="status" onAnimationEnd={handleEnd}>
            <div className="toast body">
                {icon && <span className="toast icon">{icon}</span>}
                <div className="toast content">
                    {entry.title && <div className="toast title">{entry.title}</div>}
                    <div className="toast message">{entry.message}</div>
                </div>
            </div>
            <button className="toast close" onClick={() => setExiting(true)} aria-label="Close">
                <CloseIcon />
            </button>
        </div>
    )
}
