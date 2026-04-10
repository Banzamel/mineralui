import {useState, useRef} from 'react'
import type {MBannerProps} from './MBanner.types'
import {cn} from '../../../utils/cn'
import {MButton} from '../../controls'
import {MCloseIcon} from '../../../icons'
import './MBanner.css'

// Render a prominent banner for announcements, CTAs or dismissible messages.
export function MBanner({
    color = 'primary',
    variant = 'filled',
    icon,
    action,
    dismissible = false,
    onDismiss,
    className,
    children,
    ...rest
}: MBannerProps) {
    const [visible, setVisible] = useState(true)
    const [dismissing, setDismissing] = useState(false)
    const wrapRef = useRef<HTMLDivElement>(null)

    if (!visible) return null

    const handleDismiss = () => {
        setDismissing(true)
        const el = wrapRef.current
        if (!el) {
            setVisible(false)
            onDismiss?.()
            return
        }
        const onEnd = () => {
            setVisible(false)
            setDismissing(false)
            onDismiss?.()
        }
        el.addEventListener('transitionend', onEnd, {once: true})
        setTimeout(onEnd, 1000)
    }

    return (
        <div ref={wrapRef} className={cn('banner-wrap', dismissing && 'dismissing')}>
            <div className={cn('banner', `color-${color}`, variant, className)} role="banner" {...rest}>
                {icon && <span className="banner-icon">{icon}</span>}
                <div className="banner-content">{children}</div>
                {action && <div className="banner-action">{action}</div>}
                {dismissible && (
                    <MButton
                        variant="link"
                        color="neutral"
                        iconOnly
                        size="sm"
                        className="banner-dismiss"
                        onClick={handleDismiss}
                        aria-label="Dismiss"
                    >
                        <MCloseIcon />
                    </MButton>
                )}
            </div>
        </div>
    )
}
