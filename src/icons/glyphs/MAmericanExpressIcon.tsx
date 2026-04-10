import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MAmericanExpressIcon = forwardRef<SVGSVGElement, MIconProps>(function MAmericanExpressIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="6.2" width="17" height="11.6" rx="2" />
            <path d="M6.2 10.2h2.55l.9 2.35.9-2.35h2.55M6.75 13.8h5.7M14.3 10.2h3.15M14.3 12h2.55M14.3 13.8h3.15" />
        </MIcon>
    )
})

export const MAmericanExpressColorIcon = forwardRef<SVGSVGElement, MIconProps>(
    function MAmericanExpressColorIcon(props, ref) {
        return (
            <MIcon ref={ref} {...props}>
                <rect x="3.5" y="6.2" width="17" height="11.6" rx="2" fill="#1f72cd" stroke="none" />
                <path
                    d="M6.2 10.2h2.55l.9 2.35.9-2.35h2.55M6.75 13.8h5.7M14.3 10.2h3.15M14.3 12h2.55M14.3 13.8h3.15"
                    stroke="#f8fafc"
                />
                <rect x="3.5" y="6.2" width="17" height="11.6" rx="2" />
            </MIcon>
        )
    }
)
