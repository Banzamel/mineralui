import type {ReactNode} from 'react'
import {
    MBoltIcon,
    MErrorIcon,
    MInfoIcon,
    MMoonIcon,
    MNeutralIcon,
    MSunIcon,
    MSuccessIcon,
    MWarningIcon,
} from '../../icons'

const statusIcons: Record<string, ReactNode> = {
    success: <MSuccessIcon />,
    warning: <MWarningIcon />,
    error: <MErrorIcon />,
    info: <MInfoIcon />,
    primary: <MInfoIcon />,
    neutral: <MNeutralIcon />,
    light: <MSunIcon />,
    dark: <MMoonIcon />,
    news: <MBoltIcon />,
}

export function getStatusIcon(color?: string) {
    if (!color) {
        return statusIcons.info
    }

    return statusIcons[color] ?? statusIcons.info
}
