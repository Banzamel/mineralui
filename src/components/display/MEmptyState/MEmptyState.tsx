import {isValidElement, cloneElement} from 'react'
import type {MEmptyStateProps} from './MEmptyState.types'
import {MButton} from '../../controls/MButton'
import {cn} from '../../../utils/cn'
import './MEmptyState.css'

const BUTTON_SIZE_MAP = {xs: 'xs', sm: 'sm', md: 'sm', lg: 'md', xl: 'lg'} as const

export function MEmptyState({
    icon,
    illustration,
    title,
    description,
    buttonText,
    onAction,
    color = 'neutral',
    size = 'md',
    className,
    children,
    ...rest
}: MEmptyStateProps) {
    return (
        <div className={cn('empty-state', `color-${color}`, size, className)} {...rest}>
            {illustration && (
                <div className="empty-state-illustration">
                    {isValidElement(illustration) ? cloneElement(illustration, {color} as any) : illustration}
                </div>
            )}
            {!illustration && icon && <div className="empty-state-icon">{icon}</div>}
            <div className="empty-state-content">
                <div className="empty-state-title">{title}</div>
                {description && <div className="empty-state-description">{description}</div>}
            </div>
            {buttonText && onAction && (
                <div className="empty-state-action">
                    <MButton size={BUTTON_SIZE_MAP[size]} variant="outlined" color={color} onClick={onAction}>
                        {buttonText}
                    </MButton>
                </div>
            )}
            {children}
        </div>
    )
}
