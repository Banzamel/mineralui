import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MDataTableIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MDataTableIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="24"
                    y="38"
                    width="152"
                    height="124"
                    rx="16"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="36" y="52" width="128" height="14" rx="7" fill="var(--illustration-accent)" opacity="0.14" />
                <rect x="36" y="80" width="32" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.58" />
                <rect x="76" y="80" width="28" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.58" />
                <rect x="112" y="80" width="24" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.58" />
                <rect x="144" y="80" width="20" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.58" />
                <rect x="36" y="96" width="128" height="1.5" fill="var(--mineral-border)" opacity="0.8" />
                <rect x="36" y="110" width="56" height="8" rx="4" fill="var(--illustration-accent)" opacity="0.7" />
                <rect x="108" y="110" width="36" height="8" rx="4" fill="var(--mineral-success)" opacity="0.18" />
                <rect x="36" y="128" width="48" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.52" />
                <rect x="108" y="128" width="28" height="8" rx="4" fill="var(--mineral-warning)" opacity="0.16" />
                <rect x="36" y="146" width="60" height="8" rx="4" fill="var(--mineral-text-secondary)" opacity="0.52" />
                <rect x="108" y="146" width="24" height="8" rx="4" fill="var(--mineral-info)" opacity="0.16" />
            </MIllustration>
        )
    }
)
