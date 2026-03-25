import {forwardRef} from 'react'
import type {AppShellProps, BodyProps} from './AppShell.types'
import {cn} from '../../../utils/cn'
import './AppShell.css'

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
    {sidebar, className, children, ...rest},
    ref
) {
    return (
        <div ref={ref} className={cn('app-shell', className)} {...rest}>
            {sidebar}
            {children}
        </div>
    )
})

export const Body = forwardRef<HTMLDivElement, BodyProps>(function Body(
    {className, children, ...rest},
    ref
) {
    return (
        <div ref={ref} className={cn('app-body', className)} {...rest}>
            {children}
        </div>
    )
})
