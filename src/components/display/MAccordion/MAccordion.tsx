import {useState, useCallback, Children, isValidElement} from 'react'
import {MCollapsible} from '../MCollapsible'
import {cn} from '../../../utils/cn'
import type {MAccordionProps, MAccordionItemProps} from './MAccordion.types'
import './MAccordion.css'

export function MAccordionItem(_props: MAccordionItemProps) {
    return null
}

export function MAccordion({
    multiple = false,
    defaultOpen,
    onChange,
    bordered = false,
    color,
    className,
    children,
    ...rest
}: MAccordionProps) {
    const initialOpen = Array.isArray(defaultOpen) ? defaultOpen : defaultOpen ? [defaultOpen] : []

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
        (child) => isValidElement(child) && (child.type as any) === MAccordionItem
    )

    return (
        <div className={cn('accordion', bordered && 'bordered', className)} {...rest}>
            {items.map((child) => {
                if (!isValidElement<MAccordionItemProps>(child)) return null
                const {id, title, children: content, disabled, color: itemColor} = child.props
                const isOpen = openIds.includes(id)

                return (
                    <div key={id} className={cn('accordion-item', disabled && 'disabled')}>
                        <MCollapsible
                            title={title}
                            open={isOpen}
                            onToggle={disabled ? undefined : (open) => handleToggle(id, open)}
                            color={itemColor ?? color}
                        >
                            {content}
                        </MCollapsible>
                    </div>
                )
            })}
        </div>
    )
}
