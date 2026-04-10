import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Chat scene — conversation bubbles with typing indicator.
export const MChatIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(function MChatIllustration(props, ref) {
    return (
        <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
            {/* Left bubble (received) */}
            <rect
                x="32"
                y="40"
                width="100"
                height="42"
                rx="12"
                fill="var(--mineral-surface, #1a1d23)"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="1.5"
            />
            <path
                d="M44 82 L36 94 L52 82"
                fill="var(--mineral-surface, #1a1d23)"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="1.5"
            />
            <path d="M45 82 L38 92 L52 82" fill="var(--mineral-surface, #1a1d23)" />
            <rect
                x="44"
                y="52"
                width="56"
                height="3"
                rx="1"
                fill="var(--mineral-text-secondary, #6b7280)"
                opacity="0.5"
            />
            <rect x="44" y="60" width="72" height="3" rx="1" fill="var(--mineral-border, #3a3f47)" opacity="0.4" />
            <rect x="44" y="68" width="44" height="3" rx="1" fill="var(--mineral-border, #3a3f47)" opacity="0.3" />

            {/* Right bubble (sent) */}
            <rect x="68" y="100" width="100" height="36" rx="12" fill="var(--illustration-accent)" opacity="0.2" />
            <rect
                x="68"
                y="100"
                width="100"
                height="36"
                rx="12"
                fill="none"
                stroke="var(--illustration-accent)"
                strokeWidth="1.5"
                opacity="0.5"
            />
            <path d="M156 136 L164 148 L148 136" fill="var(--illustration-accent)" opacity="0.2" />
            <path
                d="M156 136 L164 148 L148 136"
                fill="none"
                stroke="var(--illustration-accent)"
                strokeWidth="1.5"
                opacity="0.5"
            />
            <rect x="80" y="112" width="64" height="3" rx="1" fill="var(--illustration-accent)" opacity="0.5" />
            <rect x="80" y="120" width="48" height="3" rx="1" fill="var(--illustration-accent)" opacity="0.35" />

            {/* Typing indicator bubble */}
            <rect
                x="32"
                y="156"
                width="60"
                height="28"
                rx="14"
                fill="var(--mineral-surface, #1a1d23)"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="1.5"
            />
            <circle cx="50" cy="170" r="3.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.5" />
            <circle cx="62" cy="170" r="3.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.4" />
            <circle cx="74" cy="170" r="3.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.3" />

            {/* Avatar left */}
            <circle
                cx="36"
                cy="28"
                r="10"
                fill="var(--mineral-surface, #1a1d23)"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="1.5"
            />
            <circle cx="36" cy="25" r="3.5" fill="var(--mineral-info, #3b82f6)" opacity="0.5" />
            <path d="M30 34 C30 30 33 28 36 28 C39 28 42 30 42 34" fill="var(--mineral-info, #3b82f6)" opacity="0.25" />

            {/* Avatar right */}
            <circle
                cx="164"
                cy="92"
                r="10"
                fill="var(--mineral-surface, #1a1d23)"
                stroke="var(--illustration-accent)"
                strokeWidth="1.5"
                opacity="0.6"
            />
            <circle cx="164" cy="89" r="3.5" fill="var(--illustration-accent)" opacity="0.4" />
            <path
                d="M158 98 C158 94 161 92 164 92 C167 92 170 94 170 98"
                fill="var(--illustration-accent)"
                opacity="0.2"
            />

            {/* Time stamps */}
            <rect
                x="108"
                y="86"
                width="20"
                height="2"
                rx="1"
                fill="var(--mineral-text-secondary, #6b7280)"
                opacity="0.25"
            />
            <rect
                x="72"
                y="150"
                width="20"
                height="2"
                rx="1"
                fill="var(--mineral-text-secondary, #6b7280)"
                opacity="0.25"
            />

            {/* Glow */}
            <ellipse cx="100" cy="110" rx="56" ry="50" fill="var(--illustration-accent)" opacity="0.03" />
        </MIllustration>
    )
})
