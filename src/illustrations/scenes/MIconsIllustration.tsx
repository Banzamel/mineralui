import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MIconsIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MIconsIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <circle cx="100" cy="100" r="60" fill="var(--illustration-accent)" opacity="0.05" />
                <rect
                    x="42"
                    y="46"
                    width="42"
                    height="42"
                    rx="12"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect
                    x="92"
                    y="38"
                    width="42"
                    height="42"
                    rx="12"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect
                    x="116"
                    y="96"
                    width="42"
                    height="42"
                    rx="12"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect
                    x="58"
                    y="104"
                    width="42"
                    height="42"
                    rx="12"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <circle cx="63" cy="67" r="8" fill="var(--illustration-accent)" opacity="0.9" />
                <path
                    d="M105 58 L110 69 L122 69 L113 76 L117 87 L105 80 L93 87 L97 76 L88 69 L100 69 Z"
                    fill="var(--mineral-info)"
                    opacity="0.92"
                />
                <path d="M137 117 L145 125 L137 133 L129 125 Z" fill="var(--mineral-warning)" opacity="0.92" />
                <path d="M69 124 H78 V133 H69 Z M80 135 H89 V144 H80 Z" fill="var(--mineral-success)" opacity="0.9" />
            </MIllustration>
        )
    }
)
