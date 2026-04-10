import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MTimeAgoIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MTimeAgoIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <circle
                    cx="100"
                    cy="86"
                    r="42"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <circle cx="100" cy="86" r="5" fill="var(--illustration-accent)" />
                <path d="M100 86 L100 62" stroke="var(--illustration-accent)" strokeWidth="5" strokeLinecap="round" />
                <path d="M100 86 L122 98" stroke="var(--illustration-accent)" strokeWidth="5" strokeLinecap="round" />
                <rect x="58" y="142" width="84" height="14" rx="7" fill="var(--illustration-accent)" opacity="0.14" />
                <text
                    x="100"
                    y="153"
                    textAnchor="middle"
                    fontFamily="inherit"
                    fontSize="12"
                    fontWeight="700"
                    fill="var(--illustration-accent)"
                >
                    2 min ago
                </text>
            </MIllustration>
        )
    }
)
