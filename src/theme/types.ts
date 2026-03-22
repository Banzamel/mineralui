export type MineralMode = 'dark' | 'light'
export type MineralModePreference = MineralMode | 'system'
export type MineralFontColor =
    | 'default'
    | 'muted'
    | 'heading'
    | 'inverted'
    | 'inherit'
    | 'primary'
    | 'neutral'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'danger'

export interface MineralTheme {
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

export type MineralColor = 'primary' | 'neutral' | 'success' | 'error' | 'warning' | 'info' | 'danger'
export type MineralSize = 'sm' | 'md' | 'lg'
