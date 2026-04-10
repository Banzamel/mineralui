import type {ReactNode, HTMLAttributes} from 'react'
import type {MColor} from '../../../theme'

export interface MAccordionItemProps {
    id: string
    title: ReactNode
    children?: ReactNode
    disabled?: boolean
    color?: MColor
}

export interface MAccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    multiple?: boolean
    defaultOpen?: string | string[]
    onChange?: (openIds: string[]) => void
    bordered?: boolean
    color?: MColor
    children: ReactNode
}
