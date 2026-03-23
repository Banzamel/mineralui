import type {CardPaymentProps} from './CardPayment.types'
import {cn} from '../../../utils/cn'
import {detectCardBrand} from '../../../utils/creditCards'
import './CardPayment.css'

function maskNumber(raw: string): string {
    const digits = raw.replace(/\D/g, '')
    if (digits.length <= 4) return digits
    const last4 = digits.slice(-4)
    return `\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ${last4}`
}

// Display-only payment card with balance, masked number, holder name and brand badge.
export function CardPayment({
    holder,
    number,
    expiry,
    brand,
    brandIcon,
    balance,
    balanceLabel = 'Current balance',
    color,
    className,
    ...rest
}: CardPaymentProps) {
    const detected = brand ?? detectCardBrand(number).brand
    const masked = maskNumber(number)
    const brandLabel = detectCardBrand(number).iconLabel

    return (
        <div className={cn('card-payment', className)} {...rest}>
            {balance !== undefined && (
                <div>
                    <p className="cp-balance-label">{balanceLabel}</p>
                    <p className="cp-balance">{balance}</p>
                </div>
            )}

            <div className="cp-row">
                <span className={cn('cp-brand', !brandIcon && detected)}>
                    {brandIcon ?? brandLabel}
                </span>
                <span className="cp-number">{masked}</span>
            </div>

            <div className="cp-details">
                <div>
                    <p className="cp-field-label">Card holder</p>
                    <p className="cp-field-value">{holder}</p>
                </div>
                <div>
                    <p className="cp-field-label">Expiration date</p>
                    <p className="cp-field-value">{expiry}</p>
                </div>
            </div>
        </div>
    )
}
