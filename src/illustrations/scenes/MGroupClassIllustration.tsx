import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Group class scene — teacher in the centre with a semicircle of seven students around.
export const MGroupClassIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MGroupClassIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                {/* Ground shadow */}
                <ellipse cx="100" cy="178" rx="80" ry="6" fill="var(--mineral-border, #3a3f47)" opacity="0.25" />

                {/* Decorative glow */}
                <ellipse cx="100" cy="100" rx="86" ry="64" fill="var(--illustration-accent)" opacity="0.06" />

                {/* Floor circle (group center) */}
                <ellipse cx="100" cy="148" rx="72" ry="14" fill="var(--mineral-surface, #1a1d23)" stroke="var(--mineral-border, #3a3f47)" strokeWidth="1.5" opacity="0.85" />

                {/* Teacher (centre, taller) */}
                <circle cx="100" cy="62" r="12" fill="var(--mineral-surface, #1a1d23)" stroke="var(--mineral-border, #3a3f47)" strokeWidth="2" />
                {/* Mortarboard */}
                <polygon points="84,62 100,56 116,62 100,68" fill="var(--illustration-accent)" opacity="0.85" />
                <line x1="116" y1="62" x2="120" y2="74" stroke="var(--illustration-accent)" strokeWidth="1.5" />
                <circle cx="120" cy="76" r="1.5" fill="var(--illustration-accent)" />
                <rect x="86" y="74" width="28" height="40" rx="6" fill="var(--mineral-surface, #1a1d23)" stroke="var(--mineral-border, #3a3f47)" strokeWidth="2" />
                <rect x="92" y="82" width="16" height="3" rx="1" fill="var(--illustration-accent)" opacity="0.85" />

                {/* Students arranged in a semicircle (7 figures) */}
                <g>
                    {/* Far left */}
                    <circle cx="28" cy="118" r="7" fill="var(--mineral-surface, #1a1d23)" stroke="var(--mineral-info, #3b82f6)" strokeWidth="1.5" />
                    <rect x="21" y="125" width="14" height="22" rx="3" fill="var(--mineral-info, #3b82f6)" opacity="0.7" />

                    {/* Left */}
                    <circle cx="52" cy="106" r="7" fill="var(--mineral-surface, #1a1d23)" stroke="var(--mineral-success, #22c55e)" strokeWidth="1.5" />
                    <rect x="45" y="113" width="14" height="22" rx="3" fill="var(--mineral-success, #22c55e)" opacity="0.7" />

                    {/* Mid-left */}
                    <circle cx="74" cy="100" r="7" fill="var(--mineral-surface, #1a1d23)" stroke="var(--mineral-warning, #f59e0b)" strokeWidth="1.5" />
                    <rect x="67" y="107" width="14" height="22" rx="3" fill="var(--mineral-warning, #f59e0b)" opacity="0.7" />

                    {/* Mid-right */}
                    <circle cx="126" cy="100" r="7" fill="var(--mineral-surface, #1a1d23)" stroke="var(--mineral-news, #8b5cf6)" strokeWidth="1.5" />
                    <rect x="119" y="107" width="14" height="22" rx="3" fill="var(--mineral-news, #8b5cf6)" opacity="0.7" />

                    {/* Right */}
                    <circle cx="148" cy="106" r="7" fill="var(--mineral-surface, #1a1d23)" stroke="var(--illustration-accent)" strokeWidth="1.5" />
                    <rect x="141" y="113" width="14" height="22" rx="3" fill="var(--illustration-accent)" opacity="0.7" />

                    {/* Far right */}
                    <circle cx="172" cy="118" r="7" fill="var(--mineral-surface, #1a1d23)" stroke="var(--mineral-error, #ef4444)" strokeWidth="1.5" />
                    <rect x="165" y="125" width="14" height="22" rx="3" fill="var(--mineral-error, #ef4444)" opacity="0.7" />

                    {/* Front-centre (just in front of teacher, smaller) */}
                    <circle cx="100" cy="138" r="6" fill="var(--mineral-surface, #1a1d23)" stroke="var(--illustration-accent)" strokeWidth="1.5" />
                    <rect x="94" y="144" width="12" height="18" rx="3" fill="var(--illustration-accent)" opacity="0.85" />
                </g>
            </MIllustration>
        )
    }
)
