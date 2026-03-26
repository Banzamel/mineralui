import type {CardBusinessProps} from './CardBusiness.types'
import {cn} from '../../../utils/cn'
import {QrCode} from '../../display/QrCode'
import './CardBusiness.css'

const mailIcon = (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
        <path
            d="M2 3.5h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"
            stroke="currentColor"
            strokeWidth="1.2"
        />
        <path d="m2 5 6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
)

const phoneIcon = (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
        <path
            d="M5.3 2.4 3.9 3.8a1.5 1.5 0 0 0-.4 1.4c.6 2.5 2.6 4.6 5.2 5.2a1.5 1.5 0 0 0 1.4-.4l1.4-1.4a1 1 0 0 1 1-.2l2 1a1 1 0 0 1 .6.9v2a1 1 0 0 1-1 1C7.5 13.3 2.7 8.5 2.7 2.5a1 1 0 0 1 1-1h2a1 1 0 0 1 .9.6l1 2a1 1 0 0 1-.3 1z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
        />
    </svg>
)

const webIcon = (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2.5 8h11" stroke="currentColor" strokeWidth="1.2" />
        <path
            d="M8 2.5c1.7 1.5 2.6 3.3 2.6 5.5S9.7 12 8 13.5C6.3 12 5.4 10.2 5.4 8S6.3 4 8 2.5z"
            stroke="currentColor"
            strokeWidth="1.2"
        />
    </svg>
)

const pinIcon = (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
        <path
            d="M8 14s4-3.6 4-7a4 4 0 1 0-8 0c0 3.4 4 7 4 7z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
        />
        <circle cx="8" cy="7" r="1.5" fill="currentColor" />
    </svg>
)

// Build a short avatar fallback from the visible name.
function initials(name: string): string {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() ?? '')
        .join('')
}

// Join available address fields into one readable line.
function formatAddress(address: CardBusinessProps['address']): string | null {
    if (!address) return null

    return [address.street, [address.zip, address.city].filter(Boolean).join(' '), address.country]
        .filter(Boolean)
        .join(', ')
}

// Render a compact business card for a person or a company profile.
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
    qrValue,
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
                    {online !== undefined && <span className={cn('cb-status', online ? 'online' : 'offline')} />}
                </div>

                <div className="cb-info">
                    <h3 className="cb-name">{name}</h3>
                    {title && <p className="cb-title">{title}</p>}
                    {lastActive && <p className="cb-last-active">{lastActive}</p>}
                </div>

                {(qrValue || qrCode) && (
                    <div className="cb-qr">
                        {qrValue ? (
                            <QrCode value={qrValue} size={56} padding={3} className="cb-qr-code" />
                        ) : (
                            <img src={qrCode} alt="QR" className="cb-qr-img" />
                        )}
                    </div>
                )}
            </div>

            {(contact || addr) && (
                <div className="cb-details">
                    {contact?.email && (
                        <div className="cb-detail">
                            <span className="cb-detail-icon">{mailIcon}</span>
                            <a href={`mailto:${contact.email}`} className="cb-detail-value">
                                {contact.email}
                            </a>
                        </div>
                    )}
                    {contact?.phone && (
                        <div className="cb-detail">
                            <span className="cb-detail-icon">{phoneIcon}</span>
                            <a href={`tel:${contact.phone}`} className="cb-detail-value">
                                {contact.phone}
                            </a>
                        </div>
                    )}
                    {contact?.website && (
                        <div className="cb-detail">
                            <span className="cb-detail-icon">{webIcon}</span>
                            <a
                                href={contact.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cb-detail-value"
                            >
                                {contact.website.replace(/^https?:\/\//, '')}
                            </a>
                        </div>
                    )}
                    {addr && (
                        <div className="cb-detail">
                            <span className="cb-detail-icon">{pinIcon}</span>
                            <span className="cb-detail-value">{addr}</span>
                        </div>
                    )}
                </div>
            )}

            {socials && socials.length > 0 && (
                <div className="cb-socials">
                    {socials.map((item) => (
                        <a
                            key={item.platform}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cb-social"
                            title={item.platform}
                        >
                            {item.icon ?? item.platform}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}
