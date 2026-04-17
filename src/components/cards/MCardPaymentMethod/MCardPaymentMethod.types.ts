import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'
import type {MCardPaymentBrand} from '../MCardPayment'
import type {MInputExpDateProps} from '../../inputs/MInputExpDate'
import type {MInputCVCProps} from '../../inputs/MInputCVC'

export interface MCardPaymentMethodProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    title?: string
    actionLabel?: string
    actionHref?: string
    onAction?: () => void
    brand?: MCardPaymentBrand
    brandIcon?: ReactNode
    last4: string
    badgeLabel?: string | null
    summary?: string | null
    helperText?: string
    expiryLabel?: string
    cvcLabel?: string
    expiryProps?: MInputExpDateProps
    cvcProps?: MInputCVCProps
    color?: MColor
}
