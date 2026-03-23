import {useEffect, useState} from 'react'
import type {ToastEntry} from './Toast.types'
import {cn} from '../../../utils/cn'

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

    return (
        <div
            className={cn('toast-item', entry.color || 'info', exiting && 'exit')}
            role="status"
            onAnimationEnd={handleEnd}
        >
            {entry.title && <div className="title">{entry.title}</div>}
            <div className="message">{entry.message}</div>
            <button className="close" onClick={() => setExiting(true)} aria-label="Close">×</button>
        </div>
    )
}
