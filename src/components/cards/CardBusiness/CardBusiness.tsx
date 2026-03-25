import type {CardBusinessProps} from './CardBusiness.types'
import {cn} from '../../../utils/cn'
import './CardBusiness.css'

function initials(name: string): string {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('')
}

function formatAddress(a: CardBusinessProps['address']): string | null {
    if (!a) return null
    return [a.street, [a.zip, a.city].filter(Boolean).join(' '), a.country].filter(Boolean).join(', ')
}

// Business card component with user/company variants, status indicator, contact info and socials.
export function CardBusiness({
    variant = 'user',
    name,
    title,
    avatar,
    address,
    contact,
    socials,
    online,
    lastActive,
    qrCode,
    color = 'primary',
    className,
    ...rest
}: CardBusinessProps) {
    const addr = formatAddress(address)

    return (
        <div className={cn('card-business', variant, color, className)} {...rest}>
            <div className="cb-header">
                <div className="cb-avatar-wrap">
                    {avatar ? (
                        <img src={avatar} alt={name} className={cn('cb-avatar', variant)} />
                    ) : (
                        <span className={cn('cb-avatar', 'cb-initials', variant)}>{initials(name)}</span>
                    )}
                    {online !== undefined && (
                        <span className={cn('cb-status', online ? 'online' : 'offline')} />
                    )}
                </div>

                <div className="cb-info">
                    <h3 className="cb-name">{name}</h3>
                    {title && <p className="cb-title">{title}</p>}
                    {lastActive && <p className="cb-last-active">{lastActive}</p>}
                </div>

                {qrCode && (
                    <div className="cb-qr">
                        <img src={qrCode} alt="QR" className="cb-qr-img" />
                    </div>
                )}
            </div>

            {(contact || addr) && (
                <div className="cb-details">
                    {contact?.email && (
                        <div className="cb-detail">
                            <span className="cb-detail-icon">✉</span>
                            <a href={`mailto:${contact.email}`} className="cb-detail-value">{contact.email}</a>
                        </div>
                    )}
                    {contact?.phone && (
                        <div className="cb-detail">
                            <span className="cb-detail-icon">☎</span>
                            <a href={`tel:${contact.phone}`} className="cb-detail-value">{contact.phone}</a>
                        </div>
                    )}
                    {contact?.website && (
                        <div className="cb-detail">
                            <span className="cb-detail-icon">🌐</span>
                            <a href={contact.website} target="_blank" rel="noopener noreferrer" className="cb-detail-value">
                                {contact.website.replace(/^https?:\/\//, '')}
                            </a>
                        </div>
                    )}
                    {addr && (
                        <div className="cb-detail">
                            <span className="cb-detail-icon">📍</span>
                            <span className="cb-detail-value">{addr}</span>
                        </div>
                    )}
                </div>
            )}

            {socials && socials.length > 0 && (
                <div className="cb-socials">
                    {socials.map((s) => (
                        <a
                            key={s.platform}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cb-social"
                            title={s.platform}
                        >
                            {s.icon ?? s.platform}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}
