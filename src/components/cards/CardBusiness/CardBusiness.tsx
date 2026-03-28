import type {CardBusinessProps} from './CardBusiness.types'
import {cn} from '../../../utils/cn'
import {QrCode} from '../../display'
import {
    DiscordIcon,
    FacebookIcon,
    FigmaIcon,
    GitHubIcon,
    GlobeIcon,
    GoogleIcon,
    InstagramIcon,
    LinkedInIcon,
    MailIcon,
    PhoneIcon,
    PinterestIcon,
    PinIcon,
    SlackIcon,
    SpotifyIcon,
    TumblrIcon,
    VimeoIcon,
    VkIcon,
    XIcon,
    YouTubeIcon,
} from '../../../icons'
import './CardBusiness.css'

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

function normalizePlatform(platform: string): string {
    return platform.trim().toLowerCase().replace(/[\s._-]+/g, '')
}

function getSocialIcon(platform: string) {
    switch (normalizePlatform(platform)) {
        case 'github':
            return <GitHubIcon />
        case 'linkedin':
            return <LinkedInIcon />
        case 'x':
        case 'twitter':
            return <XIcon />
        case 'instagram':
            return <InstagramIcon />
        case 'facebook':
            return <FacebookIcon />
        case 'youtube':
            return <YouTubeIcon />
        case 'discord':
            return <DiscordIcon />
        case 'figma':
            return <FigmaIcon />
        case 'slack':
            return <SlackIcon />
        case 'google':
            return <GoogleIcon />
        case 'spotify':
            return <SpotifyIcon />
        case 'pinterest':
            return <PinterestIcon />
        case 'tumblr':
            return <TumblrIcon />
        case 'vimeo':
            return <VimeoIcon />
        case 'vk':
        case 'vkontakte':
            return <VkIcon />
        default:
            return null
    }
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
                            <span className="cb-detail-icon">
                                <MailIcon />
                            </span>
                            <a href={`mailto:${contact.email}`} className="cb-detail-value">
                                {contact.email}
                            </a>
                        </div>
                    )}
                    {contact?.phone && (
                        <div className="cb-detail">
                            <span className="cb-detail-icon">
                                <PhoneIcon />
                            </span>
                            <a href={`tel:${contact.phone}`} className="cb-detail-value">
                                {contact.phone}
                            </a>
                        </div>
                    )}
                    {contact?.website && (
                        <div className="cb-detail">
                            <span className="cb-detail-icon">
                                <GlobeIcon />
                            </span>
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
                            <span className="cb-detail-icon">
                                <PinIcon />
                            </span>
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
                            aria-label={item.platform}
                        >
                            {item.icon ?? getSocialIcon(item.platform) ?? <span className="cb-social-text">{item.platform}</span>}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}
