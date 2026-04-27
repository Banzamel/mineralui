import {useEffect, useMemo, useRef, useState} from 'react'
import type {KeyboardEvent as ReactKeyboardEvent, ReactNode} from 'react'
import type {MCommandPaletteItem, MCommandPaletteProps} from './MCommandPalette.types'
import {MButton} from '../../controls'
import {MInputSearch} from '../../inputs'
import {MCard, MCardBody, MCardHeader} from '../../cards'
import {MInline, MSimpleGrid, MStack} from '../../layout'
import {MSheet} from '../MSheet'
import {MTooltip} from '../MTooltip'
import {MBadge} from '../../feedback'
import {MLinkIcon, MSearchIcon} from '../../../icons'
import {MKbd, MHeading, MText} from '../../typography'
import {cn} from '../../../utils/cn'
import {useKeyboardNav} from '../../../utils/useKeyboardNav'
import './MCommandPalette.css'

function normalizeText(value: ReactNode) {
    if (typeof value === 'string' || typeof value === 'number') {
        return value.toString()
    }

    return ''
}

function matchesShortcut(event: KeyboardEvent, shortcut: string) {
    const normalized = shortcut.toLowerCase().replace(/\s+/g, '')
    const parts = normalized.split('+')
    const key = parts[parts.length - 1]

    if (!key) {
        return false
    }

    const expectsCtrl = parts.includes('ctrl')
    const expectsMeta = parts.includes('meta') || parts.includes('cmd')
    const expectsShift = parts.includes('shift')
    const expectsAlt = parts.includes('alt') || parts.includes('option')

    return (
        event.key.toLowerCase() === key &&
        !!expectsCtrl === event.ctrlKey &&
        !!expectsMeta === event.metaKey &&
        !!expectsShift === event.shiftKey &&
        !!expectsAlt === event.altKey
    )
}

function filterItems(items: MCommandPaletteItem[], query: string) {
    if (!query.trim()) {
        return items
    }

    const normalizedQuery = query.trim().toLowerCase()

    return items.filter((item) =>
        [
            normalizeText(item.title),
            normalizeText(item.description),
            normalizeText(item.group),
            normalizeText(item.actionLabel),
            ...(item.keywords ?? []),
        ].some((value) => value.toLowerCase().includes(normalizedQuery))
    )
}

function groupItems(items: MCommandPaletteItem[]) {
    const groups = new Map<string, {label: ReactNode; items: MCommandPaletteItem[]}>()

    items.forEach((item) => {
        const key = normalizeText(item.group) || 'General'
        const current = groups.get(key) ?? {label: item.group ?? 'General', items: []}
        current.items.push(item)
        groups.set(key, current)
    })

    return Array.from(groups.values())
}

