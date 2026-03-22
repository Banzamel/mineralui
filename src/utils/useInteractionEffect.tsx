import {useCallback, useRef} from 'react'
import type {PointerEvent, ReactElement} from 'react'

export type MineralClickEffect = 'none' | 'ripple'

export interface UseInteractionEffectOptions {
    effect?: MineralClickEffect
    disabled?: boolean
    centered?: boolean
    color?: string
}

export interface UseInteractionEffectResult<T extends HTMLElement> {
    effectClassName?: string
    effectLayer: ReactElement | null
    handlePointerDown: (event: PointerEvent<T>) => void
    triggerEffect: (target: T | null) => void
}

interface RippleOptions {
    centered: boolean
    color?: string
    clientX?: number
    clientY?: number
}

// Render and position a ripple wave inside the dedicated effect layer.
function appendRipple(layer: HTMLSpanElement, host: HTMLElement, options: RippleOptions) {
    const rect = host.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.75
    const radius = size / 2
    const wave = document.createElement('span')
    const x =
        options.centered || options.clientX === undefined
            ? rect.width / 2 - radius
            : options.clientX - rect.left - radius
    const y =
        options.centered || options.clientY === undefined
            ? rect.height / 2 - radius
            : options.clientY - rect.top - radius

    wave.className = 'click-effect-wave'
    wave.style.width = `${size}px`
    wave.style.height = `${size}px`
    wave.style.left = `${x}px`
    wave.style.top = `${y}px`

    if (options.color) {
        wave.style.setProperty('--click-effect-color', options.color)
    }

    layer.appendChild(wave)
    wave.addEventListener('animationend', () => wave.remove(), {once: true})
}

// Attach a lightweight click feedback effect without coupling it to a specific component.
export function useInteractionEffect<T extends HTMLElement = HTMLElement>({
    effect = 'ripple',
    disabled = false,
    centered = false,
    color,
}: UseInteractionEffectOptions = {}): UseInteractionEffectResult<T> {
    const layerRef = useRef<HTMLSpanElement>(null)
    const enabled = effect === 'ripple' && !disabled

    // Trigger a centered ripple for keyboard-driven or programmatic actions.
    const triggerEffect = useCallback(
        (target: T | null) => {
            if (!enabled || !target || !layerRef.current) {
                return
            }

            appendRipple(layerRef.current, target, {centered: true, color})
        },
        [color, enabled]
    )

    // Start the ripple from the actual pointer position when possible.
    const handlePointerDown = useCallback(
        (event: PointerEvent<T>) => {
            if (!enabled || !layerRef.current) {
                return
            }

            if (event.pointerType === 'mouse' && event.button !== 0) {
                return
            }

            appendRipple(layerRef.current, event.currentTarget, {
                centered,
                color,
                clientX: event.clientX,
                clientY: event.clientY,
            })
        },
        [centered, color, enabled]
    )

    return {
        effectClassName: enabled ? 'click-effect-root' : undefined,
        effectLayer: enabled ? <span ref={layerRef} className="click-effect-layer" aria-hidden="true" /> : null,
        handlePointerDown,
        triggerEffect,
    }
}
