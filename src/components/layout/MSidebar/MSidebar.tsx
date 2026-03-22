import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from 'react'
import {cn} from '../../../utils/cn'
import type {
    MSidebarProps,
    MSidebarHeaderProps,
    MSidebarNavProps,
    MSidebarItemProps,
    MSidebarGroupProps,
    MSidebarFooterProps,
    MSidebarDividerProps,
    MSidebarMode,
} from './MSidebar.types'
import './MSidebar.css'

const STORAGE_KEY = 'mineralui-sidebar'

interface SidebarContextValue {
    mode: MSidebarMode
    mobile: boolean
    mobileOpen: boolean
    canToggle: boolean
    toggleMode: () => void
}

const SidebarCtx = createContext<SidebarContextValue>({
    mode: 'expanded',
    mobile: false,
    mobileOpen: false,
    canToggle: false,
    toggleMode: () => {},
})

function useSidebar() {
    return useContext(SidebarCtx)
}

function useIsMobile(breakpoint: number): boolean {
    const [mobile, setMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
    )
    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
        const handler = (e: MediaQueryListEvent) => setMobile(e.matches)
        setMobile(mq.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [breakpoint])
    return mobile
}

export function MSidebar({
    mode: modeProp = 'auto',
    defaultMode = 'expanded',
    onModeChange,
    persist = false,
    side = 'left',
    tone = 'subtle',
    bordered = true,
    mobileBreakpoint = 768,
    className,
    style,
    children,
}: MSidebarProps) {
    const mobile = useIsMobile(mobileBreakpoint)
    const [mobileOpen, setMobileOpen] = useState(false)

    const [internalMode, setInternalMode] = useState<MSidebarMode>(() => {
        if (persist) {
            try {
                const v = localStorage.getItem(STORAGE_KEY)
                if (v === 'expanded' || v === 'collapsed') return v
            } catch { /* noop */ }
        }
        return defaultMode
    })

    const resolvedMode: MSidebarMode =
        modeProp === 'auto' ? internalMode : modeProp === 'collapsed' ? 'collapsed' : 'expanded'

    const toggleMode = useCallback(() => {
        const next: MSidebarMode = resolvedMode === 'expanded' ? 'collapsed' : 'expanded'
        setInternalMode(next)
        onModeChange?.(next)
        if (persist) {
            try { localStorage.setItem(STORAGE_KEY, next) } catch { /* noop */ }
        }
    }, [resolvedMode, onModeChange, persist])

    const closeMobile = useCallback(() => setMobileOpen(false), [])

    useEffect(() => {
        if (!mobileOpen) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileOpen(false)
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [mobileOpen])

    const canToggle = !mobile && modeProp === 'auto'

    const ctx = useMemo<SidebarContextValue>(
        () => ({mode: resolvedMode, mobile, mobileOpen, canToggle, toggleMode}),
        [resolvedMode, mobile, mobileOpen, canToggle, toggleMode]
    )

    const isCollapsed = !mobile && resolvedMode === 'collapsed'

    const sidebarCls = cn(
        'mineral-sidebar',
        `mineral-sidebar--${tone}`,
        `mineral-sidebar--${side}`,
        isCollapsed && 'mineral-sidebar--collapsed',
        bordered && 'mineral-sidebar--bordered',
        mobile && 'mineral-sidebar--mobile',
        mobile && mobileOpen && 'mineral-sidebar--mobile-open',
        className
    )

    return (
        <SidebarCtx.Provider value={ctx}>
            {mobile && mobileOpen && (
                <div className="mineral-sidebar-backdrop" onClick={closeMobile} />
            )}

            <aside className={sidebarCls} style={style}>
                {children}
            </aside>

            {mobile && !mobileOpen && (
                <button
                    className={cn('mineral-sidebar-hamburger', `mineral-sidebar-hamburger--${side}`)}
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                >
                    <span className="mineral-sidebar-hamburger-icon">☰</span>
                </button>
            )}
        </SidebarCtx.Provider>
    )
}

export function MSidebarHeader({className, children}: MSidebarHeaderProps) {
    const {mode, mobile, canToggle, toggleMode} = useSidebar()
    const isCollapsed = !mobile && mode === 'collapsed'

    return (
        <div className={cn('mineral-sidebar-header', className)}>
            <div className="mineral-sidebar-header-content">
                {children}
            </div>
            {canToggle && (
                <button
                    className="mineral-sidebar-toggle"
                    onClick={toggleMode}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <span className={cn('mineral-sidebar-chevron', isCollapsed && 'mineral-sidebar-chevron--flipped')}>
                        ‹
                    </span>
                </button>
            )}
        </div>
    )
}

export function MSidebarNav({className, children}: MSidebarNavProps) {
    return <nav className={cn('mineral-sidebar-nav', className)}>{children}</nav>
}

export function MSidebarItem({
    icon,
    label,
    href,
    to,
    onClick,
    active = false,
    disabled = false,
    badge,
    color,
    component,
    className,
}: MSidebarItemProps) {
    const {mode, mobile} = useSidebar()
    const isCollapsed = !mobile && mode === 'collapsed'

    const Tag = component ?? (href || to ? 'a' : 'button')
    const linkProps = component
        ? (to ? {to} : href ? {href} : {})
        : (href ? {href} : to ? {href: to} : {})

    const cls = cn(
        'mineral-sidebar-item',
        active && 'mineral-sidebar-item--active',
        disabled && 'mineral-sidebar-item--disabled',
        color && `mineral-sidebar-item--${color}`,
        className
    )

    return (
        <Tag
            className={cls}
            onClick={disabled ? undefined : onClick}
            aria-disabled={disabled || undefined}
            title={isCollapsed ? (typeof label === 'string' ? label : undefined) : undefined}
            {...linkProps}
        >
            {icon && <span className="mineral-sidebar-item-icon">{icon}</span>}
            {!isCollapsed && <span className="mineral-sidebar-item-label">{label}</span>}
            {!isCollapsed && badge && <span className="mineral-sidebar-item-badge">{badge}</span>}
        </Tag>
    )
}

export function MSidebarGroup({
    label,
    icon,
    defaultOpen = true,
    collapsible = true,
    children,
    className,
}: MSidebarGroupProps) {
    const {mode, mobile} = useSidebar()
    const isCollapsed = !mobile && mode === 'collapsed'
    const [open, setOpen] = useState(defaultOpen)

    const toggle = () => {
        if (collapsible) setOpen((o) => !o)
    }

    if (isCollapsed) {
        return <div className={cn('mineral-sidebar-group', className)}>{children}</div>
    }

    return (
        <div className={cn('mineral-sidebar-group', className)}>
            <button
                className="mineral-sidebar-group-header"
                onClick={toggle}
                aria-expanded={open}
            >
                {icon && <span className="mineral-sidebar-group-icon">{icon}</span>}
                <span className="mineral-sidebar-group-label">{label}</span>
                {collapsible && (
                    <span className={cn('mineral-sidebar-group-arrow', open && 'mineral-sidebar-group-arrow--open')}>
                        ›
                    </span>
                )}
            </button>
            {open && <div className="mineral-sidebar-group-items">{children}</div>}
        </div>
    )
}

export function MSidebarFooter({className, children}: MSidebarFooterProps) {
    return <div className={cn('mineral-sidebar-footer', className)}>{children}</div>
}

export function MSidebarDivider({className, spacing = 'md'}: MSidebarDividerProps) {
    return <hr className={cn('mineral-sidebar-divider', `mineral-sidebar-divider--${spacing}`, className)} />
}
