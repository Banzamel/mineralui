import {useState} from 'react'
import type {BannerProps} from './Banner.types'
import {cn} from '../../../utils/cn'
import './Banner.css'

// Render a prominent banner for announcements, CTAs or dismissible messages.
export function Banner({
    color = 'primary',
    variant = 'filled',
    icon,
    action,
    dismissible = false,
    onDismiss,
    className,
    children,
    ...rest
}: BannerProps) {
    const [visible, setVisible] = useState(true)

    if (!visible) return null

    const handleDismiss = () => {
        setVisible(false)
        onDismiss?.()
    }

    return (
        <div className={cn('banner', color, variant, className)} role="banner" {...rest}>
            {icon && <span className="banner-icon">{icon}</span>}
            <div className="banner-content">{children}</div>
            {action && <div className="banner-action">{action}</div>}
            {dismissible && (
                <button className="banner-dismiss" onClick={handleDismiss} aria-label="Dismiss" type="button">
                    ✕
                </button>
            )}
        </div>
    )
}
