import {Children, isValidElement, useEffect} from 'react'
import type {MouseEvent, ReactElement, ReactNode} from 'react'
import type {DrawerProps, DrawerSectionProps} from './Drawer.types'
import {Portal} from '../../primitives'
import {cn} from '../../../utils/cn'
import './Drawer.css'

type DrawerSlotElement = ReactElement<DrawerSectionProps>

function isDrawerHeader(child: ReactNode): child is DrawerSlotElement {
    return isValidElement(child) && !!(child.type as any).__drawerHeader
}

function isDrawerBody(child: ReactNode): child is DrawerSlotElement {
    return isValidElement(child) && !!(child.type as any).__drawerBody
}

function isDrawerFooter(child: ReactNode): child is DrawerSlotElement {
    return isValidElement(child) && !!(child.type as any).__drawerFooter
}

export function DrawerHeader({children}: DrawerSectionProps) {
    return <>{children}</>
}
;(DrawerHeader as any).__drawerHeader = true

export function DrawerBody({children}: DrawerSectionProps) {
    return <>{children}</>
}
;(DrawerBody as any).__drawerBody = true

export function DrawerFooter({children}: DrawerSectionProps) {
    return <>{children}</>
}
;(DrawerFooter as any).__drawerFooter = true

export function Drawer({
    open,
    onClose,
    side = 'right',
    size = 'md',
    overlay = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    className,
    children,
    ...rest
}: DrawerProps) {
    useEffect(() => {
        if (!open || !closeOnEscape) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, closeOnEscape, onClose])

    useEffect(() => {
        if (!open) return

        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [open])

    if (!open) return null

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose()
    }

    let header: ReactNode = null
    let headerProps: DrawerSectionProps | null = null
    let bodyProps: DrawerSectionProps | null = null
    let footer: ReactNode = null
    let footerProps: DrawerSectionProps | null = null
    const body: ReactNode[] = []

    Children.forEach(children, (child) => {
        if (isDrawerHeader(child)) {
            header = child.props.children
            headerProps = child.props
            return
        }

        if (isDrawerBody(child)) {
            bodyProps = child.props
            body.push(child.props.children)
            return
        }

        if (isDrawerFooter(child)) {
            footer = child.props.children
            footerProps = child.props
            return
        }

        body.push(child)
    })

    const headerSection = headerProps ?? ({children: undefined} as DrawerSectionProps)
    const bodySection = bodyProps ?? ({children: undefined} as DrawerSectionProps)
    const footerSection = footerProps ?? ({children: undefined} as DrawerSectionProps)
    const {
        children: _headerChildren,
        className: headerClassName,
        bordered: headerBordered = false,
        ...headerRest
    } = headerSection
    const {children: _bodyChildren, className: bodyClassName, ...bodyRest} = bodySection
    const {
        children: _footerChildren,
        className: footerClassName,
        bordered: footerBordered = false,
        ...footerRest
    } = footerSection

    return (
        <Portal>
            <div className={cn('drawer-backdrop', overlay && 'overlay')} onMouseDown={handleBackdropClick}>
                <div className={cn('drawer', side, size, className)} role="dialog" aria-modal="true" {...rest}>
                    {header && (
                        <div {...headerRest} className={cn('drawer-header', headerBordered && 'bordered', headerClassName)}>
                            <div className="drawer-title">{header}</div>
                            <button type="button" className="close" onClick={onClose} aria-label="Close">
                                &#215;
                            </button>
                        </div>
                    )}
                    <div {...bodyRest} className={cn('drawer-body', bodyClassName)}>
                        {body}
                    </div>
                    {footer && (
                        <div
                            {...footerRest}
                            className={cn('drawer-footer', footerBordered && 'bordered', footerClassName)}
                        >
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </Portal>
    )
}
