import {createContext, useContext} from 'react'
import type {MToastContext as MToastContextType} from './MToast.types'

const ToastCtx = createContext<MToastContextType | null>(null)

export const MToastContextProvider = ToastCtx.Provider

export function useMToast(): MToastContextType {
    const ctx = useContext(ToastCtx)
    if (!ctx) throw new Error('useMToast must be used inside MToastProvider')
    return ctx
}
