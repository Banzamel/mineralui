import {forwardRef, Children, isValidElement} from 'react'
import type {AppShellProps, BodyProps} from './AppShell.types'
import {cn} from '../../../utils/cn'
import {MSidebar} from '../MSidebar'
import './AppShell.css'

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
    {className, children, ...rest},
    ref
) {
    const sidebarElements: React.ReactNode[] = []
    const otherElements: React.ReactNode[] = []

    Children.forEach(children, (child) => {
        if (isValidElement(child) && child.type === MSidebar) {
            sidebarElements.push(child)
        } else {
            otherElements.push(child)
        }
    })

    return (
        <div ref={ref} className={cn('app-shell', className)} {...rest}>
            {sidebarElements}
            <div className="app-main">{otherElements}</div>
        </div>
    )
})

export const Body = forwardRef<HTMLDivElement, BodyProps>(function Body({className, children, ...rest}, ref) {
    return (
        <div ref={ref} className={cn('app-body', className)} {...rest}>
            {children}
        </div>
    )
})
