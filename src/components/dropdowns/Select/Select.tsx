import {useState, useRef, useCallback, useMemo} from 'react'
import type {SelectProps, SelectOption} from './Select.types'
import {Popover} from '../../primitives/Popover'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useKeyboardNav} from '../../../utils/useKeyboardNav'
import './Select.css'

// Render a selectable list with optional search, grouping and multi-select tags.
export function Select({
    options,
    value,
    defaultValue,
    onChange,
    multiple = false,
    searchable = false,
    placeholder = 'Select...',
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
    loading = false,
    clearable = false,
    maxHeight = 300,
    noOptionsText = 'No options',
    renderOption,
    renderValue,
    className,
    style,
}: SelectProps) {
    const [open, setOpen] = useState(false)
    const [internalValue, setInternalValue] = useState<string | string[]>(defaultValue ?? (multiple ? [] : ''))
    const [search, setSearch] = useState('')
    const triggerRef = useRef<HTMLDivElement>(null)

    const currentValue = value !== undefined ? value : internalValue
    const hasError = error || !!errorText

    // Normalize the public value into a string array for rendering and selection logic.
    const selectedValues = useMemo(() => {
        if (Array.isArray(currentValue)) return currentValue
        return currentValue ? [currentValue] : []
    }, [currentValue])

    const selectedOptions = useMemo(
        () => options.filter((o) => selectedValues.includes(o.value)),
        [options, selectedValues]
    )

    // Filter options locally when the searchable mode is active.
    const filteredOptions = useMemo(() => {
        if (!searchable || !search) return options
        const lower = search.toLowerCase()
        return options.filter((o) => o.label.toLowerCase().includes(lower))
    }, [options, searchable, search])

    // Group options
    // Preserve group headers without changing the flat keyboard navigation index map.
    const groupedOptions = useMemo(() => {
        const groups = new Map<string, SelectOption[]>()
        for (const opt of filteredOptions) {
            const key = opt.group ?? ''
            if (!groups.has(key)) groups.set(key, [])
            groups.get(key)!.push(opt)
        }
        return groups
    }, [filteredOptions])

    const flatFiltered = filteredOptions

    // Toggle or replace the current selection depending on the mode.
    const handleSelect = useCallback(
        (index: number) => {
            const opt = flatFiltered[index]
            if (!opt || opt.disabled) return

            if (multiple) {
                const arr = Array.isArray(currentValue) ? currentValue : []
                const newVal = arr.includes(opt.value) ? arr.filter((v) => v !== opt.value) : [...arr, opt.value]
                if (value === undefined) setInternalValue(newVal)
                onChange?.(newVal)
            } else {
                if (value === undefined) setInternalValue(opt.value)
                onChange?.(opt.value)
                setOpen(false)
                setSearch('')
            }
        },
        [flatFiltered, multiple, currentValue, value, onChange]
    )

    const {activeIndex, setActiveIndex, resetIndex, onKeyDown} = useKeyboardNav({
        itemCount: flatFiltered.length,
        onSelect: handleSelect,
        onClose: () => {
            setOpen(false)
            setSearch('')
        },
        isOpen: open,
    })

    // Open the popover and reset keyboard navigation when the trigger is used.
    const handleTriggerClick = useCallback(() => {
        if (disabled) return
        setOpen((v) => !v)
        resetIndex()
    }, [disabled, resetIndex])

    // Reset the current selection without closing the outer field wrapper.
    const handleClear = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            const empty = multiple ? [] : ''
            if (value === undefined) setInternalValue(empty)
            onChange?.(empty)
        },
        [multiple, value, onChange]
    )

    // Render tags, labels or the placeholder based on the current selection state.
    const displayValue = useMemo(() => {
        if (renderValue && selectedOptions.length > 0) {
            return renderValue(multiple ? selectedOptions : selectedOptions[0])
        }
        if (multiple && selectedOptions.length > 0) {
            return (
                <span className="tags">
                    {selectedOptions.map((o) => (
                        <span key={o.value} className="m-tag">
                            {o.label}
                        </span>
                    ))}
                </span>
            )
        }
        if (!multiple && selectedOptions.length > 0) {
            return selectedOptions[0].label
        }
        return <span className="placeholder">{placeholder}</span>
    }, [selectedOptions, multiple, renderValue, placeholder])

    return (
        <div
            className={cn(
                'select',
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
                ref={triggerRef}
                className={cn('trigger', variant, size, open && 'focused', hasError && 'error', disabled && 'disabled')}
                onClick={handleTriggerClick}
                onKeyDown={onKeyDown as unknown as React.KeyboardEventHandler}
                tabIndex={disabled ? -1 : 0}
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-invalid={hasError || undefined}
                id={id}
            >
                <span className="value">{displayValue}</span>

                {loading && <span className="spinner" />}

                {clearable && selectedValues.length > 0 && !loading && !disabled && (
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={handleClear}
                        tabIndex={-1}
                        aria-label="Clear selection"
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
                )}

                <span className={cn('arrow', open && 'open')} aria-hidden="true">
                    <svg viewBox="0 0 16 16">
                        <path
                            d="M4 6L8 10L12 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </div>

            {/* Hidden input for form submission */}
            {name && (
                <input
                    type="hidden"
                    name={name}
                    value={Array.isArray(currentValue) ? currentValue.join(',') : currentValue}
                />
            )}

            <Popover
                className={'select-popover'}
                open={open}
                anchorRef={triggerRef}
                onClose={() => {
                    setOpen(false)
                    setSearch('')
                }}
                matchWidth
                placement="bottom-start"
            >
                <div style={{maxHeight}} className="dropdown">
                    {searchable && (
                        <div className="search-box">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setActiveIndex(0)
                                }}
                                onKeyDown={onKeyDown as unknown as React.KeyboardEventHandler}
                                autoFocus
                            />
                        </div>
                    )}

                    {flatFiltered.length === 0 ? (
                        <div className="no-options">{noOptionsText}</div>
                    ) : (
                        <div className="options-list" role="listbox">
                            {[...groupedOptions.entries()].map(([group, opts]) => (
                                <div key={group}>
                                    {group && <div className="group-header">{group}</div>}
                                    {opts.map((opt) => {
                                        const flatIndex = flatFiltered.indexOf(opt)
                                        const isActive = flatIndex === activeIndex
                                        const isSelected = selectedValues.includes(opt.value)
                                        return (
                                            <div
                                                key={opt.value}
                                                className={cn(
                                                    'option',
                                                    isActive && 'active',
                                                    isSelected && 'selected',
                                                    opt.disabled && 'disabled'
                                                )}
                                                onClick={() => !opt.disabled && handleSelect(flatIndex)}
                                                onMouseEnter={() => setActiveIndex(flatIndex)}
                                                role="option"
                                                aria-selected={isSelected}
                                                aria-disabled={opt.disabled}
                                            >
                                                {multiple && (
                                                    <span className={cn('checkbox', isSelected && 'checked')}>
                                                        {isSelected && (
                                                            <svg viewBox="0 0 16 16" aria-hidden="true">
                                                                <path
                                                                    d="M3.5 8L6.5 11L12.5 5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        )}
                                                    </span>
                                                )}
                                                {renderOption ? renderOption(opt, isActive, isSelected) : opt.label}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
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
