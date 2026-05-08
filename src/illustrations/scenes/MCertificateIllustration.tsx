import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Certificate scene — diploma with a wax seal and a ribbon.
export const MCertificateIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MCertificateIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                {/* Ground shadow */}
                <ellipse cx="100" cy="180" rx="74" ry="5" fill="var(--mineral-border, #3a3f47)" opacity="0.25" />

                {/* Decorative glow */}
                <ellipse cx="100" cy="100" rx="86" ry="62" fill="var(--illustration-accent)" opacity="0.06" />

                {/* Diploma — paper */}
                <rect
                    x="22"
                    y="38"
                    width="156"
                    height="108"
                    rx="6"
                    fill="var(--mineral-text, #f5f5fa)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="2.5"
                />
                {/* Inner double border (ornament) */}
                <rect x="30" y="46" width="140" height="92" rx="3" fill="none" stroke="var(--illustration-accent)" strokeWidth="1.5" opacity="0.85" />
                <rect x="34" y="50" width="132" height="84" rx="2" fill="none" stroke="var(--illustration-accent)" strokeWidth="0.8" opacity="0.6" />

                {/* Decorative corner flourishes */}
                <g fill="var(--illustration-accent)" opacity="0.6">
                    <circle cx="38" cy="54" r="2" />
                    <circle cx="162" cy="54" r="2" />
                    <circle cx="38" cy="130" r="2" />
                    <circle cx="162" cy="130" r="2" />
                </g>

                {/* Title */}
                <rect x="58" y="60" width="84" height="6" rx="1" fill="var(--illustration-accent)" />
                {/* "Awarded to" */}
                <rect x="74" y="74" width="52" height="3" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.7" />
                {/* Recipient name (script-style underline) */}
                <rect x="50" y="84" width="100" height="6" rx="1" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.55" />
                <line x1="50" y1="92" x2="150" y2="92" stroke="var(--mineral-border, #3a3f47)" strokeWidth="0.8" />

                {/* Body lines */}
                <rect x="58" y="100" width="84" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.55" />
                <rect x="58" y="106" width="76" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.5" />
                <rect x="58" y="112" width="80" height="2" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.5" />

                {/* Signature line */}
                <line x1="48" y1="126" x2="100" y2="126" stroke="var(--mineral-border, #3a3f47)" strokeWidth="0.8" />
                <rect x="58" y="118" width="32" height="6" rx="1" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.5" />

                {/* Wax seal (bottom-right of diploma) */}
                <g transform="translate(140 122)">
                    {/* Ribbon tails (two strands) */}
                    <polygon points="-6,8 -2,30 6,22 8,32 14,8" fill="var(--illustration-accent)" opacity="0.85" />
                    <polygon points="-6,8 -2,30 6,22 8,32 14,8" fill="none" stroke="var(--mineral-border, #3a3f47)" strokeWidth="1" />
                    {/* Seal */}
                    <circle cx="4" cy="6" r="14" fill="var(--mineral-error, #ef4444)" stroke="var(--mineral-border, #3a3f47)" strokeWidth="1.5" />
                    <circle cx="4" cy="6" r="9" fill="none" stroke="var(--mineral-text, #f5f5fa)" strokeWidth="1" opacity="0.85" />
                    {/* Star center */}
                    <polygon points="4,0 5.5,4 10,4 6.5,7 8,11 4,8.5 0,11 1.5,7 -2,4 2.5,4" fill="var(--mineral-text, #f5f5fa)" opacity="0.9" />
                </g>

                {/* Top-centre ribbon */}
                <g transform="translate(100 38)">
                    <polygon points="-12,0 -8,18 0,12 8,18 12,0" fill="var(--illustration-accent)" opacity="0.55" />
                    <polygon points="-12,0 -8,18 0,12 8,18 12,0" fill="none" stroke="var(--mineral-border, #3a3f47)" strokeWidth="1" />
                </g>
            </MIllustration>
        )
    }
)
