import type {MCardEventProps} from './MCardEvent.types'
import {SharedServiceCard} from '../ServiceCardsShared/ServiceCardsShared'

export function MCardEvent(props: MCardEventProps) {
    const {onRegister, registerLabel = 'Register', ...rest} = props

    return (
        <SharedServiceCard
            variant="event"
            onAddToCart={onRegister ? () => onRegister() : undefined}
            actionLabel={registerLabel}
            {...rest}
        />
    )
}
