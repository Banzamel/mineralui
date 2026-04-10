import type {HTMLAttributes, ReactNode} from 'react'

export interface MAppShellProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}

export interface MBodyProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}
