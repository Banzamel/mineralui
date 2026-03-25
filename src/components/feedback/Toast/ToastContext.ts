import {createContext, useContext} from 'react'
import type {ToastContext as ToastContextType} from './Toast.types'

const ToastCtx = createContext<ToastContextType | null>(null)

export const ToastContextProvider = ToastCtx.Provider

export function useToast(): ToastContextType {
    const ctx = useContext(ToastCtx)
    if (!ctx) throw new Error('useToast must be used inside ToastProvider')
    return ctx
}
