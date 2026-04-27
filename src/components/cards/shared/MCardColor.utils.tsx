import {Children, cloneElement, isValidElement} from 'react'
import type {ReactElement, ReactNode} from 'react'
import type {MColor} from '../../../theme'
import {MButton} from '../../controls'

function getElementTypeName(type: unknown) {
    if (typeof type === 'string') {
        return type
    }

    if (typeof type === 'function') {
        const component = type as {displayName?: string; name?: string}

        return component.displayName ?? component.name ?? ''
    }

    if (typeof type === 'object' && type !== null) {
        const maybeType = type as {
            displayName?: string
            render?: {displayName?: string; name?: string}
        }

        return maybeType.displayName ?? maybeType.render?.displayName ?? maybeType.render?.name ?? ''
    }

    return ''
}

function shouldInheritColor(element: ReactElement) {
    const props = element.props as {color?: unknown}

    if (props.color !== undefined) {
        return false
    }

    if (element.type === MButton) {
        return true
    }

    const typeName = getElementTypeName(element.type)

    return typeName.startsWith('M') && typeName.endsWith('Icon')
}

export function tintCardChildren(children: ReactNode, color?: MColor): ReactNode {
    if (!color) {
        return children
    }

    return Children.map(children, (child) => {
        if (!isValidElement(child)) {
            return child
        }

        const element = child as ReactElement<{children?: ReactNode}>
        const props = element.props
        const tintedChildren = props.children ? tintCardChildren(props.children, color) : props.children
        const nextProps: Record<string, unknown> = {}

        if (tintedChildren !== props.children) {
            nextProps.children = tintedChildren
        }

        if (shouldInheritColor(element)) {
            nextProps.color = color
        }

        if (!Object.keys(nextProps).length) {
            return element
        }

        return cloneElement(element, nextProps)
    })
}
