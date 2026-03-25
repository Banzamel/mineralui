import type {HTMLAttributes, ReactNode} from 'react'

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}

export interface BodyProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}
