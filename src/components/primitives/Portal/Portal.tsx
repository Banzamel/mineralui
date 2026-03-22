import {createPortal} from 'react-dom'
import type {PortalProps} from './Portal.types'

// Mount children into a detached DOM target while defaulting to document.body.
export function Portal({children, container}: PortalProps) {
    const target = container ?? (typeof document !== 'undefined' ? document.body : null)
    if (!target) return null
    return createPortal(children, target)
}
