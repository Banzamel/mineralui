import {useEffect, useRef, useCallback} from 'react'
import type {MLoadMoreProps} from './MLoadMore.types'
import {MButton} from '../MButton'
import {cn} from '../../../utils/cn'
import './MLoadMore.css'

export function MLoadMore({
    onLoadMore,
    loading = false,
    hasMore = true,
    loaded,
    total,
    auto = false,
    autoThreshold = 100,
    variant = 'outlined',
    color = 'primary',
    label = 'Load more',
    loadingLabel = 'Loading...',
    doneLabel = 'All items loaded',
    className,
    ...rest
}: MLoadMoreProps) {
    const sentinelRef = useRef<HTMLDivElement>(null)
    const loadMoreRef = useRef(onLoadMore)
    loadMoreRef.current = onLoadMore

    useEffect(() => {
        if (!auto || !hasMore || loading) return

        const sentinel = sentinelRef.current
        if (!sentinel) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreRef.current()
                }
            },
            {rootMargin: `${autoThreshold}px`}
        )

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [auto, hasMore, loading, autoThreshold])

    const handleClick = useCallback(() => {
        if (!loading && hasMore) onLoadMore()
    }, [onLoadMore, loading, hasMore])

    const showCount = loaded !== undefined && total !== undefined

    return (
        <div className={cn('load-more', className)} {...rest}>
            {showCount && (
                <span className="load-more-count">
                    {loaded} / {total}
                </span>
            )}

            {hasMore ? (
                <MButton
                    variant={variant}
                    color={color}
                    loading={loading}
                    onClick={handleClick}
                    className="load-more-btn"
                >
                    {loading ? loadingLabel : label}
                </MButton>
            ) : (
                <span className="load-more-done">{doneLabel}</span>
            )}

            {auto && hasMore && <div ref={sentinelRef} className="load-more-sentinel" />}

            {showCount && (
                <div className="load-more-bar">
                    <div className="load-more-bar-fill" style={{width: `${Math.min((loaded / total) * 100, 100)}%`}} />
                </div>
            )}
        </div>
    )
}
