import {useCallback, useState} from 'react'
import type {CSSProperties, KeyboardEvent, MouseEvent} from 'react'
import type {MBlurProps} from './MBlur.types'
import {cn} from '../../../utils/cn'
import './MBlur.css'

// Obscure inline content with a CSS blur filter until the viewer opts in to reveal it.
export function MBlur({
    children,
    amount = 6,
    reveal = 'hover',
    revealed,
    defaultRevealed = false,
    onToggle,
    inline = true,
    className,
    style,
    onClick,
    onKeyDown,
    ...rest
}: MBlurProps) {
    const controlled = revealed !== undefined
    const [internal, setInternal] = useState(defaultRevealed)
    const isRevealed = controlled ? revealed : internal
    const interactive = reveal !== 'none'

    const setRevealed = useCallback(
        (next: boolean) => {
            if (!controlled) {
                setInternal(next)
            }
            onToggle?.(next)
        },
        [controlled, onToggle]
    )

    const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
        if (reveal === 'click') {
            setRevealed(!isRevealed)
        }
        onClick?.(event)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
        if (reveal === 'click' && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            setRevealed(!isRevealed)
        }
        onKeyDown?.(event)
    }

    const mergedStyle: CSSProperties = {
        ...style,
        ['--mineral-blur-amount' as string]: `${amount}px`,
    }

    return (
        <span
            className={cn('blur', inline ? 'inline' : 'block', `reveal-${reveal}`, isRevealed && 'revealed', className)}
            style={mergedStyle}
            tabIndex={interactive && reveal === 'click' ? 0 : undefined}
            role={reveal === 'click' ? 'button' : undefined}
            aria-pressed={reveal === 'click' ? isRevealed : undefined}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...rest}
        >
            <span className={'blur-inner'} aria-hidden={!isRevealed}>
                {children}
            </span>
        </span>
    )
}
