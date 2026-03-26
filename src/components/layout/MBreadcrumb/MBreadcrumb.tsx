import {Fragment, useMemo} from 'react'
import {cn} from '../../../utils/cn'
import type {MBreadcrumbProps} from './MBreadcrumb.types'
import './MBreadcrumb.css'

// Render a compact path and collapse the middle when needed.
export function MBreadcrumb({items, separator = '/', maxItems, className, ...rest}: MBreadcrumbProps) {
    // Keep the current page visible while shortening deep paths.
    const visible = useMemo(() => {
        if (!maxItems || maxItems >= items.length) return items
        if (maxItems < 2) return [items[items.length - 1]]
        const head = items.slice(0, 1)
        const tail = items.slice(-(maxItems - 1))
        return [...head, null, ...tail]
    }, [items, maxItems])

    return (
        <nav aria-label="breadcrumb" className={cn('breadcrumb', className)} {...rest}>
            <ol className="trail">
                {visible.map((item, i) => {
                    if (item === null) {
                        return (
                            <li key="ellipsis" className="crumb dots">
                                <span className="sep">{separator}</span>
                                <span>&#8230;</span>
                            </li>
                        )
                    }

                    const isLast = i === visible.length - 1

                    return (
                        <li key={i} className={cn('crumb', isLast && 'active')}>
                            {i > 0 && <span className="sep">{separator}</span>}
                            {item.href && !isLast ? (
                                <a href={item.href} className="link" onClick={item.onClick}>
                                    {item.label}
                                </a>
                            ) : item.onClick && !isLast ? (
                                <button type="button" className="link btn" onClick={item.onClick}>
                                    {item.label}
                                </button>
                            ) : (
                                <span className="current" aria-current={isLast ? 'page' : undefined}>
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
