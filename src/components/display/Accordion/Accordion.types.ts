import type {ReactNode, HTMLAttributes} from 'react'
import type {MineralFontColor} from '../../../theme'

export interface AccordionItemProps {
    id: string
    title: ReactNode
    children?: ReactNode
    disabled?: boolean
    fcolor?: MineralFontColor
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    multiple?: boolean
    defaultOpen?: string | string[]
    onChange?: (openIds: string[]) => void
    bordered?: boolean
    children: ReactNode
}
