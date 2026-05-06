import {Children, isValidElement} from 'react'
import type {MTimelineProps, MTimelineItemProps} from './MTimeline.types'
import {cn} from '../../../utils/cn'
import './MTimeline.css'

export function MTimelineItem(_props: MTimelineItemProps) {
    return null
}

export function MTimeline({
    align = 'left',
    color = 'primary',
    size = 'md',
    className,
    children,
    ...rest
}: MTimelineProps) {
    const items = Children.toArray(children).filter(
        (child) => isValidElement(child) && (child.type as any) === MTimelineItem
    )

    return (
        <div className={cn('timeline', `align-${align}`, `color-${color}`, size, className)} {...rest}>
            {items.map((child, index) => {
                if (!isValidElement<MTimelineItemProps>(child)) return null
                const {id, title, description, date, icon, color: itemColor} = child.props
                const side = align === 'alternate' ? (index % 2 === 0 ? 'left' : 'right') : undefined

                return (
                    <div key={id} className={cn('timeline-item', side && `side-${side}`)}>
                        <div className={cn('timeline-dot', itemColor && `color-${itemColor}`)}>{icon}</div>
                        <div className="timeline-content">
                            <span className="timeline-title">{title}</span>
                            {description && <span className="timeline-description">{description}</span>}
                            {date && <span className="timeline-date">{date}</span>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
