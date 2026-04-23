import {useEffect, useRef} from 'react'
import type {MouseEvent} from 'react'
import type {MCardTileProps} from './MCardTile.types'
import {cn} from '../../../utils/cn'
import {MEllipsisVerticalIcon, MHeartFillIcon, MHeartIcon} from '../../../icons'
import {MButton} from '../../controls'
import {MDropdownItem, MDropdownMenu} from '../../overlays'
import './MCardTile.css'

// Tile card: whole surface acts as a link/button, media can fill the card with text overlay.
// Media can be an image URL, a video URL, an MIllustration element, or a live camera stream.
export function MCardTile({
    title,
    description,
    icon,
    color = 'primary',
    href,
    target,
    rel,
    onClick,
    image,
    video,
    illustration,
    camera,
    mediaFill = false,
    overlayPosition = 'bottom',
    favorite,
    onFavorite,
    menuItems,
    className,
    ...rest
}: MCardTileProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!camera) {
            return
        }

        const node = videoRef.current
        if (!node || typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
            return
        }

        let activeStream: MediaStream | null = null
        let cancelled = false
        const constraints: MediaStreamConstraints = camera === true ? {video: true} : camera

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                if (cancelled) {
                    stream.getTracks().forEach((track) => track.stop())
                    return
                }
                activeStream = stream
                node.srcObject = stream
                void node.play().catch(() => undefined)
            })
            .catch(() => undefined)

        return () => {
            cancelled = true
            if (activeStream) {
                activeStream.getTracks().forEach((track) => track.stop())
            }
            node.srcObject = null
        }
    }, [camera])

    const hasMedia = Boolean(image || video || illustration || camera)
    const interactive = Boolean(href || onClick)
    const isLink = Boolean(href)
    const fillMedia = mediaFill && hasMedia

    function stopBubble(event: MouseEvent) {
        event.stopPropagation()
    }

    function handleOverlayClick(event: MouseEvent<HTMLElement>) {
        if (onClick) {
            event.preventDefault()
            onClick()
        }
    }

    function renderMedia() {
        if (!hasMedia) {
            return null
        }

        return (
            <div className={cn('tile-media', fillMedia && 'fill')}>
                {image && <img src={image} alt={title} className="tile-image" />}
                {video && (
                    <video
                        src={video}
                        className="tile-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label={title}
                    />
                )}
                {camera && (
                    <video
                        ref={videoRef}
                        className="tile-video"
                        autoPlay
                        muted
                        playsInline
                        aria-label={title}
                    />
                )}
                {illustration && <div className="tile-illustration">{illustration}</div>}
                {fillMedia && <div className={cn('tile-scrim', `scrim-${overlayPosition}`)} />}
            </div>
        )
    }

    function renderBody() {
        return (
            <div className={cn('tile-body', fillMedia && 'overlay', fillMedia && `pos-${overlayPosition}`)}>
                <div className="tile-top">
                    {icon && <span className="tile-icon">{icon}</span>}
                    <h3 className="tile-title">{title}</h3>
                </div>
                {description && <p className="tile-desc">{description}</p>}
            </div>
        )
    }

    const hasActions = onFavorite || (menuItems && menuItems.length > 0)

    return (
        <div
            className={cn(
                'card-tile',
                `color-${color}`,
                fillMedia && 'media-fill',
                interactive && 'interactive',
                className
            )}
            {...rest}
        >
            {isLink && (
                <a
                    href={href}
                    target={target}
                    rel={rel}
                    className="tile-link"
                    aria-label={title}
                    onClick={onClick ? handleOverlayClick : undefined}
                />
            )}
            {!isLink && onClick && (
                <button type="button" className="tile-link" aria-label={title} onClick={onClick} />
            )}

            {renderMedia()}
            {renderBody()}

            {hasActions && (
                <div className="tile-actions" onClick={stopBubble}>
                    {menuItems && menuItems.length > 0 && (
                        <MDropdownMenu
                            className="tile-menu-wrap"
                            trigger={
                                <MButton
                                    variant="ghost"
                                    iconOnly
                                    shape="circle"
                                    aria-label="More options"
                                    className="tile-overlay-btn"
                                >
                                    <MEllipsisVerticalIcon />
                                </MButton>
                            }
                            placement="bottom-end"
                        >
                            {menuItems.map((item, i) => (
                                <MDropdownItem
                                    key={i}
                                    icon={item.icon}
                                    color={item.danger ? 'error' : undefined}
                                    label={item.label}
                                    onClick={item.onClick}
                                />
                            ))}
                        </MDropdownMenu>
                    )}
                    {onFavorite && (
                        <MButton
                            variant="ghost"
                            iconOnly
                            shape="circle"
                            onClick={onFavorite}
                            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                            className={cn('tile-overlay-btn', favorite && 'tile-fav-active')}
                        >
                            {favorite ? <MHeartFillIcon /> : <MHeartIcon />}
                        </MButton>
                    )}
                </div>
            )}
        </div>
    )
}
