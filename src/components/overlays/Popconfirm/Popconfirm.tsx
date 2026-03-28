import {useCallback} from 'react'
import type {PopconfirmProps} from './Popconfirm.types'
import {Popover} from '../../primitives'
import {cn} from '../../../utils/cn'
import './Popconfirm.css'

export function Popconfirm({
    title,
    description,
    onConfirm,
    onCancel,
    confirmText = 'Yes',
    cancelText = 'No',
    color = 'warning',
    icon,
    placement = 'top-start',
    open,
    onOpenChange,
    anchorRef,
    className,
}: PopconfirmProps) {
    const handleCancel = useCallback(() => {
        onOpenChange(false)
        onCancel?.()
    }, [onOpenChange, onCancel])

    const handleConfirm = useCallback(() => {
        onOpenChange(false)
        onConfirm()
    }, [onOpenChange, onConfirm])

    return (
        <Popover
            open={open}
            anchorRef={anchorRef}
            onClose={handleCancel}
            placement={placement}
            className={cn('popconfirm', color, className)}
        >
            <div className="body">
                {icon && <div className="icon">{icon}</div>}
                <div className="content">
                    <div className="title">{title}</div>
                    {description && <div className="description">{description}</div>}
                </div>
            </div>
            <div className="actions">
                <button type="button" className="btn cancel" onClick={handleCancel}>
                    {cancelText}
                </button>
                <button type="button" className="btn confirm" onClick={handleConfirm}>
                    {confirmText}
                </button>
            </div>
        </Popover>
    )
}
