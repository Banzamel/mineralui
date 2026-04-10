import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MQrCodeIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MQrCodeIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="40"
                    y="40"
                    width="120"
                    height="120"
                    rx="16"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="54" y="54" width="24" height="24" rx="5" fill="var(--illustration-accent)" />
                <rect x="122" y="54" width="24" height="24" rx="5" fill="var(--illustration-accent)" />
                <rect x="54" y="122" width="24" height="24" rx="5" fill="var(--illustration-accent)" />
                <rect x="90" y="58" width="10" height="10" rx="2" fill="var(--mineral-text-secondary)" />
                <rect x="104" y="58" width="10" height="10" rx="2" fill="var(--mineral-text-secondary)" />
                <rect x="90" y="76" width="24" height="10" rx="3" fill="var(--mineral-text-secondary)" />
                <rect x="90" y="94" width="10" height="10" rx="2" fill="var(--illustration-accent)" opacity="0.8" />
                <rect x="104" y="94" width="10" height="10" rx="2" fill="var(--mineral-text-secondary)" />
                <rect x="122" y="94" width="10" height="10" rx="2" fill="var(--illustration-accent)" opacity="0.8" />
                <rect x="90" y="112" width="28" height="10" rx="3" fill="var(--mineral-text-secondary)" />
            </MIllustration>
        )
    }
)
