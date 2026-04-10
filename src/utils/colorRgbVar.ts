const COLOR_MAP: Record<string, string> = {
    primary: 'var(--mineral-primary-rgb)',
    neutral: 'var(--mineral-neutral-rgb)',
    success: 'var(--mineral-success-rgb)',
    error: 'var(--mineral-error-rgb)',
    warning: 'var(--mineral-warning-rgb)',
    info: 'var(--mineral-info-rgb)',
    light: 'var(--mineral-light-rgb)',
    dark: 'var(--mineral-dark-color-rgb)',
    news: 'var(--mineral-news-rgb)',
}

export function colorRgbVar(color: string | undefined): string {
    return COLOR_MAP[color ?? 'primary'] ?? COLOR_MAP.primary
}
