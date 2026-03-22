import {useId, useMemo, useState} from 'react'
import type {KeyboardEvent} from 'react'
import type {MTabsItem, MTabsProps} from './MTabs.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './MTabs.css'

interface MTabsTriggerProps {
    item: MTabsItem
    isActive: boolean
    tabId: string
    panelId: string
    clickEffect: MTabsProps['clickEffect']
    rippleColor: string | undefined
    onSelect: (value: string) => void
}

// Keep the tab trigger behavior isolated from the list and panel rendering.
function MTabsTrigger({item, isActive, tabId, panelId, clickEffect, rippleColor, onSelect}: MTabsTriggerProps) {
    const {effectClassName, effectLayer, handlePointerDown, triggerEffect} = useInteractionEffect<HTMLButtonElement>({
        effect: clickEffect,
        disabled: item.disabled,
        centered: true,
        color: rippleColor,
    })

    return (
        <button
            type="button"
            id={tabId}
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            disabled={item.disabled}
            className={cn('tabs-trigger', isActive && 'active', item.disabled && 'disabled', effectClassName)}
            onPointerDown={handlePointerDown}
            onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                    triggerEffect(event.currentTarget)
                }
            }}
            onClick={() => onSelect(item.value)}
        >
            {effectLayer}
            {item.icon && <span className="tabs-icon">{item.icon}</span>}
            <span className="tabs-label">{item.label}</span>
        </button>
    )
}

export function MTabs({
    items,
    value,
    defaultValue,
    onValueChange,
    variant = 'underline',
    orientation = 'horizontal',
    size = 'md',
    fullWidth = false,
    fcolor,
    showPanels = true,
    panelClassName,
    clickEffect = 'ripple',
    rippleColor,
    className,
    ...rest
}: MTabsProps) {
    // Pick the first enabled item when the caller does not control the active tab.
    const fallbackValue = useMemo(
        () => defaultValue ?? items.find((item) => !item.disabled)?.value ?? '',
        [defaultValue, items]
    )
    const [internalValue, setInternalValue] = useState(fallbackValue)
    const activeValue = value ?? internalValue
    const activeItem = items.find((item) => item.value === activeValue) ?? items[0]
    const baseId = useId()

    // Support both controlled and uncontrolled tab state.
    function selectTab(nextValue: string) {
        if (value === undefined) {
            setInternalValue(nextValue)
        }
        onValueChange?.(nextValue)
    }

    // Re-map keyboard navigation depending on the rendered orientation.
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        const enabledItems = items.filter((item) => !item.disabled)
        const currentIndex = enabledItems.findIndex((item) => item.value === activeItem?.value)

        if (currentIndex === -1) {
            return
        }

        const nextKeys = orientation === 'vertical' ? ['ArrowDown'] : ['ArrowRight', 'ArrowDown']
        const previousKeys = orientation === 'vertical' ? ['ArrowUp'] : ['ArrowLeft', 'ArrowUp']

        if (nextKeys.includes(event.key)) {
            event.preventDefault()
            const nextItem = enabledItems[(currentIndex + 1) % enabledItems.length]
            selectTab(nextItem.value)
        }

        if (previousKeys.includes(event.key)) {
            event.preventDefault()
            const nextItem = enabledItems[(currentIndex - 1 + enabledItems.length) % enabledItems.length]
            selectTab(nextItem.value)
        }
    }

    return (
        <div
            className={cn(
                'tabs',
                variant,
                orientation,
                size,
                ...getAppearanceClassNames({fcolor}),
                fullWidth && 'full-width',
                className
            )}
            {...rest}
        >
            <div className="tabs-list" role="tablist" aria-orientation={orientation} onKeyDown={handleKeyDown}>
                {items.map((item) => {
                    const isActive = item.value === activeItem?.value
                    const tabId = `${baseId}-${item.value}-tab`
                    const panelId = `${baseId}-${item.value}-panel`

                    return (
                        <MTabsTrigger
                            key={item.value}
                            item={item}
                            isActive={isActive}
                            tabId={tabId}
                            panelId={panelId}
                            clickEffect={clickEffect}
                            rippleColor={rippleColor}
                            onSelect={selectTab}
                        />
                    )
                })}
            </div>

            {showPanels && activeItem?.content !== undefined && (
                <div
                    key={activeItem.value}
                    id={`${baseId}-${activeItem.value}-panel`}
                    role="tabpanel"
                    aria-labelledby={`${baseId}-${activeItem.value}-tab`}
                    className={cn('tabs-panel', panelClassName)}
                >
                    {activeItem.content}
                </div>
            )}
        </div>
    )
}
