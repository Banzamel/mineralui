import {createPortal} from 'react-dom'
import type {MPortalProps} from './MPortal.types'

// Mount children into a detached DOM target while defaulting to document.body.
export function MPortal({children, container}: MPortalProps) {
    const target = container ?? (typeof document !== 'undefined' ? document.body : null)
    if (!target) return null
    return createPortal(children, target)
}
