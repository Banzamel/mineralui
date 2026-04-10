import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MTopbarIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MTopbarIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="22"
                    y="44"
                    width="156"
                    height="26"
                    rx="13"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="30" y="50" width="22" height="14" rx="7" fill="var(--illustration-accent)" opacity="0.18" />
                <rect x="62" y="53" width="28" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.7" />
                <rect x="100" y="53" width="28" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.7" />
                <rect x="138" y="53" width="28" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.7" />
                <rect
                    x="88"
                    y="82"
                    width="64"
                    height="64"
                    rx="12"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="98" y="94" width="24" height="7" rx="3.5" fill="var(--illustration-accent)" opacity="0.85" />
                <rect x="98" y="108" width="42" height="6" rx="3" fill="var(--mineral-text-secondary)" opacity="0.58" />
                <rect x="98" y="120" width="36" height="6" rx="3" fill="var(--mineral-text-secondary)" opacity="0.58" />
                <circle cx="78" cy="57" r="4" fill="var(--illustration-accent)" />
            </MIllustration>
        )
    }
)
