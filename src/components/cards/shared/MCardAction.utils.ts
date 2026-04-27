import type {ElementType} from 'react'
import type {MCardActionProps} from './MCardAction.types'

interface ResolveMCardActionOptions extends Pick<MCardActionProps, 'component' | 'to' | 'href' | 'interactive'> {
    hasClickHandler?: boolean
    hasPointerHandler?: boolean
    fallbackComponent?: ElementType
}

export interface ResolvedMCardAction {
    component: ElementType
    href?: string
    to?: string
    isInteractive: boolean
    isLink: boolean
}

export function resolveMCardAction({
    component,
    to,
    href,
    interactive,
    hasClickHandler = false,
    hasPointerHandler = false,
    fallbackComponent = 'div',
}: ResolveMCardActionOptions): ResolvedMCardAction {
    const isLink = Boolean(component || href || to)
    const resolvedComponent = component ?? (isLink ? 'a' : fallbackComponent)
    const resolvedHref = href ?? (resolvedComponent === 'a' ? to : undefined)
    const resolvedTo = resolvedComponent === 'a' ? undefined : to

    return {
        component: resolvedComponent,
        href: resolvedHref,
        to: resolvedTo,
        isInteractive: Boolean(interactive || hasClickHandler || hasPointerHandler || href || to),
        isLink,
    }
}
