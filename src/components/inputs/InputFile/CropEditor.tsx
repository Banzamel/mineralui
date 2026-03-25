import {useState, useRef, useCallback, useEffect} from 'react'
import type {InputFileCropShape} from './InputFile.types'
import './CropEditor.css'

interface CropEditorProps {
    file: File
    shape: InputFileCropShape
    outputSize: number
    quality: number
    onCrop: (cropped: File) => void
    onCancel: () => void
}

export function CropEditor({file, shape, outputSize, quality, onCrop, onCancel}: CropEditorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const [imgSrc, setImgSrc] = useState('')
    const [scale, setScale] = useState(1)
    const [offset, setOffset] = useState({x: 0, y: 0})
    const [dragging, setDragging] = useState(false)
    const dragStart = useRef({x: 0, y: 0, ox: 0, oy: 0})

    useEffect(() => {
        const url = URL.createObjectURL(file)
        setImgSrc(url)
        return () => URL.revokeObjectURL(url)
    }, [file])

    useEffect(() => {
        if (!imgSrc) return
        const img = new Image()
        img.onload = () => {
            imgRef.current = img
            const minDim = Math.min(img.width, img.height)
            const containerSize = 280
            const initialScale = containerSize / minDim
            setScale(initialScale)
            setOffset({
                x: (containerSize - img.width * initialScale) / 2,
                y: (containerSize - img.height * initialScale) / 2,
            })
        }
        img.src = imgSrc
    }, [imgSrc])

    const handlePointerDown = useCallback(
        (e: React.PointerEvent) => {
            e.preventDefault()
            setDragging(true)
            dragStart.current = {x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y}
            ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        },
        [offset]
    )

    const handlePointerMove = useCallback(
        (e: React.PointerEvent) => {
            if (!dragging) return
            setOffset({
                x: dragStart.current.ox + (e.clientX - dragStart.current.x),
                y: dragStart.current.oy + (e.clientY - dragStart.current.y),
            })
        },
        [dragging]
    )

    const handlePointerUp = useCallback(() => {
        setDragging(false)
    }, [])

    const handleWheel = useCallback(
        (e: React.WheelEvent) => {
            e.preventDefault()
            const containerSize = 280
            const cx = containerSize / 2
            const cy = containerSize / 2

            const delta = e.deltaY > 0 ? 0.95 : 1.05
            const newScale = Math.max(0.1, Math.min(scale * delta, 10))

            setOffset({
                x: cx - (cx - offset.x) * (newScale / scale),
                y: cy - (cy - offset.y) * (newScale / scale),
            })
            setScale(newScale)
        },
        [scale, offset]
    )

    const handleSlider = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const containerSize = 280
            const cx = containerSize / 2
            const cy = containerSize / 2

            const newScale = parseFloat(e.target.value)
            setOffset({
                x: cx - (cx - offset.x) * (newScale / scale),
                y: cy - (cy - offset.y) * (newScale / scale),
            })
            setScale(newScale)
        },
        [scale, offset]
    )

    const exportCrop = useCallback(() => {
        const img = imgRef.current
        const canvas = canvasRef.current
        if (!img || !canvas) return

        const containerSize = 280
        canvas.width = outputSize
        canvas.height = outputSize
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const ratio = outputSize / containerSize

        if (shape === 'circle') {
            ctx.beginPath()
            ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2)
            ctx.closePath()
            ctx.clip()
        }

        ctx.drawImage(
            img,
            offset.x * ratio,
            offset.y * ratio,
            img.width * scale * ratio,
            img.height * scale * ratio
        )

        canvas.toBlob(
            (blob) => {
                if (!blob) return
                const ext = file.name.replace(/.*\./, '')
                const name = file.name.replace(/\.[^.]+$/, '') + '_cropped.' + ext
                const cropped = new File([blob], name, {type: blob.type})
                onCrop(cropped)
            },
            file.type.startsWith('image/png') ? 'image/png' : 'image/jpeg',
            quality
        )
    }, [file, offset, scale, outputSize, quality, shape, onCrop])

    return (
        <div className="crop-editor">
            <div
                ref={containerRef}
                className={`viewport ${shape}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onWheel={handleWheel}
            >
                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt=""
                        className="image"
                        draggable={false}
                        style={{
                            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                            transformOrigin: '0 0',
                        }}
                    />
                )}
                <div className={`overlay ${shape}`} />
            </div>

            <div className="zoom">
                <svg viewBox="0 0 16 16" className="zoom-icon" aria-hidden="true">
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M5 7H9M7 5V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <input
                    type="range"
                    className="zoom-slider"
                    min="0.1"
                    max="5"
                    step="0.01"
                    value={scale}
                    onChange={handleSlider}
                />
            </div>

            <div className="actions">
                <button type="button" className="btn cancel" onClick={onCancel}>
                    Cancel
                </button>
                <button type="button" className="btn confirm" onClick={exportCrop}>
                    Crop
                </button>
            </div>

            <canvas ref={canvasRef} style={{display: 'none'}} />
        </div>
    )
}
