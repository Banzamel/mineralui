import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Team scene — group of avatar circles with connection lines.
export const MTeamIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(function MTeamIllustration(props, ref) {
    return (
        <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
            {/* Connection lines */}
            <line
                x1="100"
                y1="80"
                x2="56"
                y2="120"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.4"
            />
            <line
                x1="100"
                y1="80"
                x2="144"
                y2="120"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.4"
            />
            <line
                x1="100"
                y1="80"
                x2="100"
                y2="148"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.4"
            />
            <line
                x1="56"
                y1="120"
                x2="100"
                y2="148"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.25"
            />
            <line
                x1="144"
                y1="120"
                x2="100"
                y2="148"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.25"
            />

            {/* Central / lead avatar — larger */}
            <circle
                cx="100"
                cy="68"
                r="22"
                fill="var(--mineral-surface, #1a1d23)"
                stroke="var(--illustration-accent)"
                strokeWidth="2.5"
            />
            <circle cx="100" cy="62" r="8" fill="var(--illustration-accent)" opacity="0.5" />
            <path
                d="M84 80 C84 72 92 68 100 68 C108 68 116 72 116 80"
                fill="var(--illustration-accent)"
                opacity="0.3"
            />

            {/* Left avatar */}
            <circle
                cx="56"
                cy="120"
                r="18"
                fill="var(--mineral-surface, #1a1d23)"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="2"
            />
            <circle cx="56" cy="115" r="6" fill="var(--mineral-info, #3b82f6)" opacity="0.5" />
            <path
                d="M44 128 C44 122 50 118 56 118 C62 118 68 122 68 128"
                fill="var(--mineral-info, #3b82f6)"
                opacity="0.25"
            />

            {/* Right avatar */}
            <circle
                cx="144"
                cy="120"
                r="18"
                fill="var(--mineral-surface, #1a1d23)"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="2"
            />
            <circle cx="144" cy="115" r="6" fill="var(--mineral-success, #22c55e)" opacity="0.5" />
            <path
                d="M132 128 C132 122 138 118 144 118 C150 118 156 122 156 128"
                fill="var(--mineral-success, #22c55e)"
                opacity="0.25"
            />

            {/* Bottom avatar */}
            <circle
                cx="100"
                cy="156"
                r="18"
                fill="var(--mineral-surface, #1a1d23)"
                stroke="var(--mineral-border, #3a3f47)"
                strokeWidth="2"
            />
            <circle cx="100" cy="151" r="6" fill="var(--mineral-warning, #f59e0b)" opacity="0.5" />
            <path
                d="M88 164 C88 158 94 154 100 154 C106 154 112 158 112 164"
                fill="var(--mineral-warning, #f59e0b)"
                opacity="0.25"
            />

            {/* Status dots */}
            <circle cx="116" cy="84" r="4" fill="var(--mineral-success, #22c55e)" opacity="0.8" />
            <circle cx="68" cy="132" r="3" fill="var(--mineral-success, #22c55e)" opacity="0.7" />
            <circle cx="156" cy="106" r="3" fill="var(--mineral-border, #3a3f47)" opacity="0.5" />
            <circle cx="112" cy="170" r="3" fill="var(--mineral-success, #22c55e)" opacity="0.6" />

            {/* Decorative particles */}
            <circle cx="36" cy="80" r="1.5" fill="var(--illustration-accent)" opacity="0.2" />
            <circle cx="164" cy="76" r="1.5" fill="var(--illustration-accent)" opacity="0.2" />
            <circle cx="36" cy="156" r="1" fill="var(--illustration-accent)" opacity="0.15" />
            <circle cx="164" cy="160" r="1" fill="var(--illustration-accent)" opacity="0.15" />

            {/* Glow */}
            <ellipse cx="100" cy="110" rx="60" ry="50" fill="var(--illustration-accent)" opacity="0.03" />
        </MIllustration>
    )
})
