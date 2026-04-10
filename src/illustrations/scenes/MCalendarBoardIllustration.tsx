import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

export const MCalendarBoardIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MCalendarBoardIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                <rect
                    x="22"
                    y="30"
                    width="156"
                    height="120"
                    rx="14"
                    fill="var(--mineral-surface)"
                    stroke="var(--mineral-border)"
                    strokeWidth="2"
                />
                <path d="M22 64 H178" stroke="var(--mineral-border)" strokeWidth="2" />
                <path d="M74 64 V150" stroke="var(--mineral-border)" />
                <path d="M126 64 V150" stroke="var(--mineral-border)" />
                <path d="M22 94 H178" stroke="var(--mineral-border)" />
                <path d="M22 122 H178" stroke="var(--mineral-border)" />
                <rect x="30" y="72" width="36" height="16" rx="6" fill="var(--illustration-accent)" opacity="0.16" />
                <rect x="82" y="100" width="36" height="16" rx="6" fill="var(--illustration-accent)" opacity="0.75" />
                <rect x="134" y="128" width="34" height="14" rx="6" fill="var(--mineral-info)" opacity="0.18" />
                <circle cx="124" cy="108" r="5" fill="var(--mineral-dark-color)" />
            </MIllustration>
        )
    }
)
