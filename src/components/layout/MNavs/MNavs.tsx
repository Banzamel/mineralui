import type {MNavsProps} from './MNavs.types'
import {cn} from '../../../utils/cn'
import {MLink} from '../../typography'
import './MNavs.css'

// Render a lightweight navigation list from data or custom children.
export function MNavs({items, orientation = 'horizontal', wrap = false, className, children, ...rest}: MNavsProps) {
    return (
        <div className={cn('navs', orientation, wrap && 'wrap', className)} {...rest}>
            {items
                ? items.map((item) => {
                      const Icon = item.icon
                      const hideLabel = item.iconOnly === true && Icon != null
                      const labelAsString = typeof item.label === 'string' ? item.label : undefined
                      const ariaLabel = hideLabel ? labelAsString : undefined
                      const linkTitle = item.title ?? (hideLabel ? labelAsString : undefined)

                      return (
                          <MLink
                              key={
                                  item.key ??
                                  item.href ??
                                  item.title?.toString() ??
                                  (labelAsString ?? '')
                              }
                              component={item.component}
                              href={item.href}
                              to={item.to}
                              target={item.target}
                              rel={item.rel}
                              title={linkTitle}
                              current={item.current}
                              disabled={item.disabled}
                              className={cn('link', hideLabel && 'icon-only', item.className)}
                              aria-label={ariaLabel}
                          >
                              {Icon ? (
                                  <span className='icon' aria-hidden={!hideLabel || undefined}>
                                      <Icon size={item.iconSize} />
                                  </span>
                              ) : null}
                              {!hideLabel ? item.label : null}
                          </MLink>
                      )
                  })
                : children}
        </div>
    )
}
