import type {MCardProductProps} from './MCardProduct.types'
import {SharedServiceCard} from '../ServiceCardsShared/ServiceCardsShared'

export function MCardProduct(props: MCardProductProps) {
    const {addToCartLabel = 'Add to cart', ...rest} = props

    return <SharedServiceCard variant="product" actionLabel={addToCartLabel} {...rest} />
}
