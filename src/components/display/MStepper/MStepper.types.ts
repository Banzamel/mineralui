import type {ReactNode, HTMLAttributes} from 'react'
import type {MColor, MSize} from '../../../theme'

export interface MStepProps {
    id: string
    title: ReactNode
    description?: ReactNode
    icon?: ReactNode
    disabled?: boolean
    optional?: boolean
    error?: boolean
}

export interface MStepperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    activeStep: number
    variant?: 'horizontal' | 'vertical'
    color?: MColor
    size?: MSize
    clickable?: boolean
    onChange?: (step: number) => void
    children: ReactNode
}
