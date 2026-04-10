import type {MNavsProps} from './MNavs.types'
import {cn} from '../../../utils/cn'
import {MLink} from '../../typography'
import './MNavs.css'

// Render a lightweight navigation list from data or custom children.
export function MNavs({items, orientation = 'horizontal', wrap = false, className, children, ...rest}: MNavsProps) {
    return (
        <div className={cn('navs', orientation, wrap && 'wrap', className)} {...rest}>
            {items
                ? items.map((item) => (
                      <MLink
                          key={item.key ?? item.href ?? item.title?.toString() ?? item.label?.toString()}
                          component={item.component}
                          href={item.href}
                          to={item.to}
                          target={item.target}
                          rel={item.rel}
                          title={item.title}
                          current={item.current}
                          disabled={item.disabled}
                          className={cn('link', item.className)}
                      >
                          {item.label}
                      </MLink>
                  ))
                : children}
        </div>
    )
}
