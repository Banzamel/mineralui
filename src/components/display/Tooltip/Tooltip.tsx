import {useRef, useState} from 'react'
import type {TooltipProps} from './Tooltip.types'
import {cn} from '../../../utils/cn'
import './Tooltip.css'

// Lightweight tooltip shown on hover or focus around a child element.
export function Tooltip({
    content,
    placement = 'top',
    delay = 0,
    className,
    children,
    ...rest
}: TooltipProps) {
    const [visible, setVisible] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

    function show() {
        if (delay > 0) {
            timeoutRef.current = setTimeout(() => setVisible(true), delay)
        } else {
            setVisible(true)
        }
    }

    function hide() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setVisible(false)
    }

    return (
        <div
            className={cn('tooltip-wrapper', className)}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            {...rest}
        >
            {children}
            {visible && (
                <div className={cn('tooltip-bubble', placement)} role="tooltip">
                    {content}
                </div>
            )}
        </div>
    )
}
