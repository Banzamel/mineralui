import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Invoice scene — invoice document with header, line items, total and due-date stamp.
export const MInvoiceIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MInvoiceIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                {/* Ground shadow */}
                <ellipse cx="100" cy="178" rx="62" ry="5" fill="var(--mineral-border, #3a3f47)" opacity="0.25" />

                {/* Decorative glow */}
                <ellipse cx="100" cy="100" rx="80" ry="60" fill="var(--illustration-accent)" opacity="0.05" />

                {/* Invoice paper */}
                <rect
                    x="40"
                    y="24"
                    width="120"
                    height="148"
                    rx="6"
                    fill="var(--mineral-text, #f5f5fa)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="2"
                />

                {/* Header band */}
                <rect x="40" y="24" width="120" height="22" rx="6" fill="var(--illustration-accent)" />
                <rect x="40" y="38" width="120" height="8" fill="var(--illustration-accent)" />
                <rect x="50" y="30" width="50" height="6" rx="1" fill="var(--mineral-text, #f5f5fa)" opacity="0.9" />
                <rect x="124" y="30" width="26" height="3" rx="0.5" fill="var(--mineral-text, #f5f5fa)" opacity="0.7" />

                {/* From / To meta */}
                <rect x="50" y="56" width="22" height="2.5" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.85" />
                <rect x="50" y="62" width="44" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.6" />
                <rect x="50" y="67" width="36" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.5" />
                <rect x="106" y="56" width="22" height="2.5" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.85" />
                <rect x="106" y="62" width="44" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.6" />
                <rect x="106" y="67" width="32" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.5" />

                {/* Table header */}
                <rect x="50" y="80" width="100" height="6" rx="1" fill="var(--illustration-accent)" opacity="0.18" />
                <rect x="54" y="82" width="32" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.85" />
                <rect x="100" y="82" width="14" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.85" />
                <rect x="124" y="82" width="22" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.85" />

                {/* Line items */}
                <g>
                    {/* Row 1 */}
                    <rect x="54" y="92" width="40" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <rect x="100" y="92" width="10" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <rect x="124" y="92" width="22" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <line x1="50" y1="98" x2="150" y2="98" stroke="var(--mineral-border, #3a3f47)" strokeWidth="0.5" opacity="0.4" />
                    {/* Row 2 */}
                    <rect x="54" y="102" width="44" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <rect x="100" y="102" width="10" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <rect x="124" y="102" width="22" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <line x1="50" y1="108" x2="150" y2="108" stroke="var(--mineral-border, #3a3f47)" strokeWidth="0.5" opacity="0.4" />
                    {/* Row 3 */}
                    <rect x="54" y="112" width="36" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <rect x="100" y="112" width="10" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <rect x="124" y="112" width="22" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <line x1="50" y1="118" x2="150" y2="118" stroke="var(--mineral-border, #3a3f47)" strokeWidth="0.5" opacity="0.4" />
                    {/* Row 4 */}
                    <rect x="54" y="122" width="48" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <rect x="100" y="122" width="10" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                    <rect x="124" y="122" width="22" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                </g>

                {/* Total row */}
                <line x1="50" y1="134" x2="150" y2="134" stroke="var(--mineral-border, #3a3f47)" strokeWidth="1" />
                <rect x="100" y="138" width="20" height="3" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.85" />
                <rect x="124" y="138" width="26" height="4" rx="0.5" fill="var(--illustration-accent)" />

                {/* Footer / due date band */}
                <rect x="50" y="152" width="44" height="3" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.5" />
                {/* PAID / DUE stamp */}
                <g transform="translate(132 156) rotate(-12)">
                    <rect x="-22" y="-9" width="44" height="18" rx="2" fill="none" stroke="var(--mineral-error, #ef4444)" strokeWidth="2" opacity="0.85" />
                    <text x="0" y="3" textAnchor="middle" fontFamily="inherit" fontSize="10" fontWeight="bold" fill="var(--mineral-error, #ef4444)" opacity="0.95">DUE</text>
                </g>
            </MIllustration>
        )
    }
)
