import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Masonry scene - uneven content cards arranged like a responsive image wall.
export const MMasonryIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MMasonryIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <ellipse cx="100" cy="170" rx="66" ry="10" fill="var(--mineral-border, #3a3f47)" opacity="0.18" />

                <rect
                    x="24"
                    y="34"
                    width="42"
                    height="66"
                    rx="8"
                    fill="var(--mineral-surface, #1a1d23)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="1.5"
                />
                <rect x="30" y="42" width="30" height="24" rx="5" fill="var(--illustration-accent)" opacity="0.22" />
                <rect
                    x="30"
                    y="74"
                    width="20"
                    height="4"
                    rx="2"
                    fill="var(--mineral-text-secondary, #6b7280)"
                    opacity="0.7"
                />
                <rect x="30" y="82" width="26" height="4" rx="2" fill="var(--mineral-border, #3a3f47)" opacity="0.8" />
                <rect x="30" y="90" width="16" height="4" rx="2" fill="var(--illustration-accent)" opacity="0.5" />

                <rect
                    x="76"
                    y="28"
                    width="50"
                    height="40"
                    rx="8"
                    fill="var(--mineral-surface, #1a1d23)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="1.5"
                />
                <rect x="82" y="36" width="38" height="10" rx="4" fill="var(--illustration-accent)" opacity="0.18" />
                <circle cx="92" cy="54" r="3" fill="var(--mineral-info, #3b82f6)" opacity="0.8" />
                <rect
                    x="100"
                    y="51"
                    width="18"
                    height="5"
                    rx="2"
                    fill="var(--mineral-text-secondary, #6b7280)"
                    opacity="0.7"
                />
                <rect
                    x="82"
                    y="60"
                    width="30"
                    height="3"
                    rx="1.5"
                    fill="var(--mineral-border, #3a3f47)"
                    opacity="0.8"
                />

                <rect
                    x="136"
                    y="24"
                    width="40"
                    height="82"
                    rx="8"
                    fill="var(--mineral-surface, #1a1d23)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="1.5"
                />
                <rect x="142" y="32" width="28" height="34" rx="6" fill="var(--mineral-info, #3b82f6)" opacity="0.12" />
                <path
                    d="M146 60 L154 50 L160 56 L168 44"
                    fill="none"
                    stroke="var(--illustration-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                />
                <rect
                    x="142"
                    y="74"
                    width="18"
                    height="4"
                    rx="2"
                    fill="var(--mineral-text-secondary, #6b7280)"
                    opacity="0.7"
                />
                <rect x="142" y="82" width="24" height="4" rx="2" fill="var(--mineral-border, #3a3f47)" opacity="0.8" />
                <rect x="142" y="90" width="14" height="4" rx="2" fill="var(--illustration-accent)" opacity="0.45" />

                <rect
                    x="24"
                    y="110"
                    width="42"
                    height="34"
                    rx="8"
                    fill="var(--mineral-surface, #1a1d23)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="1.5"
                />
                <rect x="30" y="118" width="30" height="8" rx="4" fill="var(--illustration-accent)" opacity="0.16" />
                <rect x="30" y="132" width="24" height="4" rx="2" fill="var(--mineral-border, #3a3f47)" opacity="0.8" />

                <rect
                    x="76"
                    y="78"
                    width="50"
                    height="74"
                    rx="8"
                    fill="var(--mineral-surface, #1a1d23)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="1.5"
                />
                <rect x="82" y="86" width="38" height="24" rx="6" fill="var(--illustration-accent)" opacity="0.16" />
                <circle cx="92" cy="98" r="4" fill="var(--mineral-warning, #f59e0b)" opacity="0.75" />
                <rect
                    x="100"
                    y="95"
                    width="14"
                    height="5"
                    rx="2"
                    fill="var(--mineral-text-secondary, #6b7280)"
                    opacity="0.7"
                />
                <rect x="82" y="118" width="22" height="4" rx="2" fill="var(--mineral-border, #3a3f47)" opacity="0.8" />
                <rect x="82" y="126" width="30" height="4" rx="2" fill="var(--mineral-border, #3a3f47)" opacity="0.8" />
                <rect x="82" y="134" width="18" height="4" rx="2" fill="var(--illustration-accent)" opacity="0.45" />

                <ellipse cx="100" cy="100" rx="74" ry="58" fill="var(--illustration-accent)" opacity="0.035" />
            </MIllustration>
        )
    }
)
