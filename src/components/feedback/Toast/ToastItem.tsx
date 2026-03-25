import {useEffect, useState} from 'react'
import type {ReactNode} from 'react'
import type {ToastEntry} from './Toast.types'
import {cn} from '../../../utils/cn'

const icons: Record<string, ReactNode> = {
    success: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="8" />
            <path d="M7 10l2 2 4-4" />
        </svg>
    ),
    warning: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3L1.5 17h17L10 3z" />
            <path d="M10 8v4" />
            <circle cx="10" cy="14.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
    ),
    error: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="8" />
            <path d="M7 7l6 6M13 7l-6 6" />
        </svg>
    ),
    danger: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="8" />
            <path d="M7 7l6 6M13 7l-6 6" />
        </svg>
    ),
    info: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="8" />
            <path d="M10 9v4" />
            <circle cx="10" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
    ),
    primary: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="8" />
            <path d="M10 9v4" />
            <circle cx="10" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
    ),
    neutral: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="8" />
            <path d="M7 10h6" />
        </svg>
    ),
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
    const icon = icons[color]

    return (
        <div
            className={cn('toast-item', color, exiting && 'exit')}
            role="status"
            onAnimationEnd={handleEnd}
        >
            <div className="toast-body">
                {icon && <span className="toast-icon">{icon}</span>}
                <div className="toast-content">
                    {entry.title && <div className="toast-title">{entry.title}</div>}
                    <div className="toast-message">{entry.message}</div>
                </div>
            </div>
            <button className="toast-close" onClick={() => setExiting(true)} aria-label="Close">×</button>
        </div>
    )
}
