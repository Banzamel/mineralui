import {useState, useRef, useCallback, useMemo} from 'react'
import type {AutocompleteProps} from './Autocomplete.types'
import {Popover} from '../../primitives/Popover'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useKeyboardNav} from '../../../utils/useKeyboardNav'
import {useDebouncedCallback} from '../../../utils/useDebounce'
import './Autocomplete.css'

// Resolve labels for primitive string options without extra configuration.
function defaultGetLabel<T>(option: T): string {
    if (typeof option === 'string') return option
    return String(option)
}

// Resolve values for primitive string options without extra configuration.
function defaultGetValue<T>(option: T): string {
    if (typeof option === 'string') return option
    return String(option)
}

// Apply a basic case-insensitive filter when the caller does not provide one.
function defaultFilter<T>(options: T[], input: string, getLabel: (o: T) => string): T[] {
    if (!input) return options
    const lower = input.toLowerCase()
    return options.filter((o) => getLabel(o).toLowerCase().includes(lower))
}

// Render a searchable suggestion list with optional free-solo and multi-tag behavior.
export function Autocomplete<T = string>({
    options,
    value,
    onChange,
    getOptionLabel = defaultGetLabel,
    getOptionValue = defaultGetValue,
    filterOptions,
    multiple = false,
    freeSolo = false,
    debounceMs = 0,
    onInputChange,
    loading = false,
    loadingText = 'Loading...',
    noOptionsText = 'No options',
    placeholder = 'Type to search...',
    disabled = false,
    name,
    id,
    variant = 'outlined',
    size = 'md',
    color,
    fcolor,
    fullWidth = false,
    label,
    helperText,
    errorText,
    error = false,
    required = false,
    clearable = false,
    maxHeight = 300,
    renderOption,
    renderTags,
    className,
    style,
}: AutocompleteProps<T>) {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const wrapperRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const hasError = error || !!errorText

    // Normalize the public value into an array for tag and selection rendering.
    const selectedValues = useMemo(() => {
        if (value == null) return []
        return Array.isArray(value) ? value.filter((item) => item != null) : [value]
    }, [value])

    // Filter suggestions locally unless the caller owns that logic.
    const filtered = useMemo(() => {
        if (filterOptions) return filterOptions(options, inputValue)
        return defaultFilter(options, inputValue, getOptionLabel)
    }, [options, inputValue, filterOptions, getOptionLabel])

    const debouncedInputChange = useDebouncedCallback((val: string) => onInputChange?.(val), debounceMs)

    // Update the visible query and optionally notify async search logic.
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
            debouncedInputChange(e.target.value)
            if (!open) setOpen(true)
        },
        [open, debouncedInputChange]
    )

    // Apply a selected option to single or multiple value modes.
    const handleSelect = useCallback(
        (index: number) => {
            const opt = filtered[index]
            if (!opt) return

            if (multiple) {
                const arr = [...selectedValues]
                const val = getOptionValue(opt)
                const existIdx = arr.findIndex((v) => getOptionValue(v) === val)
                if (existIdx >= 0) {
                    arr.splice(existIdx, 1)
                } else {
                    arr.push(opt)
                }
                onChange?.(arr)
                setInputValue('')
                inputRef.current?.focus()
            } else {
                onChange?.(opt)
                setInputValue(getOptionLabel(opt))
                setOpen(false)
            }
        },
        [filtered, multiple, selectedValues, getOptionValue, getOptionLabel, onChange]
    )

    // Remove a selected tag by index in multiple mode.
    const handleRemoveTag = useCallback(
        (index: number) => {
            const arr = [...selectedValues]
            arr.splice(index, 1)
            onChange?.(multiple ? arr : (arr[0] ?? ('' as unknown as T)))
        },
        [selectedValues, onChange, multiple]
    )

    const {
        activeIndex,
        setActiveIndex,
        resetIndex,
        onKeyDown: navKeyDown,
    } = useKeyboardNav({
        itemCount: filtered.length,
        onSelect: handleSelect,
        onClose: () => setOpen(false),
        isOpen: open,
    })

    // Combine free-solo submission, tag removal and list navigation.
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && freeSolo && activeIndex < 0 && inputValue) {
                onChange?.(inputValue as unknown as T)
                setOpen(false)
                return
            }
            // Backspace removes last tag in multiple
            if (e.key === 'Backspace' && multiple && !inputValue && selectedValues.length > 0) {
                handleRemoveTag(selectedValues.length - 1)
                return
            }
            navKeyDown(e as unknown as React.KeyboardEvent<Element>)
        },
        [freeSolo, activeIndex, inputValue, multiple, selectedValues, onChange, navKeyDown, handleRemoveTag]
    )

    // Clear the input query and the selected value(s) together.
    const handleClear = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            setInputValue('')
            onChange?.(multiple ? ([] as unknown as T) : ('' as unknown as T))
            inputRef.current?.focus()
        },
        [multiple, onChange]
    )

    return (
        <div
            className={cn(
                'autocomplete',
                color && `color-${color}`,
                ...getAppearanceClassNames({fcolor}),
                fullWidth && 'full-width',
                className
            )}
            style={style}
        >
            {label && (
                <label
                    htmlFor={id}
                    className={cn('label', open && 'focused', hasError && 'error', required && 'required')}
                >
                    {label}
                </label>
            )}

            <div
                ref={wrapperRef}
                className={cn(
                    'input-wrapper',
                    variant,
                    size,
                    open && 'focused',
                    hasError && 'error',
                    disabled && 'disabled'
                )}
                onClick={() => inputRef.current?.focus()}
            >
                {multiple &&
                    selectedValues.length > 0 &&
                    (renderTags ? (
                        renderTags(selectedValues, handleRemoveTag)
                    ) : (
                        <span className="tags">
                            {selectedValues.map((v, i) => (
                                <span key={getOptionValue(v)} className="tag">
                                    {getOptionLabel(v)}
                                    <button
                                        type="button"
                                        className="tag-remove"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveTag(i)
                                        }}
                                        tabIndex={-1}
                                    >
                                        <svg viewBox="0 0 16 16" aria-hidden="true">
                                            <path
                                                d="M4 4L12 12M12 4L4 12"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </span>
                    ))}

                <input
                    ref={inputRef}
                    type="text"
                    className="input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => {
                        setOpen(true)
                        resetIndex()
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={selectedValues.length > 0 ? '' : placeholder}
                    disabled={disabled}
                    id={id}
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-invalid={hasError || undefined}
                    autoComplete="off"
                />

                {loading && <span className="spinner" />}

                {clearable && (selectedValues.length > 0 || inputValue) && !loading && !disabled && (
                    <button type="button" className="clear-btn" onClick={handleClear} tabIndex={-1}>
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path
                                d="M4 4L12 12M12 4L4 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {name && <input type="hidden" name={name} value={selectedValues.map(getOptionValue).join(',')} />}

            <Popover
                className={cn('autocomplete-popover', color && `color-${color}`)}
                open={open && (filtered.length > 0 || loading)}
                anchorRef={wrapperRef}
                onClose={() => setOpen(false)}
                matchWidth
                placement="bottom-start"
            >
                <div style={{maxHeight}} className="dropdown">
                    {loading ? (
                        <div className="loading-msg">{loadingText}</div>
                    ) : filtered.length === 0 ? (
                        <div className="no-options">{noOptionsText}</div>
                    ) : (
                        <div className="options-list" role="listbox">
                            {filtered.map((opt, i) => {
                                const isActive = i === activeIndex
                                const isSelected = selectedValues.some((v) => getOptionValue(v) === getOptionValue(opt))
                                return (
                                    <div
                                        key={getOptionValue(opt)}
                                        className={cn('option', isActive && 'active', isSelected && 'selected')}
                                        onClick={() => handleSelect(i)}
                                        onMouseEnter={() => setActiveIndex(i)}
                                        role="option"
                                        aria-selected={isSelected}
                                    >
                                        {renderOption ? renderOption(opt, isActive) : getOptionLabel(opt)}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </Popover>

            {(errorText || helperText) && (
                <div className="bottom-row">
                    {errorText ? (
                        <span className="error-text" role="alert">
                            {errorText}
                        </span>
                    ) : (
                        <span className="helper-text">{helperText}</span>
                    )}
                </div>
            )}
        </div>
    )
}
