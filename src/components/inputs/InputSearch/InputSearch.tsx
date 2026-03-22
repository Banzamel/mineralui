import {useState, useCallback, forwardRef} from 'react'
import type {InputSearchProps} from './InputSearch.types'
import {Input} from '../Input'
import {useDebouncedCallback} from '../../../utils/useDebounce'

// Extend the base input with debounced search callbacks and an inline clear action.
export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(function InputSearch(
    {
        debounceMs = 300,
        onSearch,
        value,
        defaultValue,
        onChange,
        onKeyDown,
        onClear,
        clearable = true,
        placeholder = 'Search...',
        ...rest
    },
    ref
) {
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '')
    const currentValue = value !== undefined ? value.toString() : internalValue

    const debouncedSearch = useDebouncedCallback((val: string) => onSearch?.(val), debounceMs)

    // Update local state and debounce search notifications while typing.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (value === undefined) {
                setInternalValue(e.target.value)
            }
            debouncedSearch(e.target.value)
            onChange?.(e)
        },
        [onChange, value, debouncedSearch]
    )

    // Run search immediately when the user confirms with Enter.
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                onSearch?.(currentValue)
            }
            onKeyDown?.(e)
        },
        [currentValue, onSearch, onKeyDown]
    )

    // Clear both the visible field and the emitted search query.
    const handleClear = useCallback(() => {
        if (value === undefined) {
            setInternalValue('')
        }
        onSearch?.('')
        onClear?.()
    }, [value, onSearch, onClear])

    const searchIcon = (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="6.5" cy="6.5" r="5" />
            <line x1="10" y1="10" x2="14.5" y2="14.5" />
        </svg>
    )

    return (
        <Input
            {...rest}
            ref={ref}
            type="search"
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClear={handleClear}
            clearable={clearable}
            placeholder={placeholder}
            startIcon={searchIcon}
        />
    )
})
