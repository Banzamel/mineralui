import {useState, useRef, useCallback, Children, isValidElement, cloneElement} from 'react'
import type * as React from 'react'
import {Popover} from '../../primitives'
import {useKeyboardNav} from '../../../utils/useKeyboardNav'
import {cn} from '../../../utils/cn'
import type {
    MDropdownMenuProps,
    MDropdownItemProps,
    MDropdownGroupProps,
    MDropdownDividerProps,
} from './DropdownMenu.types'
import './DropdownMenu.css'

type AnyProps = Record<string, any>

function getProps(el: React.ReactElement): AnyProps {
    return el.props as AnyProps
}

function isItem(child: React.ReactElement): boolean {
    return !!(child.type as any).__dropdownItem
}

function isGroup(child: React.ReactElement): boolean {
    return !!(child.type as any).__dropdownGroup
}

// Collect all MDropdownItem elements from children (including inside groups).
function collectItems(children: React.ReactNode): React.ReactElement[] {
    const items: React.ReactElement[] = []
    Children.forEach(children, (child) => {
        if (!isValidElement(child)) return
        if (isItem(child)) {
            items.push(child)
        } else if (isGroup(child)) {
            Children.forEach(getProps(child).children, (gc: React.ReactNode) => {
                if (isValidElement(gc) && isItem(gc)) {
                    items.push(gc)
                }
            })
        }
    })
    return items
}

export function MDropdownMenu({
    trigger,
    placement = 'bottom-start',
    size = 'md',
    closeOnSelect = true,
    openOn = 'click',
    className,
    style,
    children,
}: MDropdownMenuProps) {
    const [open, setOpen] = useState(false)
    const anchorRef = useRef<HTMLDivElement>(null)
    const hoverTimeout = useRef<ReturnType<typeof setTimeout>>(null)

    const items = collectItems(children)
    const enabledCount = items.filter((i) => !getProps(i).disabled).length

    const handleSelect = useCallback(
        (index: number) => {
            let enabledIdx = 0
            for (const item of items) {
                const p = getProps(item)
                if (p.disabled) continue
                if (enabledIdx === index) {
                    p.onClick?.()
                    break
                }
                enabledIdx++
            }
            if (closeOnSelect) setOpen(false)
        },
        [items, closeOnSelect]
    )

    const {activeIndex, setActiveIndex, onKeyDown} = useKeyboardNav({
        itemCount: enabledCount,
        onSelect: handleSelect,
        onClose: () => setOpen(false),
        isOpen: open,
    })

    const handleTriggerClick = () => setOpen((o) => !o)

    const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(true)
        }
        if (open) onKeyDown(e as any)
    }

    // Map active index back to flat child rendering with enabled-only tracking.
    let enabledIdx = 0
    const renderChild = (child: React.ReactNode): React.ReactNode => {
        if (!isValidElement(child)) return child

        if (isItem(child)) {
            const p = getProps(child)
            const isDisabled = p.disabled
            const idx = isDisabled ? -1 : enabledIdx++
            return cloneElement(child, {
                _active: idx === activeIndex,
                _onHover: isDisabled ? undefined : () => setActiveIndex(idx),
                _onClick: () => {
                    if (isDisabled) return
                    p.onClick?.()
                    if (closeOnSelect) setOpen(false)
                },
            } as AnyProps)
        }

        if (isGroup(child)) {
            return cloneElement(child, {
                children: Children.map(getProps(child).children, renderChild),
            } as AnyProps)
        }

        return child
    }

    const hoverHandlers =
        openOn === 'hover'
            ? {
                  onMouseEnter: () => {
                      if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
                      setOpen(true)
                  },
                  onMouseLeave: () => {
                      hoverTimeout.current = setTimeout(() => setOpen(false), 150)
                  },
              }
            : {}

    return (
        <div className={cn('dropdown menu anchor', className)} style={style} {...hoverHandlers}>
            <div
                ref={anchorRef}
                onClick={openOn === 'click' ? handleTriggerClick : undefined}
                onKeyDown={handleTriggerKeyDown}
                role="button"
                tabIndex={0}
                className="dropdown menu trigger"
            >
                {trigger}
            </div>
            <Popover
                open={open}
                anchorRef={anchorRef}
                onClose={() => setOpen(false)}
                placement={placement}
                className={cn('dropdown menu popover', size)}
            >
                <div className="dropdown menu list" role="menu" {...hoverHandlers}>
                    {Children.map(children, renderChild)}
                </div>
            </Popover>
        </div>
    )
}

export function MDropdownItem({
    icon,
    label,
    href,
    to,
    onClick,
    color,
    disabled = false,
    active = false,
    component,
    className,
    _active,
    _onHover,
    _onClick,
}: MDropdownItemProps & {_active?: boolean; _onHover?: () => void; _onClick?: () => void}) {
    const isHighlighted = _active ?? active

    const content = (
        <>
            {icon && <span className="dropdown menu icon">{icon}</span>}
            <span className="dropdown menu label">{label}</span>
        </>
    )

    const cls = cn('dropdown menu item', isHighlighted && 'active', disabled && 'disabled', color, className)

    const handleClick = (e: React.MouseEvent) => {
        if (disabled) {
            e.preventDefault()
            return
        }
        onClick?.()
        _onClick?.()
    }

    const Tag = component ?? (href || to ? 'a' : 'button')
    const linkProps = href ? {href} : to ? {href: to} : {}

    return (
        <Tag
            className={cls}
            role="menuitem"
            tabIndex={-1}
            onClick={handleClick}
            onMouseEnter={_onHover}
            aria-disabled={disabled || undefined}
            {...linkProps}
        >
            {content}
        </Tag>
    )
}
;(MDropdownItem as any).__dropdownItem = true

export function MDropdownGroup({label, children}: MDropdownGroupProps) {
    return (
        <div className="dropdown menu group" role="group">
            <div className="dropdown menu group-label">{label}</div>
            {children}
        </div>
    )
}
;(MDropdownGroup as any).__dropdownGroup = true

export function MDropdownDivider({className}: MDropdownDividerProps) {
    return <div className={cn('dropdown menu divider', className)} role="separator" />
}
