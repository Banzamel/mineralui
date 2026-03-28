import {useState} from 'react'
import type * as React from 'react'
import type {ImageProps} from './Image.types'
import {cn} from '../../../utils/cn'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './Image.css'

const RATIO_MAP: Record<string, string> = {
    '1:1': '1 / 1',
    '4:3': '4 / 3',
    '16:9': '16 / 9',
    '21:9': '21 / 9',
}

// Render a styled image with aspect ratio, fit, and optional fallback.
export function Image({
    fit = 'cover',
    ratio = 'auto',
    rounded = false,
    bordered = false,
    shadow = false,
    clickEffect = 'none',
    fallback,
    className,
    style,
    alt,
    onError,
    ...rest
}: ImageProps) {
    const [errored, setErrored] = useState(false)
    const {effectClassName, effectLayer, handlePointerDown} = useInteractionEffect<HTMLSpanElement>({
        effect: clickEffect,
    })

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (fallback && !errored) {
            setErrored(true)
            e.currentTarget.src = fallback
        }
        onError?.(e)
    }

    const ratioStyle = ratio !== 'auto' && RATIO_MAP[ratio] ? {aspectRatio: RATIO_MAP[ratio], ...style} : style
    const imgClassName = cn('image', fit, !effectLayer && rounded && 'rounded', !effectLayer && bordered && 'bordered', !effectLayer && shadow && 'shadow')

    if (effectLayer) {
        return (
            <span
                className={cn('image-wrap', rounded && 'rounded', bordered && 'bordered', shadow && 'shadow', effectClassName, className)}
                onPointerDown={handlePointerDown}
            >
                {effectLayer}
                <img className={imgClassName} style={ratioStyle} onError={handleError} {...rest} alt={alt ?? ''} />
            </span>
        )
    }

    return (
        <img
            className={cn(imgClassName, className)}
            style={ratioStyle}
            onError={handleError}
            {...rest}
            alt={alt ?? ''}
        />
    )
}
