import {useCallback} from 'react'
import type {PopconfirmProps} from './Popconfirm.types'
import {Popover} from '../../primitives/Popover'
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
            <div className="popconfirm-body">
                {icon && <div className="popconfirm-icon">{icon}</div>}
                <div className="popconfirm-content">
                    <div className="popconfirm-title">{title}</div>
                    {description && (
                        <div className="popconfirm-description">{description}</div>
                    )}
                </div>
            </div>
            <div className="popconfirm-actions">
                <button
                    type="button"
                    className="popconfirm-btn cancel"
                    onClick={handleCancel}
                >
                    {cancelText}
                </button>
                <button
                    type="button"
                    className="popconfirm-btn confirm"
                    onClick={handleConfirm}
                >
                    {confirmText}
                </button>
            </div>
        </Popover>
    )
}
