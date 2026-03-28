import type {MSubNavProps} from './MSubNav.types'
import {cn} from '../../../utils/cn'
import './MSubNav.css'

// Render a horizontal secondary navigation bar below the main header.
export function MSubNav({items, active, onChange, component, className, ...rest}: MSubNavProps) {
    return (
        <nav className={cn('subnav', className)} {...rest}>
            {items.map((item) => {
                const Tag = component ?? (item.href ? 'a' : 'button')
                const isActive = active === item.value
                const linkProps = item.href ? {href: item.href} : {}

                return (
                    <Tag
                        key={item.value}
                        className={cn('subnav item', isActive && 'active', item.disabled && 'disabled')}
                        onClick={item.disabled ? undefined : () => onChange?.(item.value)}
                        aria-disabled={item.disabled || undefined}
                        {...linkProps}
                    >
                        {item.icon && <span className="subnav icon">{item.icon}</span>}
                        <span className="subnav label">{item.label}</span>
                    </Tag>
                )
            })}
        </nav>
    )
}
