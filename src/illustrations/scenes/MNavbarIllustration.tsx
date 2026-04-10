import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MNavbarIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MNavbarIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="22"
                    y="52"
                    width="156"
                    height="28"
                    rx="14"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="34" y="60" width="22" height="12" rx="6" fill="var(--illustration-accent)" opacity="0.18" />
                <rect x="68" y="62" width="28" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.62" />
                <rect x="108" y="62" width="28" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.62" />
                <rect x="148" y="62" width="18" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.62" />
                <rect x="60" y="98" width="80" height="44" rx="14" fill="var(--illustration-accent)" opacity="0.09" />
                <rect x="74" y="114" width="24" height="7" rx="3.5" fill="var(--illustration-accent)" opacity="0.8" />
                <rect
                    x="104"
                    y="114"
                    width="22"
                    height="7"
                    rx="3.5"
                    fill="var(--mineral-text-secondary)"
                    opacity="0.5"
                />
            </MIllustration>
        )
    }
)
