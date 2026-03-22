import {useState, useEffect, useRef, useCallback} from 'react'
import {Portal} from '../Portal'
import {cn} from '../../../utils/cn'
import type {PopoverProps} from './Popover.types'
import './Popover.css'

// Position floating content relative to an anchor with viewport-aware flipping.
export function Popover({
    open,
    anchorRef,
    onClose,
    placement = 'bottom-start',
    matchWidth = false,
    offset = 4,
    children,
    className,
    style,
}: PopoverProps) {
    const popoverRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState<{top: number; left: number; width?: number} | null>(null)
    const [flipped, setFlipped] = useState(false)

    // Recalculate popover position whenever layout or viewport constraints change.
    const updatePosition = useCallback(() => {
        if (!anchorRef.current || !popoverRef.current) return

        const anchor = anchorRef.current.getBoundingClientRect()
        const popover = popoverRef.current.getBoundingClientRect()
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        const isTop = placement.startsWith('top')
        const isEnd = placement.endsWith('end')

        // Check if we need to flip (not enough space below, flip to top, or vice versa)
        const spaceBelow = viewport.height - anchor.bottom - offset
        const spaceAbove = anchor.top - offset
        const shouldFlip = isTop
            ? spaceAbove < popover.height && spaceBelow > spaceAbove
            : spaceBelow < popover.height && spaceAbove > spaceBelow

        setFlipped(shouldFlip)

        const showOnTop = isTop ? !shouldFlip : shouldFlip

        let top: number
        if (showOnTop) {
            top = anchor.top - popover.height - offset + window.scrollY
        } else {
            top = anchor.bottom + offset + window.scrollY
        }

        let left: number
        if (isEnd) {
            left = anchor.right - popover.width + window.scrollX
        } else {
            left = anchor.left + window.scrollX
        }

        // Clamp to viewport
        left = Math.max(8, Math.min(left, viewport.width - popover.width - 8))
        top = Math.max(8 + window.scrollY, top)

        setPosition({
            top,
            left,
            width: matchWidth ? anchor.width : undefined,
        })
    }, [anchorRef, placement, offset, matchWidth])

    useEffect(() => {
        if (!open) {
            setPosition(null)
            return
        }

        // Wait one frame so the rendered popover can be measured accurately.
        requestAnimationFrame(updatePosition)

        window.addEventListener('scroll', updatePosition, {passive: true})
        window.addEventListener('resize', updatePosition, {passive: true})
        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
        }
    }, [open, updatePosition])

    // Close the popover with the standard Escape key interaction.
    useEffect(() => {
        if (!open) return
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [open, onClose])

    // Close when the user interacts outside both the popover and its anchor.
    useEffect(() => {
        if (!open) return
        const handleClick = (e: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target as Node) &&
                anchorRef.current &&
                !anchorRef.current.contains(e.target as Node)
            ) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [open, onClose, anchorRef])

    if (!open) return null

    return (
        <Portal>
            <div
                ref={popoverRef}
                className={cn('popover', flipped ? 'flipped' : 'normal', className)}
                style={{
                    position: 'absolute',
                    top: position?.top ?? 0,
                    left: position?.left ?? 0,
                    width: position?.width,
                    visibility: position ? 'visible' : 'hidden',
                    ...style,
                }}
                role="listbox"
            >
                {children}
            </div>
        </Portal>
    )
}
