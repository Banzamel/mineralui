export type MMode = 'dark' | 'light'
export type MModePreference = MMode | 'system'

export interface MTheme {
    primaryRgb?: string
    primary?: string
    primaryDark?: string
    primaryLight?: string
    neutralRgb?: string
    neutral?: string
    dark?: string
    darkLight?: string
    surface?: string
    surfaceContrast?: string
    pageBg?: string
    pageText?: string
    text?: string
    textSecondary?: string
    textHeading?: string
    border?: string
    borderHover?: string
    borderFocus?: string
    successRgb?: string
    success?: string
    errorRgb?: string
    error?: string
    warningRgb?: string
    warning?: string
    infoRgb?: string
    info?: string
    fontFamily?: string
    fontFamilySans?: string
    fontFamilyMono?: string
    fontFamilyHeading?: string
    fontColorDefault?: string
    fontColorMuted?: string
    fontColorHeading?: string
    fontColorInverted?: string
    fontColorPrimary?: string
    fontColorNeutral?: string
    fontColorSuccess?: string
    fontColorError?: string
    fontColorWarning?: string
    fontColorInfo?: string
    radiusSm?: string
    radiusMd?: string
    radiusLg?: string
}

export type MColor = 'primary' | 'neutral' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark' | 'news'
export type MSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
