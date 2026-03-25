import type {HTMLAttributes, ReactNode} from 'react'

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
    sidebar?: ReactNode
    children?: ReactNode
}

export interface BodyProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}
