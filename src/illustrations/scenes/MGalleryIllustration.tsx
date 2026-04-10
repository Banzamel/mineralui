import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MGalleryIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MGalleryIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="30"
                    y="38"
                    width="52"
                    height="52"
                    rx="10"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect
                    x="92"
                    y="38"
                    width="78"
                    height="52"
                    rx="10"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect
                    x="30"
                    y="100"
                    width="78"
                    height="58"
                    rx="10"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect
                    x="118"
                    y="100"
                    width="52"
                    height="58"
                    rx="10"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <circle cx="55" cy="60" r="8" fill="var(--illustration-accent)" opacity="0.22" />
                <path
                    d="M40 78 L56 62 L70 74 L82 64"
                    stroke="var(--illustration-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                />
                <path
                    d="M102 78 L120 58 L138 68 L158 52"
                    stroke="var(--illustration-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                />
                <path
                    d="M44 144 L60 124 L82 136 L96 116"
                    stroke="var(--illustration-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                />
                <path
                    d="M128 144 L140 126 L154 136 L164 120"
                    stroke="var(--illustration-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                />
            </MIllustration>
        )
    }
)
