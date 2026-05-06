import {useEffect, useRef, useState, type ReactNode} from 'react'

interface ScaleToFitProps {
    /**
     * Minimum render width (in CSS px). When the parent is narrower, content
     * is rendered at this width and scaled down. When the parent is wider,
     * content is rendered at the parent's width (no scale-up, no padding).
     */
    baseWidth?: number
    children: ReactNode
}

/**
 * Renders `children` at `max(baseWidth, parentWidth)`, then applies
 * `transform: scale(...)` so the rendered block fits the parent box without
 * scrollbars. Scale never exceeds 1 (no blurry up-scaling). When the parent
 * is wider than baseWidth, render width tracks the parent so content fills
 * the available space natively (no horizontal padding).
 */
export function ScaleToFit({baseWidth = 480, children}: ScaleToFitProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)
    const [renderWidth, setRenderWidth] = useState<number>(baseWidth)

    useEffect(() => {
        const wrap = wrapperRef.current
        const content = contentRef.current
        if (!wrap || !content) return

        let frame = 0
        const recompute = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
                const wW = wrap.clientWidth
                const wH = wrap.clientHeight
                if (wW === 0 || wH === 0) return
                const cW = Math.max(baseWidth, wW)
                const cH = content.offsetHeight
                if (cW === 0 || cH === 0) return
                const sW = wW / cW
                const sH = wH / cH
                const next = Math.min(sW, sH, 1)
                if (next > 0 && Number.isFinite(next)) {
                    setRenderWidth(cW)
                    setScale(next)
                }
            })
        }

        const ro = new ResizeObserver(recompute)
        ro.observe(wrap)
        ro.observe(content)
        recompute()
        return () => {
            cancelAnimationFrame(frame)
            ro.disconnect()
        }
    }, [baseWidth])

    return (
        <div ref={wrapperRef} className="canvas-grid-scale-wrapper">
            <div
                ref={contentRef}
                className="canvas-grid-scale-content"
                style={{width: `${renderWidth}px`, transform: `scale(${scale})`}}
            >
                {children}
            </div>
        </div>
    )
}
