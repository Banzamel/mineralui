import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MI18nIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(function MI18nIllustration(props, ref) {
    return (
        <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
            <circle cx="100" cy="100" r="56" fill="var(--illustration-accent)" opacity="0.06" />
            <circle
                cx="100"
                cy="96"
                r="40"
                fill="var(--mineral-surface)"
                stroke="var(--mineral-border)"
                strokeWidth="2"
            />
            <ellipse
                cx="100"
                cy="96"
                rx="18"
                ry="40"
                stroke="var(--illustration-accent)"
                strokeWidth="2"
                opacity="0.7"
            />
            <path d="M60 96 H140" stroke="var(--illustration-accent)" strokeWidth="2" opacity="0.75" />
            <path
                d="M66 78 C80 84 120 84 134 78"
                stroke="var(--mineral-text-secondary)"
                strokeWidth="2"
                opacity="0.62"
            />
            <path
                d="M66 114 C80 108 120 108 134 114"
                stroke="var(--mineral-text-secondary)"
                strokeWidth="2"
                opacity="0.62"
            />
            <rect
                x="42"
                y="138"
                width="34"
                height="18"
                rx="6"
                fill="var(--mineral-surface)"
                stroke="var(--mineral-border)"
                strokeWidth="1.5"
            />
            <rect x="83" y="138" width="34" height="18" rx="6" fill="var(--illustration-accent)" opacity="0.16" />
            <rect
                x="124"
                y="138"
                width="34"
                height="18"
                rx="6"
                fill="var(--mineral-surface)"
                stroke="var(--mineral-border)"
                strokeWidth="1.5"
            />
            <rect x="51" y="145" width="16" height="4" rx="2" fill="var(--mineral-info)" opacity="0.8" />
            <rect x="92" y="145" width="16" height="4" rx="2" fill="var(--illustration-accent)" opacity="0.8" />
            <rect x="133" y="145" width="16" height="4" rx="2" fill="var(--mineral-success)" opacity="0.8" />
        </MIllustration>
    )
})
