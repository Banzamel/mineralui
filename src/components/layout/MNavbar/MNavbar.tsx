import {Children, cloneElement, isValidElement, useEffect, useId, useRef, useState} from 'react'
import type {MouseEvent as ReactMouseEvent, ReactElement} from 'react'
import type {MNavbarProps} from './MNavbar.types'
import {getHiddenProps} from '../../../theme'
import {cn} from '../../../utils/cn'
import {MContainer} from '../MContainer'
import {MInline} from '../MInline'
import type {MInlineProps} from '../MInline'
import {MNavs} from '../MNavs'
import type {MNavsProps} from '../MNavs'
import {MButton} from '../../controls/MButton'
import {MMenuIcon} from '../../../icons'
import './MNavbar.css'

// Render a horizontal app or site navigation shell with container alignment.
// Below the md breakpoint MNavs children are collapsed behind a hamburger toggle
// that opens either a dropdown panel or a side drawer with the navigation items.
export function MNavbar({
    container = 'content',
    padded = true,
    bordered = true,
    sticky = false,
    tone = 'surface',
    justify = 'between',
    wrap = false,
    mobileMenu = 'dropdown',
    mobileMenuContent,
    mobileMenuLabel = 'Open navigation',
    hidden,
    className,
    children,
    ...rest
}: MNavbarProps) {
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLElement | null>(null)
    const menuId = useId()

    const childArray = Children.toArray(children)

    const mobileNavs = childArray
        .filter((child): child is ReactElement<MNavsProps> => isValidElement(child) && child.type === MNavs)
        .map((child, index) =>
            cloneElement(child, {
                key: `mnavbar-mobile-navs-${index}`,
                orientation: 'vertical',
            })
        )

    const toggleButton = (
        <MButton
            key="mnavbar-toggle"
            type="button"
            variant="ghost"
            size="md"
            iconOnly
            className="navbar-toggle"
            aria-label={mobileMenuLabel}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={handleToggleClick}
        >
            <MMenuIcon />
        </MButton>
    )

    let lastInlineIndex = -1
    for (let index = childArray.length - 1; index >= 0; index -= 1) {
        const child = childArray[index]
        if (isValidElement(child) && child.type === MInline) {
            lastInlineIndex = index
            break
        }
    }

    const renderedChildren =
        lastInlineIndex === -1
            ? [...childArray, toggleButton]
            : childArray.map((child, index) => {
                  if (index !== lastInlineIndex) return child
                  const inlineChild = child as ReactElement<MInlineProps>
                  const inlineChildren = Children.toArray(inlineChild.props.children)
                  return cloneElement(inlineChild, {
                      key: inlineChild.key ?? `mnavbar-inline-${index}`,
                      children: [...inlineChildren, toggleButton],
                  })
              })

    useEffect(() => {
        if (!open) return

        function handlePointerDown(event: PointerEvent) {
            const root = rootRef.current
            if (!root) return
            if (event.target instanceof Node && root.contains(event.target)) return
            setOpen(false)
        }

        function handleKeydown(event: KeyboardEvent) {
            if (event.key === 'Escape') setOpen(false)
        }

        document.addEventListener('pointerdown', handlePointerDown)
        document.addEventListener('keydown', handleKeydown)
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('keydown', handleKeydown)
        }
    }, [open])

    function handleToggleClick() {
        setOpen((previous) => !previous)
    }

    function handleMenuClick(event: ReactMouseEvent<HTMLDivElement>) {
        const target = event.target as HTMLElement | null
        if (!target) return
        if (target.closest('a, [role="menuitem"]')) {
            setOpen(false)
        }
    }

    return (
        <nav
            ref={rootRef}
            className={cn(
                'navbar',
                tone,
                bordered && 'bordered',
                sticky && 'sticky',
                open && 'mobile-open',
                `mobile-${mobileMenu}`,
                className
            )}
            {...getHiddenProps(hidden)}
            {...rest}
        >
            <MContainer size={container} padded={padded} className="container">
                <div className={cn('inner', justify, wrap && 'wrap')}>{renderedChildren}</div>
            </MContainer>

            {mobileMenu === 'drawer' && <div className={cn('mobile-backdrop', open && 'visible')} aria-hidden />}

            <div
                id={menuId}
                className={cn('mobile-menu', mobileMenu, open && 'open')}
                role="menu"
                aria-hidden={!open || undefined}
                onClick={handleMenuClick}
            >
                {mobileNavs}
                {mobileMenuContent}
            </div>
        </nav>
    )
}
