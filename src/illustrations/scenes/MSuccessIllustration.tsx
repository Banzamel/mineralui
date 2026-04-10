import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Success scene — checkmark circle with confetti particles.
export const MSuccessIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MSuccessIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                {/* Outer glow ring */}
                <circle cx="100" cy="100" r="62" fill="var(--illustration-accent)" opacity="0.06" />
                <circle cx="100" cy="100" r="48" fill="var(--illustration-accent)" opacity="0.04" />

                {/* Main circle */}
                <circle
                    cx="100"
                    cy="100"
                    r="44"
                    fill="var(--mineral-surface, #1a1d23)"
                    stroke="var(--illustration-accent)"
                    strokeWidth="3"
                />

                {/* Inner ring */}
                <circle
                    cx="100"
                    cy="100"
                    r="36"
                    fill="none"
                    stroke="var(--illustration-accent)"
                    strokeWidth="1"
                    opacity="0.2"
                />

                {/* Checkmark */}
                <polyline
                    points="80,100 94,114 120,86"
                    fill="none"
                    stroke="var(--illustration-accent)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Confetti — accent */}
                <rect
                    x="44"
                    y="48"
                    width="6"
                    height="3"
                    rx="1"
                    fill="var(--illustration-accent)"
                    opacity="0.6"
                    transform="rotate(-20 47 49)"
                />
                <rect
                    x="148"
                    y="56"
                    width="5"
                    height="3"
                    rx="1"
                    fill="var(--illustration-accent)"
                    opacity="0.5"
                    transform="rotate(15 150 57)"
                />
                <rect
                    x="52"
                    y="142"
                    width="6"
                    height="3"
                    rx="1"
                    fill="var(--illustration-accent)"
                    opacity="0.4"
                    transform="rotate(30 55 143)"
                />
                <rect
                    x="142"
                    y="136"
                    width="5"
                    height="3"
                    rx="1"
                    fill="var(--illustration-accent)"
                    opacity="0.5"
                    transform="rotate(-10 144 137)"
                />

                {/* Confetti — secondary colors */}
                <circle cx="60" cy="66" r="2" fill="var(--mineral-warning, #f59e0b)" opacity="0.5" />
                <circle cx="150" cy="86" r="1.5" fill="var(--mineral-info, #3b82f6)" opacity="0.5" />
                <circle cx="46" cy="112" r="1.5" fill="var(--mineral-success, #22c55e)" opacity="0.5" />
                <circle cx="156" cy="120" r="2" fill="var(--mineral-warning, #f59e0b)" opacity="0.4" />
                <circle cx="72" cy="152" r="1.5" fill="var(--mineral-info, #3b82f6)" opacity="0.4" />
                <circle cx="132" cy="156" r="1.5" fill="var(--mineral-success, #22c55e)" opacity="0.4" />

                {/* Sparkle top */}
                <line
                    x1="100"
                    y1="28"
                    x2="100"
                    y2="36"
                    stroke="var(--illustration-accent)"
                    strokeWidth="1.5"
                    opacity="0.4"
                    strokeLinecap="round"
                />
                <line
                    x1="96"
                    y1="32"
                    x2="104"
                    y2="32"
                    stroke="var(--illustration-accent)"
                    strokeWidth="1.5"
                    opacity="0.4"
                    strokeLinecap="round"
                />
            </MIllustration>
        )
    }
)
