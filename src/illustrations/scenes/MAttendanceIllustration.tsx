import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Attendance scene — clipboard with a roll-call list: each row has a name and a status icon (✓ / ✗ / ⌛).
export const MAttendanceIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MAttendanceIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                {/* Ground shadow */}
                <ellipse cx="100" cy="178" rx="62" ry="5" fill="var(--mineral-border, #3a3f47)" opacity="0.25" />

                {/* Decorative glow */}
                <ellipse cx="100" cy="100" rx="80" ry="60" fill="var(--illustration-accent)" opacity="0.05" />

                {/* Clipboard back */}
                <rect
                    x="40"
                    y="32"
                    width="120"
                    height="138"
                    rx="6"
                    fill="var(--mineral-surface, #1a1d23)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="2"
                />
                {/* Clip */}
                <rect x="84" y="22" width="32" height="14" rx="3" fill="var(--mineral-border, #3a3f47)" />
                <rect x="92" y="20" width="16" height="6" rx="1.5" fill="var(--illustration-accent)" />

                {/* Paper sheet */}
                <rect x="48" y="44" width="104" height="118" rx="3" fill="var(--mineral-text, #f5f5fa)" stroke="var(--mineral-border, #3a3f47)" strokeWidth="1" />

                {/* Header */}
                <rect x="54" y="50" width="40" height="3" rx="0.5" fill="var(--illustration-accent)" opacity="0.85" />
                <rect x="54" y="56" width="80" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.6" />

                {/* Row helper */}
                <g fontFamily="inherit" fontSize="10" fontWeight="bold">
                    {/* Row 1 — present */}
                    <rect x="54" y="68" width="92" height="12" rx="2" fill="var(--mineral-success, #22c55e)" opacity="0.08" />
                    <rect x="58" y="73" width="46" height="2.5" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />
                    <circle cx="138" cy="74" r="6" fill="var(--mineral-success, #22c55e)" opacity="0.85" />
                    <path d="M135 74 L137 76 L141 72" fill="none" stroke="var(--mineral-text, #f5f5fa)" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Row 2 — present */}
                    <rect x="54" y="84" width="92" height="12" rx="2" fill="var(--mineral-success, #22c55e)" opacity="0.08" />
                    <rect x="58" y="89" width="50" height="2.5" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />
                    <circle cx="138" cy="90" r="6" fill="var(--mineral-success, #22c55e)" opacity="0.85" />
                    <path d="M135 90 L137 92 L141 88" fill="none" stroke="var(--mineral-text, #f5f5fa)" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Row 3 — late (hourglass) */}
                    <rect x="54" y="100" width="92" height="12" rx="2" fill="var(--mineral-warning, #f59e0b)" opacity="0.08" />
                    <rect x="58" y="105" width="44" height="2.5" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />
                    <circle cx="138" cy="106" r="6" fill="var(--mineral-warning, #f59e0b)" opacity="0.85" />
                    {/* Tiny hourglass glyph */}
                    <path d="M135 103 L141 103 L138 106 L141 109 L135 109 L138 106 Z" fill="var(--mineral-text, #f5f5fa)" opacity="0.95" />

                    {/* Row 4 — absent */}
                    <rect x="54" y="116" width="92" height="12" rx="2" fill="var(--mineral-error, #ef4444)" opacity="0.08" />
                    <rect x="58" y="121" width="48" height="2.5" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />
                    <circle cx="138" cy="122" r="6" fill="var(--mineral-error, #ef4444)" opacity="0.85" />
                    <path d="M135 119 L141 125 M141 119 L135 125" stroke="var(--mineral-text, #f5f5fa)" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Row 5 — present */}
                    <rect x="54" y="132" width="92" height="12" rx="2" fill="var(--mineral-success, #22c55e)" opacity="0.08" />
                    <rect x="58" y="137" width="40" height="2.5" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />
                    <circle cx="138" cy="138" r="6" fill="var(--mineral-success, #22c55e)" opacity="0.85" />
                    <path d="M135 138 L137 140 L141 136" fill="none" stroke="var(--mineral-text, #f5f5fa)" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* Summary footer */}
                <rect x="54" y="150" width="44" height="3" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                <rect x="118" y="150" width="28" height="3" rx="0.5" fill="var(--illustration-accent)" opacity="0.85" />
            </MIllustration>
        )
    }
)
