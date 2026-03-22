import type {MHeaderProps} from './MHeader.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {Container} from '../Container'
import './MHeader.css'

// Render a reusable page header shell aligned to a shared container.
export function MHeader({
    container = 'wide',
    padded = true,
    bordered = true,
    sticky = false,
    tone = 'surface',
    fcolor,
    className,
    children,
    ...rest
}: MHeaderProps) {
    return (
        <header
            className={cn(
                'header',
                tone,
                ...getAppearanceClassNames({fcolor}),
                bordered && 'bordered',
                sticky && 'sticky',
                className
            )}
            {...rest}
        >
            <Container size={container} padded={padded} className="inner">
                {children}
            </Container>
        </header>
    )
}
