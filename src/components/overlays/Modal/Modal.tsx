import {useEffect} from 'react'
import type {MouseEvent} from 'react'
import type {ModalProps} from './Modal.types'
import {Portal} from '../../primitives/Portal'
import {Card, CardBody, CardFooter, CardHeader} from '../../cards/Card'
import {cn} from '../../../utils/cn'
import './Modal.css'

// Render blocking overlay content for dense details and mobile-friendly dialogs.
export function Modal({
    open,
    onClose,
    title,
    description,
    footer,
    size = 'md',
    closeOnBackdrop = true,
    closeOnEscape = true,
    className,
    children,
    ...rest
}: ModalProps) {
    useEffect(() => {
        if (!open || !closeOnEscape) {
            return
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [closeOnEscape, onClose, open])

    useEffect(() => {
        if (!open) {
            return
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [open])

    if (!open) {
        return null
    }

    const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
        if (!closeOnBackdrop) {
            return
        }

        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    return (
        <Portal>
            <div className={'modal-backdrop'} onMouseDown={handleBackdropClick}>
                <div className={'modal-shell'}>
                    <Card
                        className={cn('modal', size, className)}
                        role={'dialog'}
                        aria-modal={'true'}
                        aria-labelledby={title ? 'mineral-modal-title' : undefined}
                        {...rest}
                    >
                        {(title || description) && (
                            <CardHeader>
                                {title && (
                                    <div id={'mineral-modal-title'} className={'modal-title'}>
                                        {title}
                                    </div>
                                )}
                                {description && <div className={'modal-description'}>{description}</div>}
                            </CardHeader>
                        )}
                        <CardBody>{children}</CardBody>
                        {footer && <CardFooter>{footer}</CardFooter>}
                    </Card>
                </div>
            </div>
        </Portal>
    )
}
