import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor} from '../../../theme'

export type CardPaymentBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'maestro' | 'unknown'

export interface CardPaymentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    holder: string
    number: string
    expiry: string
    brand?: CardPaymentBrand
    brandIcon?: ReactNode
    balance?: string
    balanceLabel?: string
    color?: MineralColor
}
