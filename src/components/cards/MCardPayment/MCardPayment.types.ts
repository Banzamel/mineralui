import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export type MCardPaymentBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'maestro' | 'unknown'

export interface MCardPaymentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    holder: string
    number: string
    expiry: string
    brand?: MCardPaymentBrand
    brandIcon?: ReactNode
    balance?: string
    balanceLabel?: string
    color?: MColor
}
