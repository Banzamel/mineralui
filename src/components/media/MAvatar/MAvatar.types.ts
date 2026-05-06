import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MColor, MHiddenProps, MSize} from '../../../theme'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export type MAvatarSize = MSize | number
export type MAvatarShape = 'circle' | 'rounded' | 'square'
export type MAvatarPresence = 'online' | 'offline' | 'away' | 'busy'

export interface MAvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'hidden'>, MHiddenProps {
    src?: string
    alt?: string
    name?: string
    initials?: string
    size?: MAvatarSize
    shape?: MAvatarShape
    color?: MColor
    badge?: ReactNode | number | boolean
    badgeColor?: MColor
    badgePulsing?: boolean
    /**
     * Convenience preset for staff/team avatars showing online status. When set:
     * - badge auto-enabled (unless explicit `badge` overrides),
     * - badgeColor auto-mapped: `online → success`, `offline → neutral`, `away → warning`, `busy → error`,
     * - badgePulsing auto-enabled.
     * Explicit `badge`/`badgeColor`/`badgePulsing` always win over the preset.
     */
    presence?: MAvatarPresence
    backgroundColor?: string
    clickEffect?: MClickEffect
    rippleColor?: string
    /** Show skeleton placeholder instead of content */
    skeleton?: boolean
    style?: CSSProperties
}
