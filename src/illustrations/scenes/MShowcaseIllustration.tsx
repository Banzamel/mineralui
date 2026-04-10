import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MShowcaseIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MShowcaseIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="24"
                    y="58"
                    width="52"
                    height="78"
                    rx="12"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect
                    x="74"
                    y="40"
                    width="52"
                    height="96"
                    rx="12"
                    fill="var(--mineral-surface)"
                    stroke="var(--illustration-accent)"
                    strokeWidth="2"
                />
                <rect
                    x="124"
                    y="58"
                    width="52"
                    height="78"
                    rx="12"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="34" y="70" width="32" height="26" rx="8" fill="var(--illustration-accent)" opacity="0.14" />
                <rect x="84" y="54" width="32" height="34" rx="8" fill="var(--illustration-accent)" opacity="0.2" />
                <rect x="134" y="70" width="32" height="26" rx="8" fill="var(--illustration-accent)" opacity="0.14" />
                <rect x="84" y="98" width="20" height="6" rx="3" fill="var(--illustration-accent)" />
                <rect
                    x="84"
                    y="110"
                    width="30"
                    height="5"
                    rx="2.5"
                    fill="var(--mineral-text-secondary)"
                    opacity="0.7"
                />
                <ellipse cx="100" cy="148" rx="60" ry="10" fill="var(--illustration-accent)" opacity="0.05" />
            </MIllustration>
        )
    }
)
