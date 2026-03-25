import {Fragment, useMemo} from 'react'
import {cn} from '../../../utils/cn'
import type {MBreadcrumbProps} from './MBreadcrumb.types'
import './MBreadcrumb.css'

export function MBreadcrumb({
    items,
    separator = '/',
    maxItems,
    className,
    ...rest
}: MBreadcrumbProps) {
    const visible = useMemo(() => {
        if (!maxItems || maxItems >= items.length) return items
        if (maxItems < 2) return [items[items.length - 1]]
        const head = items.slice(0, 1)
        const tail = items.slice(-(maxItems - 1))
        return [...head, null, ...tail]
    }, [items, maxItems])

    return (
        <nav aria-label="breadcrumb" className={cn('breadcrumb', className)} {...rest}>
            <ol className="breadcrumb-list">
                {visible.map((item, i) => {
                    if (item === null) {
                        return (
                            <li key="ellipsis" className="breadcrumb-item breadcrumb-ellipsis">
                                <span className="breadcrumb-separator">{separator}</span>
                                <span>&#8230;</span>
                            </li>
                        )
                    }

                    const isLast = i === visible.length - 1

                    return (
                        <li key={i} className={cn('breadcrumb-item', isLast && 'breadcrumb-item--active')}>
                            {i > 0 && <span className="breadcrumb-separator">{separator}</span>}
                            {item.href && !isLast ? (
                                <a href={item.href} className="breadcrumb-link" onClick={item.onClick}>
                                    {item.label}
                                </a>
                            ) : item.onClick && !isLast ? (
                                <button type="button" className="breadcrumb-link breadcrumb-button" onClick={item.onClick}>
                                    {item.label}
                                </button>
                            ) : (
                                <span className="breadcrumb-current" aria-current={isLast ? 'page' : undefined}>
                                    {item.label}
                                </span>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
