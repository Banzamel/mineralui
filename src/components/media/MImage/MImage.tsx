import {useState} from 'react'
import type * as React from 'react'
import type {MImageProps} from './MImage.types'
import {cn} from '../../../utils/cn'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import {MSkeleton} from '../../feedback'
import './MImage.css'

const RATIO_MAP: Record<string, string> = {
    '1:1': '1 / 1',
    '4:3': '4 / 3',
    '16:9': '16 / 9',
    '21:9': '21 / 9',
}

// Render a styled image with aspect ratio, fit, and optional fallback.
export function MImage({
    fit = 'cover',
    ratio = 'auto',
    rounded = false,
    bordered = false,
    shadow = false,
    clickEffect = 'none',
    fallback,
    skeleton = false,
    className,
    style,
    alt,
    onError,
    ...rest
}: MImageProps) {
    const [errored, setErrored] = useState(false)
    const {effectClassName, effectLayer, handlePointerDown} = useInteractionEffect<HTMLSpanElement>({
        effect: skeleton ? 'none' : clickEffect,
    })

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (fallback && !errored) {
            setErrored(true)
            e.currentTarget.src = fallback
        }
        onError?.(e)
    }

    const hasFixedRatio = ratio !== 'auto' && !!RATIO_MAP[ratio]
    const ratioStyle = hasFixedRatio ? {aspectRatio: RATIO_MAP[ratio], ...style} : style

    // Skeleton placeholder
    if (skeleton) {
        return (
            <MSkeleton
                variant="rectangle"
                animate="pulse"
                className={cn(
                    'image-skeleton',
                    rounded && 'rounded',
                    bordered && 'bordered',
                    className
                )}
                style={ratioStyle}
                aria-label="Loading"
            />
        )
    }

    const imgClassName = cn(
        'image',
        fit,
        !effectLayer && rounded && 'rounded',
        !effectLayer && bordered && 'bordered',
        !effectLayer && shadow && 'shadow'
    )

    if (effectLayer) {
        return (
            <span
                className={cn(
                    'image-wrap',
                    hasFixedRatio && 'has-ratio',
                    rounded && 'rounded',
                    bordered && 'bordered',
                    shadow && 'shadow',
                    effectClassName,
                    className
                )}
                style={ratioStyle}
                onPointerDown={handlePointerDown}
            >
                {effectLayer}
                <img className={imgClassName} onError={handleError} {...rest} alt={alt ?? ''} />
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
