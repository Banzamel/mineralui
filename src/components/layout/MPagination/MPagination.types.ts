import type {HTMLAttributes} from 'react'

export interface MPaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
    total: number
    page: number
    pageSize?: number
    onChange: (page: number) => void
    siblings?: number
    boundaries?: number
    variant?: 'numbered' | 'simple'
}
