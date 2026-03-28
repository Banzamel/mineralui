import {useCallback, useRef} from 'react'
import type * as React from 'react'
import type {SliderProps} from './Slider.types'
import {cn} from '../../../utils/cn'
import './Slider.css'

export function Slider({
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    marks,
    label,
    color = 'primary',
    disabled = false,
    className,
    ...rest
}: SliderProps) {
    const trackRef = useRef<HTMLDivElement>(null)

    const percent = ((value - min) / (max - min)) * 100

    const clampAndSnap = useCallback(
        (raw: number) => {
            const snapped = Math.round(raw / step) * step
            return Math.min(max, Math.max(min, snapped))
        },
        [min, max, step]
    )

    const valueFromPointer = useCallback(
        (clientX: number) => {
            const track = trackRef.current
            if (!track) return value
            const rect = track.getBoundingClientRect()
            const ratio = (clientX - rect.left) / rect.width
            return clampAndSnap(min + ratio * (max - min))
        },
        [min, max, value, clampAndSnap]
    )

    const handlePointerDown = useCallback(
        (e: React.PointerEvent) => {
            if (disabled) return
            e.preventDefault()
            const target = e.currentTarget as HTMLElement
            target.setPointerCapture(e.pointerId)
            onChange(valueFromPointer(e.clientX))

            const onMove = (ev: PointerEvent) => {
                onChange(valueFromPointer(ev.clientX))
            }
            const onUp = () => {
                target.removeEventListener('pointermove', onMove)
                target.removeEventListener('pointerup', onUp)
            }
            target.addEventListener('pointermove', onMove)
            target.addEventListener('pointerup', onUp)
        },
        [disabled, onChange, valueFromPointer]
    )

    return (
        <div className={cn('slider', color, disabled && 'disabled', className)} {...rest}>
            {label && <div className="label">{label}</div>}
            <div className="track-wrapper" ref={trackRef} onPointerDown={handlePointerDown}>
                <div className="track">
                    <div className="fill" style={{width: `${percent}%`}} />
                    <div className="thumb" style={{left: `${percent}%`}} />
                </div>
                {marks && marks.length > 0 && (
                    <div className="marks">
                        {marks.map((mark) => {
                            const markPercent = ((mark.value - min) / (max - min)) * 100
                            return (
                                <div key={mark.value} className="mark" style={{left: `${markPercent}%`}}>
                                    <div className="tick" />
                                    {mark.label && <div className="label">{mark.label}</div>}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
