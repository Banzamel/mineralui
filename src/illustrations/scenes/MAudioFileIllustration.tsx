import {forwardRef} from 'react'
import {MIllustration} from '../MIllustration'
import type {MIllustrationProps} from '../MIllustration.types'

// Audio file scene — file card with a music note glyph and a waveform sitting beside it.
export const MAudioFileIllustration = forwardRef<SVGSVGElement, MIllustrationProps>(
    function MAudioFileIllustration(props, ref) {
        return (
            <MIllustration ref={ref} viewBox="0 0 200 200" {...props}>
                {/* Ground shadow */}
                <ellipse cx="100" cy="178" rx="64" ry="5" fill="var(--mineral-border, #3a3f47)" opacity="0.25" />

                {/* Decorative glow */}
                <ellipse cx="100" cy="100" rx="86" ry="60" fill="var(--illustration-accent)" opacity="0.05" />

                {/* File card */}
                <path
                    d="M40 32 L116 32 L150 66 L150 168 C150 171 148 174 146 174 L44 174 C42 174 40 171 40 168 Z"
                    fill="var(--mineral-text, #f5f5fa)"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="2"
                />
                {/* Folded corner */}
                <path
                    d="M116 32 L150 66 L116 66 Z"
                    fill="var(--mineral-border, #3a3f47)"
                    opacity="0.6"
                />
                <path
                    d="M116 32 L150 66 L116 66 Z"
                    fill="none"
                    stroke="var(--mineral-border, #3a3f47)"
                    strokeWidth="1.5"
                />

                {/* File label header */}
                <rect x="50" y="46" width="56" height="4" rx="1" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.85" />
                {/* File name + extension */}
                <rect x="50" y="56" width="44" height="3" rx="0.5" fill="var(--mineral-text-secondary, #6b7280)" opacity="0.55" />
                <rect x="98" y="56" width="14" height="3" rx="0.5" fill="var(--illustration-accent)" opacity="0.85" />

                {/* Music note glyph (centered) */}
                <g transform="translate(95 96)">
                    <line x1="0" y1="-22" x2="0" y2="14" stroke="var(--illustration-accent)" strokeWidth="3" strokeLinecap="round" />
                    <line x1="0" y1="-22" x2="22" y2="-26" stroke="var(--illustration-accent)" strokeWidth="3" strokeLinecap="round" />
                    <line x1="22" y1="-26" x2="22" y2="10" stroke="var(--illustration-accent)" strokeWidth="3" strokeLinecap="round" />
                    {/* Note heads */}
                    <ellipse cx="-4" cy="14" rx="8" ry="6" fill="var(--illustration-accent)" />
                    <ellipse cx="-4" cy="14" rx="8" ry="6" fill="none" stroke="var(--mineral-border, #3a3f47)" strokeWidth="1.5" />
                    <ellipse cx="18" cy="10" rx="8" ry="6" fill="var(--illustration-accent)" />
                    <ellipse cx="18" cy="10" rx="8" ry="6" fill="none" stroke="var(--mineral-border, #3a3f47)" strokeWidth="1.5" />
                </g>

                {/* Waveform inside file card (bottom band) */}
                <g stroke="var(--illustration-accent)" strokeLinecap="round">
                    <line x1="50" y1="148" x2="50" y2="148" strokeWidth="2.5" opacity="0.4" />
                    <line x1="56" y1="144" x2="56" y2="152" strokeWidth="2.5" opacity="0.6" />
                    <line x1="62" y1="138" x2="62" y2="158" strokeWidth="2.5" opacity="0.85" />
                    <line x1="68" y1="142" x2="68" y2="154" strokeWidth="2.5" opacity="0.7" />
                    <line x1="74" y1="134" x2="74" y2="162" strokeWidth="2.5" />
                    <line x1="80" y1="140" x2="80" y2="156" strokeWidth="2.5" opacity="0.85" />
                    <line x1="86" y1="146" x2="86" y2="150" strokeWidth="2.5" opacity="0.5" />
                    <line x1="92" y1="138" x2="92" y2="158" strokeWidth="2.5" opacity="0.85" />
                    <line x1="98" y1="142" x2="98" y2="154" strokeWidth="2.5" opacity="0.7" />
                    <line x1="104" y1="136" x2="104" y2="160" strokeWidth="2.5" />
                    <line x1="110" y1="144" x2="110" y2="152" strokeWidth="2.5" opacity="0.6" />
                    <line x1="116" y1="140" x2="116" y2="156" strokeWidth="2.5" opacity="0.85" />
                    <line x1="122" y1="148" x2="122" y2="148" strokeWidth="2.5" opacity="0.4" />
                    <line x1="128" y1="142" x2="128" y2="154" strokeWidth="2.5" opacity="0.7" />
                    <line x1="134" y1="146" x2="134" y2="150" strokeWidth="2.5" opacity="0.5" />
                    <line x1="140" y1="148" x2="140" y2="148" strokeWidth="2.5" opacity="0.4" />
                </g>

                {/* Play button overlay */}
                <circle cx="146" cy="40" r="14" fill="var(--illustration-accent)" />
                <polygon points="142,34 142,46 152,40" fill="var(--mineral-text, #f5f5fa)" />
            </MIllustration>
        )
    }
)
