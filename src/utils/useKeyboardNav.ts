import {useState, useCallback, type KeyboardEvent} from 'react'

export interface UseKeyboardNavOptions {
    itemCount: number
    onSelect: (index: number) => void
    onClose: () => void
    isOpen: boolean
    loop?: boolean
}

// Provide arrow-key navigation and selection state for list-like widgets.
export function useKeyboardNav({itemCount, onSelect, onClose, isOpen, loop = true}: UseKeyboardNavOptions) {
    const [activeIndex, setActiveIndex] = useState(-1)

    // Reset highlight state when the owning widget closes or clears results.
    const resetIndex = useCallback(() => setActiveIndex(-1), [])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen || itemCount === 0) return

            switch (e.key) {
                case 'ArrowDown': {
                    e.preventDefault()
                    setActiveIndex((prev) => {
                        if (prev >= itemCount - 1) return loop ? 0 : prev
                        return prev + 1
                    })
                    break
                }
                case 'ArrowUp': {
                    e.preventDefault()
                    setActiveIndex((prev) => {
                        if (prev <= 0) return loop ? itemCount - 1 : 0
                        return prev - 1
                    })
                    break
                }
                case 'Enter': {
                    e.preventDefault()
                    if (activeIndex >= 0 && activeIndex < itemCount) {
                        onSelect(activeIndex)
                    }
                    break
                }
                case 'Escape': {
                    e.preventDefault()
                    onClose()
                    break
                }
                case 'Home': {
                    e.preventDefault()
                    setActiveIndex(0)
                    break
                }
                case 'End': {
                    e.preventDefault()
                    setActiveIndex(itemCount - 1)
                    break
                }
            }
        },
        [isOpen, itemCount, activeIndex, onSelect, onClose, loop]
    )

    return {activeIndex, setActiveIndex, resetIndex, onKeyDown}
}
