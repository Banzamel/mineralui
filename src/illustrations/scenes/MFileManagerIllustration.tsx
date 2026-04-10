import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MFileManagerIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MFileManagerIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="22"
                    y="34"
                    width="156"
                    height="116"
                    rx="14"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <rect x="22" y="34" width="46" height="116" rx="14" fill="var(--illustration-accent)" opacity="0.08" />
                <path d="M68 34 V150" stroke="var(--mineral-border)" strokeWidth="2" />
                <rect x="34" y="56" width="22" height="8" rx="4" fill="var(--illustration-accent)" opacity="0.75" />
                <rect x="34" y="74" width="18" height="6" rx="3" fill="var(--mineral-text-secondary)" opacity="0.7" />
                <rect x="34" y="88" width="16" height="6" rx="3" fill="var(--mineral-text-secondary)" opacity="0.7" />
                <rect x="84" y="54" width="34" height="26" rx="8" fill="var(--illustration-accent)" opacity="0.14" />
                <rect x="126" y="54" width="34" height="26" rx="8" fill="var(--mineral-info)" opacity="0.12" />
                <rect x="84" y="92" width="76" height="10" rx="5" fill="var(--mineral-text-secondary)" opacity="0.18" />
                <rect
                    x="84"
                    y="110"
                    width="58"
                    height="10"
                    rx="5"
                    fill="var(--mineral-text-secondary)"
                    opacity="0.18"
                />
                <rect x="84" y="128" width="68" height="10" rx="5" fill="var(--illustration-accent)" opacity="0.16" />
            </MIllustration>
        )
    }
)