export function MCommandPalette({
    items,
    featuredItems = [],
    open,
    defaultOpen = false,
    onOpenChange,
    onSelect,
    title = 'Command palette',
    description,
    trigger,
    shortcut = 'ctrl+k',
    placeholder = 'Search modules, records and actions...',
    emptyLabel = 'No matching results.',
    footer,
    size = 'lg',
    closeOnSelect = true,
}: MCommandPaletteProps) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const [query, setQuery] = useState('')
    const [activeItemId, setActiveItemId] = useState<string | null>(null)
    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen
    const inputRef = useRef<HTMLInputElement>(null)

    function setOpenState(nextOpen: boolean) {
        if (!isControlled) {
            setInternalOpen(nextOpen)
        }

        onOpenChange?.(nextOpen)
    }

    const filteredItems = useMemo(() => filterItems(items, query), [items, query])
    const groupedItems = useMemo(() => groupItems(filteredItems), [filteredItems])
    const flattenedItems = useMemo(() => groupedItems.flatMap((group) => group.items), [groupedItems])
    const featured = useMemo(() => (featuredItems.length ? featuredItems : items.slice(0, 6)), [featuredItems, items])

    function executeItem(item: MCommandPaletteItem) {
        item.onSelect?.()
        onSelect?.(item)

        if (!item.onSelect && item.href) {
            window.location.assign(item.href)
        }

        if (closeOnSelect) {
            setOpenState(false)
            setQuery('')
            setActiveItemId(null)
        }
    }

    const {activeIndex, setActiveIndex, resetIndex, onKeyDown} = useKeyboardNav({
        itemCount: flattenedItems.length,
        isOpen,
        onClose: () => setOpenState(false),
        onSelect: (index) => {
            const item = flattenedItems[index]

            if (item) {
                executeItem(item)
            }
        },
    })

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (matchesShortcut(event, shortcut)) {
                event.preventDefault()
                setOpenState(true)
            }
        }

        window.addEventListener('keydown', handleKeydown)

        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    }, [shortcut])

    useEffect(() => {
        if (!isOpen) {
            resetIndex()
            setActiveItemId(null)
            return
        }

        queueMicrotask(() => inputRef.current?.focus())
    }, [isOpen, resetIndex])

    useEffect(() => {
        if (activeIndex < 0 || activeIndex >= flattenedItems.length) {
            setActiveItemId(null)
            return
        }

        setActiveItemId(flattenedItems[activeIndex]?.id ?? null)
    }, [activeIndex, flattenedItems])

    function handleSearchKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
        onKeyDown(event)
    }

    return (
        <>
            {trigger ?? (
                <MButton
                    variant={'filled'}
                    size={'sm'}
                    color={'primary'}
                    iconOnly
                    startIcon={<MSearchIcon />}
                    aria-label={typeof title === 'string' ? title : 'Open command palette'}
                    onClick={() => setOpenState(true)}
                />
            )}

            <MSheet
                open={isOpen}
                onClose={() => setOpenState(false)}
                title={title}
                description={description}
                size={size}
                footer={footer}
            >
                <div className="command-palette-body">
                    <div className="command-palette-search">
                        <MInputSearch
                            ref={inputRef}
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value)
                                setActiveIndex(-1)
                            }}
                            onKeyDown={handleSearchKeyDown}
                            placeholder={placeholder}
                            clearable
                            fullWidth
                        />
                    </div>

                    <div className="command-palette-grid">
                        <MCard stretch={false}>
                            <MCardHeader>
                                <MHeading level={4}>Featured</MHeading>
                                <MText size={'sm'} tone={'muted'}>
                                    Quick launch for the most frequent dashboard actions.
                                </MText>
                            </MCardHeader>
                            <MCardBody>
                                <MSimpleGrid columns={4}>
                                    {featured.map((item) => {
                                        const label = item.actionLabel ?? item.title
                                        const ariaLabel = typeof label === 'string' ? label : normalizeText(label)

                                        return (
                                            <MTooltip key={item.id} content={label}>
                                                <MButton
                                                    variant={'ghost'}
                                                    color={'primary'}
                                                    component={item.component}
                                                    to={item.to}
                                                    href={item.href}
                                                    target={item.target}
                                                    rel={item.rel}
                                                    startIcon={item.icon ?? <MLinkIcon />}
                                                    iconOnly
                                                    aria-label={ariaLabel || undefined}
                                                    onClick={() => executeItem(item)}
                                                />
                                            </MTooltip>
                                        )
                                    })}
                                </MSimpleGrid>
                            </MCardBody>
                        </MCard>

                        <MCard stretch={false}>
                            <MCardHeader>
                                <MHeading level={4}>Results</MHeading>
                                <MInline align={'center'} padding={'xs'}>
                                    <MText size={'sm'} tone={'muted'}>
                                        {flattenedItems.length} ready
                                    </MText>
                                    <MKbd>{shortcut.toUpperCase()}</MKbd>
                                </MInline>
                            </MCardHeader>
                            <MCardBody>
                                {groupedItems.length ? (
                                    <MStack padding={'xs'} className="command-palette-results">
                                        {groupedItems.map((group) => (
                                            <MStack key={normalizeText(group.label) || 'general'} padding={'xs'}>
                                                <MText size={'sm'} tone={'muted'}>
                                                    {group.label}
                                                </MText>
                                                {group.items.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        type="button"
                                                        className={cn(
                                                            'command-palette-item',
                                                            activeItemId === item.id && 'active'
                                                        )}
                                                        onMouseEnter={() => setActiveItemId(item.id)}
                                                        onClick={() => executeItem(item)}
                                                    >
                                                        <span className="command-palette-item-icon">
                                                            {item.icon ?? <MLinkIcon />}
                                                        </span>
                                                        <span className="command-palette-item-copy">
                                                            <span className="command-palette-item-title">
                                                                {item.title}
                                                            </span>
                                                            {item.description && (
                                                                <span className="command-palette-item-description">
                                                                    {item.description}
                                                                </span>
                                                            )}
                                                        </span>
                                                        {item.badge && (
                                                            <span className="command-palette-item-badge">
                                                                <MBadge color={'primary'} size={'sm'}>
                                                                    {item.badge}
                                                                </MBadge>
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                            </MStack>
                                        ))}
                                    </MStack>
                                ) : (
                                    <MText tone={'muted'}>{emptyLabel}</MText>
                                )}
                            </MCardBody>
                        </MCard>
                    </div>
                </div>
            </MSheet>
        </>
    )
}
