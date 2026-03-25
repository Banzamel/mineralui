import {useState, useCallback, Children, isValidElement} from 'react'
import {Collapsible} from '../Collapsible'
import {cn} from '../../../utils/cn'
import type {AccordionProps, AccordionItemProps} from './Accordion.types'
import './Accordion.css'

export function AccordionItem(_props: AccordionItemProps) {
    return null
}

export function Accordion({
    multiple = false,
    defaultOpen,
    onChange,
    bordered = false,
    className,
    children,
    ...rest
}: AccordionProps) {
    const initialOpen = Array.isArray(defaultOpen)
        ? defaultOpen
        : defaultOpen
            ? [defaultOpen]
            : []

    const [openIds, setOpenIds] = useState<string[]>(initialOpen)

    const handleToggle = useCallback(
        (id: string, isOpen: boolean) => {
            setOpenIds((prev) => {
                let next: string[]
                if (isOpen) {
                    next = multiple ? [...prev, id] : [id]
                } else {
                    next = prev.filter((v) => v !== id)
                }
                onChange?.(next)
                return next
            })
        },
        [multiple, onChange]
    )

    const items = Children.toArray(children).filter(
        (child) => isValidElement(child) && (child.type as any) === AccordionItem
    )

    return (
        <div className={cn('accordion', bordered && 'bordered', className)} {...rest}>
            {items.map((child) => {
                if (!isValidElement<AccordionItemProps>(child)) return null
                const {id, title, children: content, disabled, fcolor} = child.props
                const isOpen = openIds.includes(id)

                return (
                    <div key={id} className={cn('accordion-item', disabled && 'disabled')}>
                        <Collapsible
                            title={title}
                            open={isOpen}
                            onToggle={disabled ? undefined : (open) => handleToggle(id, open)}
                            fcolor={fcolor}
                        >
                            {content}
                        </Collapsible>
                    </div>
                )
            })}
        </div>
    )
}
