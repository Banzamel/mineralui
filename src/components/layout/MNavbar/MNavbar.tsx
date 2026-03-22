import type {MNavbarProps} from './MNavbar.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {Container} from '../Container'
import './MNavbar.css'

// Render a horizontal app or site navigation shell with container alignment.
export function MNavbar({
    container = 'content',
    padded = true,
    bordered = true,
    sticky = false,
    tone = 'surface',
    fcolor,
    justify = 'between',
    align = 'center',
    wrap = false,
    className,
    children,
    ...rest
}: MNavbarProps) {
    return (
        <nav
            className={cn(
                'navbar',
                tone,
                ...getAppearanceClassNames({fcolor}),
                bordered && 'bordered',
                sticky && 'sticky',
                className
            )}
            {...rest}
        >
            <Container size={container} padded={padded} className="container">
                <div className={cn('inner', justify, align, wrap && 'wrap')}>{children}</div>
            </Container>
        </nav>
    )
}
