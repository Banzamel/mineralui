import {useState} from 'react'
import type {TreeViewProps, TreeItemProps, TreeNode} from './TreeView.types'
import {cn} from '../../../utils/cn'
import './TreeView.css'

function TreeItem({
    node,
    level,
    expandable,
    selectable,
    expandedIds,
    selectedId,
    onToggle,
    onSelect,
    indent,
}: TreeItemProps) {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedIds.has(node.id)
    const isSelected = selectedId === node.id

    return (
        <li className="tree-item-wrapper" role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
            <div
                className={cn(
                    'tree-item',
                    isSelected && 'selected',
                    node.disabled && 'disabled',
                    selectable && !node.disabled && 'selectable'
                )}
                style={{paddingLeft: level * indent}}
                onClick={() => {
                    if (node.disabled) return
                    if (hasChildren && expandable) onToggle(node.id)
                    if (selectable) onSelect?.(node.id, node)
                }}
            >
                <span className="tree-item-toggle">
                    {hasChildren && expandable ? (
                        <span className={cn('tree-item-arrow', isExpanded && 'expanded')}>▶</span>
                    ) : (
                        <span className="tree-item-spacer" />
                    )}
                </span>
                {node.icon && <span className="tree-item-icon">{node.icon}</span>}
                <span className="tree-item-label">{node.label}</span>
            </div>
            {hasChildren && isExpanded && (
                <ul className="tree-list" role="group">
                    {node.children!.map((child) => (
                        <TreeItem
                            key={child.id}
                            node={child}
                            level={level + 1}
                            expandable={expandable}
                            selectable={selectable}
                            expandedIds={expandedIds}
                            selectedId={selectedId}
                            onToggle={onToggle}
                            onSelect={onSelect}
                            indent={indent}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

export function TreeView({
    items,
    expandable = true,
    selectable = false,
    defaultExpanded = [],
    expanded: controlledExpanded,
    onExpandChange,
    selected: controlledSelected,
    onSelect,
    indent = 20,
    className,
    ...rest
}: TreeViewProps) {
    const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpanded)
    const [internalSelected, setInternalSelected] = useState<string | null>(null)

    const expandedArr = controlledExpanded ?? internalExpanded
    const expandedIds = new Set(expandedArr)
    const selectedId = controlledSelected !== undefined ? controlledSelected : internalSelected

    function handleToggle(id: string) {
        const next = expandedIds.has(id)
            ? expandedArr.filter((e) => e !== id)
            : [...expandedArr, id]
        if (onExpandChange) onExpandChange(next)
        else setInternalExpanded(next)
    }

    function handleSelect(id: string, node: TreeNode) {
        if (onSelect) onSelect(id, node)
        else setInternalSelected(id)
    }

    return (
        <div className={cn('tree-view', className)} {...rest}>
            <ul className="tree-list" role="tree">
                {items.map((item) => (
                    <TreeItem
                        key={item.id}
                        node={item}
                        level={0}
                        expandable={expandable}
                        selectable={selectable}
                        expandedIds={expandedIds}
                        selectedId={selectedId}
                        onToggle={handleToggle}
                        onSelect={handleSelect}
                        indent={indent}
                    />
                ))}
            </ul>
        </div>
    )
}
