import {useState} from 'react'
import type {ImageProps} from './Image.types'
import {cn} from '../../../utils/cn'
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
    fallback,
    className,
    style,
    onError,
    ...rest
}: ImageProps) {
    const [errored, setErrored] = useState(false)

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (fallback && !errored) {
            setErrored(true)
            e.currentTarget.src = fallback
        }
        onError?.(e)
    }

    const ratioStyle = ratio !== 'auto' && RATIO_MAP[ratio]
        ? {aspectRatio: RATIO_MAP[ratio], ...style}
        : style

    return (
        <img
            className={cn(
                'image',
                fit,
                rounded && 'rounded',
                bordered && 'bordered',
                shadow && 'shadow',
                className
            )}
            style={ratioStyle}
            onError={handleError}
            {...rest}
        />
    )
}
