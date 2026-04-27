import type {MDetailListProps} from './MDetailList.types'
import {cn} from '../../../utils/cn'
import {MInline, MStack} from '../../layout'
import {MLink, MText} from '../../typography'
import './MDetailList.css'

export function MDetailList({
    items,
    size = 'md',
    bordered = true,
    emptyState = null,
    className,
    ...rest
}: MDetailListProps) {
    if (!items.length) {
        return emptyState ? <div className={cn('detail-list', className)}>{emptyState}</div> : null
    }

    return (
        <div className={cn('detail-list', `size-${size}`, bordered && 'bordered', className)} {...rest}>
            {items.map((item) => {
                const key = item.key ?? item.label?.toString()
                const value =
                    item.component || item.to || item.href ? (
                        <MLink
                            component={item.component}
                            to={item.to}
                            href={item.href}
                            target={item.target}
                            rel={item.rel}
                        >
                            {item.value}
                        </MLink>
                    ) : (
                        item.value
                    )

                return (
                    <div key={key} className="detail-list-item">
                        <MInline justify={'between'} align={'start'}>
                            <MStack>
                                <MText size={'sm'} tone={'muted'}>
                                    {item.label}
                                </MText>
                                {value && <div className="detail-list-value">{value}</div>}
                                {item.helperText && (
                                    <MText size={'sm'} tone={'muted'}>
                                        {item.helperText}
                                    </MText>
                                )}
                            </MStack>
                            {item.status && <div className="detail-list-status">{item.status}</div>}
                        </MInline>
                    </div>
                )
            })}
        </div>
    )
}
