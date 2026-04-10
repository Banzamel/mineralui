import {useState, useEffect, useRef, useCallback} from 'react'
import {MPortal} from '../MPortal'
import {cn} from '../../../utils/cn'
import type {MPopoverProps} from './MPopover.types'
import './MPopover.css'

// Position floating content relative to an anchor with viewport-aware flipping.
export function MPopover({
    open,
    anchorRef,
    onClose,
    placement = 'bottom-start',
    matchWidth = false,
    offset = 4,
    zIndex,
    children,
    className,
    style,
}: MPopoverProps) {
    const popoverRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState<{top: number; left: number; width?: number} | null>(null)
    const [flipped, setFlipped] = useState(false)
    const [layerZ, setLayerZ] = useState<number | string | null>(null)

    // Lift popovers above drawers, modals and mobile sidebars when the anchor sits inside them.
    const updateLayer = useCallback(() => {
        if (zIndex !== undefined) {
            setLayerZ(zIndex)
            return
        }

        const anchor = anchorRef.current
        if (!anchor || typeof window === 'undefined') {
            setLayerZ(null)
            return
        }

        const layerHost = anchor.closest('.drawer-backdrop, .modal-backdrop, .sheet-backdrop, .sidebar.mobile-open')
        if (!layerHost) {
            setLayerZ(null)
            return
        }

        const computedZ = window.getComputedStyle(layerHost).zIndex
        const parsedZ = Number.parseInt(computedZ, 10)
        setLayerZ(Number.isFinite(parsedZ) ? parsedZ + 1 : null)
    }, [anchorRef, zIndex])

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
        const isRight = placement.startsWith('right')
        const isLeft = placement.startsWith('left')
        const isHorizontal = isRight || isLeft
        const isEnd = placement.endsWith('end')

        let top: number
        let left: number

        if (isHorizontal) {
            // Horizontal placement: position to the right or left of the anchor
            const spaceRight = viewport.width - anchor.right - offset
            const spaceLeft = anchor.left - offset
            const shouldFlip = isRight
                ? spaceRight < popover.width && spaceLeft > spaceRight
                : spaceLeft < popover.width && spaceRight > spaceLeft

            setFlipped(shouldFlip)

            const showOnRight = isRight ? !shouldFlip : shouldFlip

            if (showOnRight) {
                left = anchor.right + offset + window.scrollX
            } else {
                left = anchor.left - popover.width - offset + window.scrollX
            }

            if (isEnd) {
                top = anchor.bottom - popover.height + window.scrollY
            } else {
                top = anchor.top + window.scrollY
            }
        } else {
            // Vertical placement: position above or below the anchor
            const spaceBelow = viewport.height - anchor.bottom - offset
            const spaceAbove = anchor.top - offset
            const shouldFlip = isTop
                ? spaceAbove < popover.height && spaceBelow > spaceAbove
                : spaceBelow < popover.height && spaceAbove > spaceBelow

            setFlipped(shouldFlip)

            const showOnTop = isTop ? !shouldFlip : shouldFlip

            if (showOnTop) {
                top = anchor.top - popover.height - offset + window.scrollY
            } else {
                top = anchor.bottom + offset + window.scrollY
            }

            if (isEnd) {
                left = anchor.right - popover.width + window.scrollX
            } else {
                left = anchor.left + window.scrollX
            }
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
            setLayerZ(null)
            return
        }

        updateLayer()
        // Wait one frame so the rendered popover can be measured accurately.
        requestAnimationFrame(updatePosition)

        window.addEventListener('scroll', updatePosition, {passive: true})
        window.addEventListener('resize', updatePosition, {passive: true})
        return () => {
            window.removeEventListener('scroll', updatePosition)
            window.removeEventListener('resize', updatePosition)
        }
    }, [open, updateLayer, updatePosition])

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
        <MPortal>
            <div
                ref={popoverRef}
                className={cn('popover', flipped ? 'flipped' : 'normal', className)}
                style={{
                    position: 'absolute',
                    top: position?.top ?? 0,
                    left: position?.left ?? 0,
                    width: position?.width,
                    zIndex: layerZ ?? undefined,
                    visibility: position ? 'visible' : 'hidden',
                    ...style,
                }}
                role="listbox"
            >
                {children}
            </div>
        </MPortal>
    )
}
