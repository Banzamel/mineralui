import {useCallback, useMemo, useRef, useState} from 'react'
import {Portal} from '../../primitives'
import {ToastContextProvider, useToast} from './ToastContext'
import {ToastItem} from './ToastItem'
import type {ToastEntry, ToastOptions, ToastProviderProps} from './Toast.types'
import {cn} from '../../../utils/cn'
import './Toast.css'

let counter = 0

// Global toast container with auto-dismiss and stacking.
export function ToastProvider({position = 'top-right', duration = 4000, children}: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastEntry[]>([])
    const defaultDuration = useRef(duration)
    defaultDuration.current = duration

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const toast = useCallback((options: ToastOptions) => {
        const id = `toast-${++counter}`
        const entry: ToastEntry = {
            id,
            ...options,
            duration: options.duration ?? defaultDuration.current,
        }
        setToasts((prev) => [...prev, entry])
        return id
    }, [])

    const ctx = useMemo(() => ({toast, dismiss}), [toast, dismiss])

    return (
        <ToastContextProvider value={ctx}>
            {children}
            <Portal>
                <div className={cn('toast container', position)}>
                    {toasts.map((entry) => (
                        <ToastItem key={entry.id} entry={entry} onDismiss={dismiss} />
                    ))}
                </div>
            </Portal>
        </ToastContextProvider>
    )
}

export {useToast}
