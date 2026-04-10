import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MSidebarIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MSidebarIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="28"
                    y="30"
                    width="50"
                    height="140"
                    rx="14"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="42" y="46" width="22" height="22" rx="7" fill="var(--illustration-accent)" opacity="0.18" />
                <rect x="42" y="82" width="22" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.66" />
                <rect x="42" y="100" width="22" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.52" />
                <rect x="42" y="118" width="22" height="8" rx="4" fill="var(--illustration-accent)" opacity="0.62" />
                <rect
                    x="92"
                    y="50"
                    width="80"
                    height="22"
                    rx="10"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="102" y="57" width="30" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.6" />
                <rect x="92" y="86" width="80" height="34" rx="12" fill="var(--illustration-accent)" opacity="0.08" />
                <rect x="102" y="98" width="46" height="7" rx="3.5" fill="var(--illustration-accent)" opacity="0.8" />
                <rect
                    x="92"
                    y="130"
                    width="80"
                    height="22"
                    rx="10"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect
                    x="102"
                    y="137"
                    width="30"
                    height="8"
                    rx="4"
                    fill="var(--mineral-text-secondary)"
                    opacity="0.56"
                />
            </MIllustration>
        )
    }
)
