import {useEffect} from 'react'
import type {MouseEvent} from 'react'
import type {DrawerProps} from './Drawer.types'
import {Portal} from '../../primitives/Portal'
import {cn} from '../../../utils/cn'
import './Drawer.css'

export function Drawer({
    open,
    onClose,
    side = 'right',
    size = 'md',
    title,
    overlay = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    className,
    children,
    ...rest
}: DrawerProps) {
    useEffect(() => {
        if (!open || !closeOnEscape) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, closeOnEscape, onClose])

    useEffect(() => {
        if (!open) return

        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [open])

    if (!open) return null

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose()
    }

    return (
        <Portal>
            <div
                className={cn('drawer-backdrop', overlay && 'drawer-backdrop--overlay')}
                onMouseDown={handleBackdropClick}
            >
                <div
                    className={cn('drawer', `drawer--${side}`, `drawer--${size}`, className)}
                    role="dialog"
                    aria-modal="true"
                    {...rest}
                >
                    {title && (
                        <div className="drawer-header">
                            <div className="drawer-title">{title}</div>
                            <button type="button" className="drawer-close" onClick={onClose} aria-label="Close">
                                &#215;
                            </button>
                        </div>
                    )}
                    <div className="drawer-body">{children}</div>
                </div>
            </div>
        </Portal>
    )
}
