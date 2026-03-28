import {useState, useRef, useEffect} from 'react'
import type {CardServiceProps} from './CardService.types'
import {cn} from '../../../utils/cn'
import {
    ClockIcon,
    EllipsisVerticalIcon,
    HeartFillIcon,
    HeartIcon,
    MinusIcon,
    PlusIcon,
} from '../../../icons'
import {Rating} from '../../display'
import './CardService.css'

function AvatarStack({people, max = 4}: {people: CardServiceProps['participants']; max?: number}) {
    if (!people || people.length === 0) return null
    const visible = people.slice(0, max)
    const overflow = people.length - max

    return (
        <div className="cs-avatars">
            {visible.map((p, i) => (
                <span key={i} className="cs-avatar-sm" title={p.name}>
                    {p.avatar ? <img src={p.avatar} alt={p.name} /> : <span>{p.name[0]?.toUpperCase()}</span>}
                </span>
            ))}
            {overflow > 0 && <span className="cs-avatar-sm cs-overflow">+{overflow}</span>}
        </div>
    )
}

// Card for services, courses or products with rating, gallery, cart and participant display.
export function CardService({
    variant = 'service',
    title,
    description,
    price,
    currency = 'PLN',
    duration,
    available,
    image,
    gallery,
    rating,
    reviewCount,
    favorite,
    onFavorite,
    menuItems,
    onAddToCart,
    icon,
    color = 'primary',
    leader,
    participants,
    maxParticipants,
    quantity: controlledQty,
    onQuantityChange,
    className,
    ...rest
}: CardServiceProps) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [galleryIdx, setGalleryIdx] = useState(0)
    const [internalQty, setInternalQty] = useState(1)
    const menuRef = useRef<HTMLDivElement>(null)

    const qty = controlledQty ?? internalQty
    const images = gallery && gallery.length > 0 ? gallery : image ? [image] : []

    useEffect(() => {
        if (!menuOpen) return
        function close(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
        }
        document.addEventListener('mousedown', close)
        return () => document.removeEventListener('mousedown', close)
    }, [menuOpen])

    function changeQty(next: number) {
        const val = Math.max(1, next)
        if (onQuantityChange) onQuantityChange(val)
        else setInternalQty(val)
    }

    const availLabel =
        available === true
            ? 'Available'
            : available === false
              ? 'Unavailable'
              : typeof available === 'number'
                ? `${available} spots`
                : null

    return (
        <div className={cn('card-service', variant, color, className)} {...rest}>
            {images.length > 0 && (
                <div className="cs-gallery">
                    <img src={images[galleryIdx]} alt={title} className="cs-image" />
                    {images.length > 1 && (
                        <div className="cs-gallery-dots">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    className={cn('cs-dot', i === galleryIdx && 'active')}
                                    onClick={() => setGalleryIdx(i)}
                                    aria-label={`Image ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    {onFavorite && (
                        <button
                            className={cn('cs-fav', favorite && 'active')}
                            onClick={onFavorite}
                            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            {favorite ? <HeartFillIcon /> : <HeartIcon />}
                        </button>
                    )}

                    {menuItems && menuItems.length > 0 && (
                        <div className="cs-menu-wrap" ref={menuRef}>
                            <button
                                className="cs-menu-btn"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="More options"
                            >
                                <EllipsisVerticalIcon />
                            </button>
                            {menuOpen && (
                                <div className="cs-menu">
                                    {menuItems.map((item, i) => (
                                        <button
                                            key={i}
                                            className={cn('cs-menu-item', item.danger && 'danger')}
                                            onClick={() => {
                                                item.onClick?.()
                                                setMenuOpen(false)
                                            }}
                                        >
                                            {item.icon && <span className="cs-menu-icon">{item.icon}</span>}
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="cs-body">
                <div className="cs-top">
                    {icon && <span className="cs-icon">{icon}</span>}
                    <h3 className="cs-title">{title}</h3>
                </div>

                {description && <p className="cs-desc">{description}</p>}

                {rating !== undefined && (
                    <div className="cs-rating">
                        <Rating value={Math.round(rating)} size="sm" color="warning" readOnly className="cs-stars" />
                        <span className="cs-rating-value">{rating.toFixed(1)}</span>
                        {reviewCount !== undefined && <span className="cs-review-count">({reviewCount})</span>}
                    </div>
                )}

                {leader && (
                    <div className="cs-leader">
                        <span className="cs-avatar-sm" title={leader.name}>
                            {leader.avatar ? (
                                <img src={leader.avatar} alt={leader.name} />
                            ) : (
                                <span>{leader.name[0]?.toUpperCase()}</span>
                            )}
                        </span>
                        <span className="cs-leader-name">{leader.name}</span>
                    </div>
                )}

                {variant === 'course' && participants && (
                    <div className="cs-participants">
                        <AvatarStack people={participants} />
                        {maxParticipants && (
                            <span className="cs-spots">
                                {participants.length}/{maxParticipants}
                            </span>
                        )}
                    </div>
                )}

                <div className="cs-meta">
                    {duration && (
                        <span className="cs-tag">
                            <ClockIcon />
                            {duration}
                        </span>
                    )}
                    {availLabel && (
                        <span className={cn('cs-tag', available === false && 'unavailable')}>{availLabel}</span>
                    )}
                </div>
            </div>

            <div className="cs-footer">
                {price !== undefined && (
                    <span className="cs-price">
                        {typeof price === 'number' ? price.toFixed(2) : price}{' '}
                        <span className="cs-currency">{currency}</span>
                    </span>
                )}

                <div className="cs-actions">
                    {variant === 'product' && onAddToCart && (
                        <div className="cs-qty">
                            <button className="cs-qty-btn" onClick={() => changeQty(qty - 1)} aria-label="Decrease">
                                <MinusIcon />
                            </button>
                            <span className="cs-qty-value">{qty}</span>
                            <button className="cs-qty-btn" onClick={() => changeQty(qty + 1)} aria-label="Increase">
                                <PlusIcon />
                            </button>
                        </div>
                    )}
                    {onAddToCart && (
                        <button className="cs-cart-btn" onClick={() => onAddToCart(qty)} disabled={available === false}>
                            Add to cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
