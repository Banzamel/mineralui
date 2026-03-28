import {useCallback, useEffect, useRef, useState} from 'react'
import type {ColorPickerProps} from './ColorPicker.types'
import {cn} from '../../../utils/cn'
import './ColorPicker.css'

function hsvToHex(h: number, s: number, v: number): string {
    const f = (n: number) => {
        const k = (n + h / 60) % 6
        return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
    }
    const r = Math.round(f(5) * 255)
    const g = Math.round(f(3) * 255)
    const b = Math.round(f(1) * 255)
    return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

function hexToHsv(hex: string): [number, number, number] {
    const m = hex.replace('#', '').match(/.{2}/g)
    if (!m) return [0, 0, 1]
    const [r, g, b] = m.map((c) => parseInt(c, 16) / 255)
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const d = max - min
    let h = 0
    if (d !== 0) {
        if (max === r) h = ((g - b) / d + 6) % 6
        else if (max === g) h = (b - r) / d + 2
        else h = (r - g) / d + 4
        h *= 60
    }
    const s = max === 0 ? 0 : d / max
    return [h, s, max]
}

function hexToRgb(hex: string): string {
    const m = hex.replace('#', '').match(/.{2}/g)
    if (!m) return 'rgb(0, 0, 0)'
    const [r, g, b] = m.map((c) => parseInt(c, 16))
    return `rgb(${r}, ${g}, ${b})`
}

function hexToHsl(hex: string): string {
    const m = hex.replace('#', '').match(/.{2}/g)
    if (!m) return 'hsl(0, 0%, 0%)'
    const [r, g, b] = m.map((c) => parseInt(c, 16) / 255)
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2
    let h = 0
    let s = 0
    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        if (max === r) h = ((g - b) / d + 6) % 6
        else if (max === g) h = (b - r) / d + 2
        else h = (r - g) / d + 4
        h *= 60
    }
    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

function formatOutput(hex: string, format: string): string {
    if (format === 'rgb') return hexToRgb(hex)
    if (format === 'hsl') return hexToHsl(hex)
    return hex
}

function normalizeToHex(value: string): string {
    if (!value) return '#000000'
    if (value.startsWith('#')) return value.length === 7 ? value : '#000000'
    const rgbMatch = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    if (rgbMatch) {
        return `#${[rgbMatch[1], rgbMatch[2], rgbMatch[3]]
            .map((c) => parseInt(c).toString(16).padStart(2, '0'))
            .join('')}`
    }
    return '#000000'
}

const DEFAULT_SWATCHES = [
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#000000',
    '#ffffff',
]

export function ColorPicker({
    value,
    onChange,
    swatches = DEFAULT_SWATCHES,
    format = 'hex',
    size = 'md',
    label,
    disabled = false,
    className,
    ...rest
}: ColorPickerProps) {
    const hex = normalizeToHex(value ?? '#3b82f6')
    const [hsv, setHsv] = useState<[number, number, number]>(() => hexToHsv(hex))
    const [inputValue, setInputValue] = useState(formatOutput(hex, format))
    const areaRef = useRef<HTMLDivElement>(null)
    const hueRef = useRef<HTMLDivElement>(null)
    const dragging = useRef<'area' | 'hue' | null>(null)

    useEffect(() => {
        const newHex = normalizeToHex(value ?? '#3b82f6')
        setHsv(hexToHsv(newHex))
        setInputValue(formatOutput(newHex, format))
    }, [value, format])

    const emit = useCallback(
        (h: number, s: number, v: number) => {
            const newHex = hsvToHex(h, s, v)
            setHsv([h, s, v])
            setInputValue(formatOutput(newHex, format))
            onChange?.(formatOutput(newHex, format))
        },
        [onChange, format]
    )

    function handleAreaPointer(e: React.PointerEvent | PointerEvent) {
        const rect = areaRef.current?.getBoundingClientRect()
        if (!rect) return
        const s = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        const v = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height))
        emit(hsv[0], s, v)
    }

    function handleHuePointer(e: React.PointerEvent | PointerEvent) {
        const rect = hueRef.current?.getBoundingClientRect()
        if (!rect) return
        const h = Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360))
        emit(h, hsv[1], hsv[2])
    }

    useEffect(() => {
        function onMove(e: PointerEvent) {
            if (dragging.current === 'area') handleAreaPointer(e)
            else if (dragging.current === 'hue') handleHuePointer(e)
        }
        function onUp() {
            dragging.current = null
        }
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        return () => {
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
        }
    })

    function handleInputChange(val: string) {
        setInputValue(val)
        try {
            const h = normalizeToHex(val)
            if (h !== '#000000' || val === '#000000' || val.toLowerCase() === 'rgb(0, 0, 0)') {
                setHsv(hexToHsv(h))
                onChange?.(formatOutput(h, format))
            }
        } catch {
            // ignore invalid input while typing
        }
    }

    const currentHex = hsvToHex(hsv[0], hsv[1], hsv[2])

    return (
        <div className={cn('color-picker', size, disabled && 'disabled', className)} {...rest}>
            {label && <label className="label">{label}</label>}

            <div
                ref={areaRef}
                className="area"
                style={{background: `hsl(${hsv[0]}, 100%, 50%)`}}
                onPointerDown={(e) => {
                    if (disabled) return
                    dragging.current = 'area'
                    handleAreaPointer(e)
                }}
            >
                <div className="white" />
                <div className="black" />
                <div
                    className="cursor"
                    style={{
                        left: `${hsv[1] * 100}%`,
                        top: `${(1 - hsv[2]) * 100}%`,
                        background: currentHex,
                    }}
                />
            </div>

            <div
                ref={hueRef}
                className="hue"
                onPointerDown={(e) => {
                    if (disabled) return
                    dragging.current = 'hue'
                    handleHuePointer(e)
                }}
            >
                <div className="hue-thumb" style={{left: `${(hsv[0] / 360) * 100}%`}} />
            </div>

            <div className="controls">
                <div className="preview" style={{background: currentHex}} />
                <input
                    type="text"
                    className="input"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    disabled={disabled}
                />
            </div>

            {swatches.length > 0 && (
                <div className="swatches">
                    {swatches.map((swatch) => (
                        <button
                            key={swatch}
                            type="button"
                            className={cn('swatch', currentHex.toLowerCase() === swatch.toLowerCase() && 'active')}
                            style={{background: swatch}}
                            onClick={() => {
                                if (disabled) return
                                const [h, s, v] = hexToHsv(swatch)
                                emit(h, s, v)
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
