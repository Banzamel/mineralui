import type {MNavbarProps} from './MNavbar.types'
import {cn} from '../../../utils/cn'
import {MContainer} from '../MContainer'
import './MNavbar.css'

// Render a horizontal app or site navigation shell with container alignment.
export function MNavbar({
    container = 'content',
    padded = true,
    bordered = true,
    sticky = false,
    tone = 'surface',
    justify = 'between',
    wrap = false,
    className,
    children,
    ...rest
}: MNavbarProps) {
    return (
        <nav className={cn('navbar', tone, bordered && 'bordered', sticky && 'sticky', className)} {...rest}>
            <MContainer size={container} padded={padded} className="container">
                <div className={cn('inner', justify, wrap && 'wrap')}>{children}</div>
            </MContainer>
        </nav>
    )
}
