import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MTaskListIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MTaskListIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="42"
                    y="34"
                    width="116"
                    height="132"
                    rx="18"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect
                    x="58"
                    y="58"
                    width="12"
                    height="12"
                    rx="4"
                    fill="var(--illustration-accent)"
                    opacity="0.16"
                    stroke="var(--illustration-accent)"
                    strokeWidth="1.5"
                />
                <path
                    d="M61 64 L64 67 L69 60"
                    stroke="var(--illustration-accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <rect x="78" y="60" width="56" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.62" />
                <rect
                    x="58"
                    y="88"
                    width="12"
                    height="12"
                    rx="4"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="1.5"
                />
                <rect x="78" y="90" width="46" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.52" />
                <rect
                    x="58"
                    y="118"
                    width="12"
                    height="12"
                    rx="4"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="1.5"
                />
                <rect x="78" y="120" width="62" height="8" rx="4" fill="var(--illustration-accent)" opacity="0.7" />
                <ellipse cx="100" cy="178" rx="38" ry="7" fill="var(--illustration-accent)" opacity="0.06" />
            </MIllustration>
        )
    }
)
