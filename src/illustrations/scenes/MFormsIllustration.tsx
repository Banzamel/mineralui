import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MFormsIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MFormsIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="40"
                    y="32"
                    width="120"
                    height="128"
                    rx="18"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="54" y="48" width="42" height="7" rx="3.5" fill="var(--mineral-text-secondary)" opacity="0.6" />
                <rect x="54" y="64" width="92" height="16" rx="8" fill="var(--illustration-accent)" opacity="0.16" />
                <rect x="54" y="92" width="92" height="16" rx="8" fill="var(--mineral-info)" opacity="0.12" />
                <rect x="54" y="120" width="56" height="16" rx="8" fill="var(--mineral-success)" opacity="0.12" />
                <circle cx="144" cy="128" r="12" fill="var(--illustration-accent)" opacity="0.18" />
                <path
                    d="M138 128 L142 132 L150 123"
                    stroke="var(--illustration-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <ellipse cx="100" cy="174" rx="44" ry="8" fill="var(--illustration-accent)" opacity="0.06" />
            </MIllustration>
        )
    }
)
