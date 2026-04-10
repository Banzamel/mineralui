import type {MCardOfferProps} from './MCardOffer.types'
import {SharedServiceCard} from '../ServiceCardsShared/ServiceCardsShared'

export function MCardOffer(props: MCardOfferProps) {
    const {onAction, actionLabel = 'Book now', ...rest} = props

    return (
        <SharedServiceCard
            variant="service"
            onAddToCart={onAction ? () => onAction() : undefined}
            actionLabel={actionLabel}
            {...rest}
        />
    )
}
