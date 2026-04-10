import {forwardRef, Children, isValidElement} from 'react'
import type * as React from 'react'
import type {MAppShellProps, MBodyProps} from './MAppShell.types'
import {cn} from '../../../utils/cn'
import {MSidebar} from '../MSidebar'
import './MAppShell.css'

export const MAppShell = forwardRef<HTMLDivElement, MAppShellProps>(function MAppShell(
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

export const MBody = forwardRef<HTMLDivElement, MBodyProps>(function MBody({className, children, ...rest}, ref) {
    return (
        <div ref={ref} className={cn('app-body', className)} {...rest}>
            {children}
        </div>
    )
})
