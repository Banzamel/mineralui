import {useCallback} from 'react'
import type {MPopconfirmProps} from './MPopconfirm.types'
import {MPopover} from '../../primitives'
import {MButton} from '../../controls'
import {cn} from '../../../utils/cn'
import './MPopconfirm.css'

export function MPopconfirm({
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
}: MPopconfirmProps) {
    const handleCancel = useCallback(() => {
        onOpenChange(false)
        onCancel?.()
    }, [onOpenChange, onCancel])

    const handleConfirm = useCallback(() => {
        onOpenChange(false)
        onConfirm()
    }, [onOpenChange, onConfirm])

    return (
        <MPopover
            open={open}
            anchorRef={anchorRef}
            onClose={handleCancel}
            placement={placement}
            className={cn('popconfirm', `color-${color}`, className)}
        >
            <div className="body">
                {icon && <div className="icon">{icon}</div>}
                <div className="content">
                    <div className="title">{title}</div>
                    {description && <div className="description">{description}</div>}
                </div>
            </div>
            <div className="actions">
                <MButton variant="ghost" size="sm" color="neutral" onClick={handleCancel}>
                    {cancelText}
                </MButton>
                <MButton variant="ghost" size="sm" color={color} onClick={handleConfirm}>
                    {confirmText}
                </MButton>
            </div>
        </MPopover>
    )
}
