import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Receipt scene — long thin payment receipt with zig-zag bottom edge, line items, total, and a signature scribble.
export const MReceiptIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MReceiptIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                {/* Ground shadow */}
                <ellipse cx="100" cy="184" rx="46" ry="5" fill="var(--mineral-border, #3a3f47)" opacity="0.25" />

                {/* Decorative glow */}
                <ellipse cx="100" cy="100" rx="80" ry="62" fill="var(--illustration-accent)" opacity="0.05" />

                {/* Receipt body — paper with zig-zag bottom */}
                <path
                    d="M64 18 L136 18 L136 162 L130 158 L124 162 L118 158 L112 162 L106 158 L100 162 L94 158 L88 162 L82 158 L76 162 L70 158 L64 162 Z"
                    fill="var(--mineral-text, #f5f5fa)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                {/* Top zig-zag (mirror) */}
                <path
                    d="M64 18 L70 22 L76 18 L82 22 L88 18 L94 22 L100 18 L106 22 L112 18 L118 22 L124 18 L130 22 L136 18"
                    fill="none"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />

                {/* Header */}
                <rect x="74" y="32" width="52" height="4" rx="1" fill="var(--illustration-accent)" />
                <rect x="78" y="42" width="44" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.6" />

                {/* Subtle dashed divider */}
                <line x1="72" y1="50" x2="128" y2="50" stroke="var(--mineral-border, #3a3f47)" strokeWidth="0.6" strokeDasharray="2 2" />

                {/* Line items (label + price) */}
                <g>
                    <rect x="74" y="58" width="32" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />
                    <rect x="116" y="58" width="14" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />

                    <rect x="74" y="66" width="38" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />
                    <rect x="116" y="66" width="14" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />

                    <rect x="74" y="74" width="28" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />
                    <rect x="116" y="74" width="14" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />

                    <rect x="74" y="82" width="34" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />
                    <rect x="116" y="82" width="14" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" />
                </g>

                {/* Subtotal divider */}
                <line x1="72" y1="92" x2="128" y2="92" stroke="var(--mineral-border, #3a3f47)" strokeWidth="0.6" strokeDasharray="2 2" />

                {/* Total */}
                <rect x="74" y="98" width="22" height="3" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.85" />
                <rect x="110" y="97.5" width="20" height="4" rx="0.5" fill="var(--illustration-accent)" />

                {/* Paid badge */}
                <g transform="translate(100 116)">
                    <rect x="-18" y="-7" width="36" height="14" rx="3" fill="var(--mineral-success, #22c55e)" opacity="0.85" />
                    <path d="M-9 0 L-5 4 L7 -4" fill="none" stroke="var(--mineral-text, #f5f5fa)" strokeWidth="1.8" strokeLinecap="round" />
                </g>

                {/* Signature scribble */}
                <rect x="74" y="132" width="28" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.6" />
                <path
                    d="M74 144 C82 138 88 150 96 142 C104 134 110 148 122 142"
                    fill="none"
                    stroke="var(--illustration-accent)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <line x1="74" y1="148" x2="126" y2="148" stroke="var(--mineral-border, #3a3f47)" strokeWidth="0.6" />
            </MIllustration>
        )
    }
)
