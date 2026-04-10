import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MDateRangePickerIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MDateRangePickerIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="26"
                    y="44"
                    width="68"
                    height="92"
                    rx="12"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect
                    x="106"
                    y="44"
                    width="68"
                    height="92"
                    rx="12"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="26" y="44" width="68" height="18" rx="12" fill="var(--illustration-accent)" opacity="0.14" />
                <rect x="106" y="44" width="68" height="18" rx="12" fill="var(--illustration-accent)" opacity="0.14" />
                <rect x="42" y="84" width="16" height="16" rx="5" fill="var(--illustration-accent)" opacity="0.65" />
                <rect x="58" y="84" width="16" height="16" rx="0" fill="var(--illustration-accent)" opacity="0.18" />
                <rect x="74" y="84" width="16" height="16" rx="5" fill="var(--illustration-accent)" opacity="0.65" />
                <rect x="122" y="84" width="16" height="16" rx="5" fill="var(--illustration-accent)" opacity="0.65" />
                <rect x="138" y="84" width="16" height="16" rx="0" fill="var(--illustration-accent)" opacity="0.18" />
                <rect x="154" y="84" width="16" height="16" rx="5" fill="var(--illustration-accent)" opacity="0.65" />
                <path d="M94 92 H106" stroke="var(--illustration-accent)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="92" r="6" fill="var(--illustration-accent)" />
                <ellipse cx="100" cy="142" rx="48" ry="9" fill="var(--illustration-accent)" opacity="0.05" />
            </MIllustration>
        )
    }
)
