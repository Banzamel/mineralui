import {useRef, useState, useCallback, useLayoutEffect} from 'react'
import type {MTooltipProps} from './MTooltip.types'
import {cn} from '../../../utils/cn'
import {MPortal} from '../../primitives'
import './MTooltip.css'

function computePosition(trigger: DOMRect, bubble: DOMRect, placement: string): {top: number; left: number} {
    const gap = 6
    switch (placement) {
        case 'bottom':
            return {top: trigger.bottom + gap, left: trigger.left + trigger.width / 2 - bubble.width / 2}
        case 'left':
            return {top: trigger.top + trigger.height / 2 - bubble.height / 2, left: trigger.left - bubble.width - gap}
        case 'right':
            return {top: trigger.top + trigger.height / 2 - bubble.height / 2, left: trigger.right + gap}
        default:
            return {top: trigger.top - bubble.height - gap, left: trigger.left + trigger.width / 2 - bubble.width / 2}
    }
}

export function MTooltip({content, placement = 'top', delay = 0, className, children, ...rest}: MTooltipProps) {
    const [visible, setVisible] = useState(false)
    const [pos, setPos] = useState<{top: number; left: number} | null>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const bubbleRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

    const show = useCallback(() => {
        if (delay > 0) {
            timeoutRef.current = setTimeout(() => setVisible(true), delay)
        } else {
            setVisible(true)
        }
    }, [delay])

    const hide = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setVisible(false)
        setPos(null)
    }, [])

    useLayoutEffect(() => {
        if (!visible || !wrapperRef.current || !bubbleRef.current) return
        const triggerRect = wrapperRef.current.getBoundingClientRect()
        const bubbleRect = bubbleRef.current.getBoundingClientRect()
        setPos(computePosition(triggerRect, bubbleRect, placement))
    }, [visible, placement])

    return (
        <div
            ref={wrapperRef}
            className={cn('tooltip wrapper', className)}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            {...rest}
        >
            {children}
            {visible && (
                <MPortal>
                    <div
                        ref={bubbleRef}
                        className={cn('tooltip bubble', placement)}
                        role="tooltip"
                        style={pos ? {top: pos.top, left: pos.left} : {visibility: 'hidden'}}
                    >
                        {content}
                    </div>
                </MPortal>
            )}
        </div>
    )
}
