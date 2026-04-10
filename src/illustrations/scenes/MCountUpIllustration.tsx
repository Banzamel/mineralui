import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MCountUpIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MCountUpIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="34"
                    y="44"
                    width="132"
                    height="90"
                    rx="16"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <text
                    x="100"
                    y="96"
                    textAnchor="middle"
                    fontFamily="inherit"
                    fontSize="28"
                    fontWeight="700"
                    fill="var(--illustration-accent)"
                >
                    12.4k
                </text>
                <path
                    d="M58 120 L82 102 L102 110 L124 84 L144 92"
                    fill="none"
                    stroke="var(--illustration-accent)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle cx="144" cy="92" r="5" fill="var(--illustration-accent)" />
                <rect x="58" y="58" width="34" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.4" />
                <ellipse cx="100" cy="150" rx="44" ry="8" fill="var(--illustration-accent)" opacity="0.05" />
            </MIllustration>
        )
    }
)
