import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Speaking scene — microphone on a stand with a speech bubble carrying a small waveform.
export const MSpeakingIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MSpeakingIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                {/* Ground shadow */}
                <ellipse cx="100" cy="178" rx="60" ry="5" fill="var(--mineral-border, #3a3f47)" opacity="0.25" />

                {/* Decorative glow */}
                <ellipse cx="100" cy="100" rx="80" ry="60" fill="var(--illustration-accent)" opacity="0.05" />

                {/* Mic stand base */}
                <ellipse cx="100" cy="170" rx="28" ry="6" fill="var(--mineral-border, #3a3f47)" />
                <rect x="96" y="120" width="8" height="48" rx="1" fill="var(--mineral-border, #3a3f47)" />

                {/* Mic body */}
                <rect
                    x="80"
                    y="56"
                    width="40"
                    height="68"
                    rx="20"
                    fill="var(--mineral-surface, #1a1d23)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="2"
                />
                {/* Mic grille pattern */}
                <g fill="var(--illustration-accent)" opacity="0.5">
                    <circle cx="90" cy="72" r="1.6" />
                    <circle cx="100" cy="72" r="1.6" />
                    <circle cx="110" cy="72" r="1.6" />
                    <circle cx="90" cy="82" r="1.6" />
                    <circle cx="100" cy="82" r="1.6" />
                    <circle cx="110" cy="82" r="1.6" />
                    <circle cx="90" cy="92" r="1.6" />
                    <circle cx="100" cy="92" r="1.6" />
                    <circle cx="110" cy="92" r="1.6" />
                    <circle cx="90" cy="102" r="1.6" />
                    <circle cx="100" cy="102" r="1.6" />
                    <circle cx="110" cy="102" r="1.6" />
                </g>
                {/* Mic shadow on grille — accent rim */}
                <rect x="80" y="116" width="40" height="8" rx="3" fill="var(--illustration-accent)" opacity="0.85" />

                {/* Speech bubble — top-right */}
                <path
                    d="M132 38 L172 38 C176.4 38 180 41.6 180 46 L180 70 C180 74.4 176.4 78 172 78 L150 78 L142 88 L142 78 L132 78 C127.6 78 124 74.4 124 70 L124 46 C124 41.6 127.6 38 132 38 Z"
                    fill="var(--mineral-surface, #1a1d23)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="2"
                />
                {/* Mini waveform inside bubble */}
                <g stroke="var(--illustration-accent)" strokeLinecap="round">
                    <line x1="134" y1="58" x2="134" y2="58" strokeWidth="3" opacity="0.4" />
                    <line x1="140" y1="53" x2="140" y2="63" strokeWidth="3" opacity="0.6" />
                    <line x1="146" y1="48" x2="146" y2="68" strokeWidth="3" opacity="0.85" />
                    <line x1="152" y1="50" x2="152" y2="66" strokeWidth="3" opacity="0.75" />
                    <line x1="158" y1="46" x2="158" y2="70" strokeWidth="3" />
                    <line x1="164" y1="50" x2="164" y2="66" strokeWidth="3" opacity="0.75" />
                    <line x1="170" y1="55" x2="170" y2="61" strokeWidth="3" opacity="0.5" />
                </g>
            </MIllustration>
        )
    }
)
