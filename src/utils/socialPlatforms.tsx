import type {ComponentType} from 'react'
import type {MIconProps} from '../icons'
import {
    MAppleColorIcon,
    MAppleIcon,
    MDiscordColorIcon,
    MDiscordIcon,
    MFacebookColorIcon,
    MFacebookIcon,
    MFigmaColorIcon,
    MFigmaIcon,
    MGitHubColorIcon,
    MGitHubIcon,
    MGoogleColorIcon,
    MGoogleIcon,
    MInstagramColorIcon,
    MInstagramIcon,
    MLinkedInColorIcon,
    MLinkedInIcon,
    MPinterestColorIcon,
    MPinterestIcon,
    MSlackColorIcon,
    MSlackIcon,
    MSpotifyColorIcon,
    MSpotifyIcon,
    MTumblrColorIcon,
    MTumblrIcon,
    MVimeoColorIcon,
    MVimeoIcon,
    MVkColorIcon,
    MVkIcon,
    MXColorIcon,
    MXIcon,
    MYouTubeColorIcon,
    MYouTubeIcon,
} from '../icons'

export type MSocialPlatform =
    | 'apple'
    | 'discord'
    | 'facebook'
    | 'figma'
    | 'github'
    | 'google'
    | 'instagram'
    | 'linkedin'
    | 'pinterest'
    | 'slack'
    | 'spotify'
    | 'tumblr'
    | 'vimeo'
    | 'vk'
    | 'twitter'
    | 'x'
    | 'youtube'
    | (string & {})

type SocialEntry = {
    label: string
    icon: ComponentType<MIconProps>
    colorIcon: ComponentType<MIconProps>
    rgb: string
}

const socialMap: Record<string, SocialEntry> = {
    apple: {label: 'Apple', icon: MAppleIcon, colorIcon: MAppleColorIcon, rgb: '24, 24, 27'},
    discord: {label: 'Discord', icon: MDiscordIcon, colorIcon: MDiscordColorIcon, rgb: '88, 101, 242'},
    facebook: {label: 'Facebook', icon: MFacebookIcon, colorIcon: MFacebookColorIcon, rgb: '24, 119, 242'},
    figma: {label: 'Figma', icon: MFigmaIcon, colorIcon: MFigmaColorIcon, rgb: '162, 89, 255'},
    github: {label: 'GitHub', icon: MGitHubIcon, colorIcon: MGitHubColorIcon, rgb: '24, 23, 23'},
    google: {label: 'Google', icon: MGoogleIcon, colorIcon: MGoogleColorIcon, rgb: '66, 133, 244'},
    instagram: {label: 'Instagram', icon: MInstagramIcon, colorIcon: MInstagramColorIcon, rgb: '225, 48, 108'},
    linkedin: {label: 'LinkedIn', icon: MLinkedInIcon, colorIcon: MLinkedInColorIcon, rgb: '10, 102, 194'},
    pinterest: {label: 'Pinterest', icon: MPinterestIcon, colorIcon: MPinterestColorIcon, rgb: '230, 0, 35'},
    slack: {label: 'Slack', icon: MSlackIcon, colorIcon: MSlackColorIcon, rgb: '74, 21, 75'},
    spotify: {label: 'Spotify', icon: MSpotifyIcon, colorIcon: MSpotifyColorIcon, rgb: '30, 215, 96'},
    tumblr: {label: 'Tumblr', icon: MTumblrIcon, colorIcon: MTumblrColorIcon, rgb: '0, 25, 53'},
    vimeo: {label: 'Vimeo', icon: MVimeoIcon, colorIcon: MVimeoColorIcon, rgb: '26, 183, 234'},
    vk: {label: 'VK', icon: MVkIcon, colorIcon: MVkColorIcon, rgb: '0, 119, 255'},
    x: {label: 'X', icon: MXIcon, colorIcon: MXColorIcon, rgb: '17, 17, 17'},
    youtube: {label: 'YouTube', icon: MYouTubeIcon, colorIcon: MYouTubeColorIcon, rgb: '255, 0, 0'},
}

export function normalizeSocialPlatform(platform: string) {
    const normalized = platform
        .trim()
        .toLowerCase()
        .replace(/[\s._-]+/g, '')

    if (normalized === 'twitter') {
        return 'x'
    }

    if (normalized === 'vkontakte') {
        return 'vk'
    }

    return normalized
}

export function getSocialLabel(platform: MSocialPlatform) {
    const normalized = normalizeSocialPlatform(platform)
    return socialMap[normalized]?.label ?? platform
}

export function getSocialIconComponent(platform: MSocialPlatform, brand = false) {
    const normalized = normalizeSocialPlatform(platform)
    const entry = socialMap[normalized]

    if (!entry) {
        return null
    }

    return brand ? entry.colorIcon : entry.icon
}

export function getSocialBrandRgb(platform: MSocialPlatform) {
    const normalized = normalizeSocialPlatform(platform)
    return socialMap[normalized]?.rgb ?? '37, 99, 235'
}
