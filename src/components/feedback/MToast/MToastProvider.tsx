import {useCallback, useMemo, useRef, useState} from 'react'
import {MPortal} from '../../primitives'
import {MToastContextProvider, useMToast} from './MToastContext'
import {MToastItem} from './MToastItem'
import type {MToastEntry, MToastOptions, MToastProviderProps} from './MToast.types'
import {cn} from '../../../utils/cn'
import './MToast.css'

let counter = 0

// Global toast container with auto-dismiss and stacking.
export function MToastProvider({position = 'top-right', duration = 4000, children}: MToastProviderProps) {
    const [toasts, setToasts] = useState<MToastEntry[]>([])
    const defaultDuration = useRef(duration)
    defaultDuration.current = duration

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const toast = useCallback((options: MToastOptions) => {
        const id = `toast-${++counter}`
        const entry: MToastEntry = {
            id,
            ...options,
            duration: options.duration ?? defaultDuration.current,
        }
        setToasts((prev) => [...prev, entry])
        return id
    }, [])

    const ctx = useMemo(() => ({toast, dismiss}), [toast, dismiss])

    return (
        <MToastContextProvider value={ctx}>
            {children}
            <MPortal>
                <div className={cn('toast container', position)}>
                    {toasts.map((entry) => (
                        <MToastItem key={entry.id} entry={entry} onDismiss={dismiss} />
                    ))}
                </div>
            </MPortal>
        </MToastContextProvider>
    )
}

export {useMToast}
