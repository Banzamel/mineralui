import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MCookieConsentIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MCookieConsentIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <circle
                    cx="84"
                    cy="102"
                    r="44"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <circle cx="118" cy="76" r="16" fill="var(--mineral-page-bg)" />
                <circle cx="72" cy="88" r="6" fill="var(--mineral-page-bg)" />
                <circle cx="98" cy="118" r="5" fill="var(--mineral-page-bg)" />
                <circle cx="66" cy="118" r="4" fill="var(--mineral-page-bg)" />
                <rect
                    x="116"
                    y="112"
                    width="50"
                    height="34"
                    rx="10"
                    fill="var(--illustration-accent)"
                    opacity="0.16"
                    stroke="var(--illustration-accent)"
                    strokeWidth="2"
                />
                <path
                    d="M130 128 L138 136 L152 120"
                    stroke="var(--illustration-accent)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </MIllustration>
        )
    }
)
