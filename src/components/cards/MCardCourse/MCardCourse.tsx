import type {MCardCourseProps} from './MCardCourse.types'
import {SharedServiceCard} from '../ServiceCardsShared/ServiceCardsShared'

export function MCardCourse(props: MCardCourseProps) {
    const {onAction, actionLabel = 'Join course', ...rest} = props

    return (
        <SharedServiceCard
            variant="course"
            onAddToCart={onAction ? () => onAction() : undefined}
            actionLabel={actionLabel}
            {...rest}
        />
    )
}
