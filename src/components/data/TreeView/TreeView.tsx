import {useState} from 'react'
import type {TreeViewProps, TreeItemProps, TreeNode} from './TreeView.types'
import {cn} from '../../../utils/cn'
import './TreeView.css'

const folderClosed = (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
        <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H7.71L6.85 3.36A1.5 1.5 0 0 0 5.79 3H1.5z" />
    </svg>
)

const folderOpen = (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
        <path d="M.54 3.87L.5 3a2 2 0 0 1 2-2h3.67a2 2 0 0 1 1.41.59l.83.82H14.5a2 2 0 0 1 2 2v1.1a.5.5 0 0 1 0 .1V12a2 2 0 0 1-2 2H1.5a2 2 0 0 1-2-2V4.5a.5.5 0 0 1 0-.13V4a.5.5 0 0 1 .04-.13zM2.5 2a1 1 0 0 0-1 1v.5h4.38l-.73-.73A1 1 0 0 0 4.44 2.5H2.5zM1.5 5v7a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V5.5h-13V5z" />
    </svg>
)

const fileIcon = (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0H4zm5.5 1.5v2a1 1 0 0 0 1 1h2L9.5 1.5z" />
    </svg>
)

const extColors: Record<string, string> = {
    ts: '#3178c6',
    tsx: '#3178c6',
    js: '#f0db4f',
    jsx: '#f0db4f',
    css: '#264de4',
    html: '#e34c26',
    json: '#a8b34f',
    md: '#519aba',
    png: '#a074c4',
    jpg: '#a074c4',
    jpeg: '#a074c4',
    svg: '#ffb13b',
    gif: '#a074c4',
}

function getFileExtension(label: string): string | null {
    const dot = label.lastIndexOf('.')
    if (dot < 1) return null
    return label.slice(dot + 1).toLowerCase()
}

function getDefaultIcon(node: TreeNode, isExpanded: boolean, fileIcons: boolean) {
    if (node.icon) return node.icon
    if (!fileIcons) return null

    const hasChildren = node.children && node.children.length > 0
    if (hasChildren) return isExpanded ? folderOpen : folderClosed

    const ext = getFileExtension(node.label)
    const color = ext ? extColors[ext] : undefined

    return <span style={color ? {color} : undefined}>{fileIcon}</span>
}

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
    showLines,
    fileIcons,
}: TreeItemProps) {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedIds.has(node.id)
    const isSelected = selectedId === node.id
    const icon = getDefaultIcon(node, isExpanded, !!fileIcons)

    return (
        <li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
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
                <span className="toggle">
                    {hasChildren && expandable ? (
                        <span className={cn('arrow', isExpanded && 'expanded')}>▶</span>
                    ) : (
                        <span className="spacer" />
                    )}
                </span>
                {icon && <span className="icon">{icon}</span>}
                <span className="label">{node.label}</span>
            </div>
            {hasChildren && isExpanded && (
                <ul
                    className="list"
                    role="group"
                    style={showLines ? {'--line-left': `${level * indent + 17}px`} as React.CSSProperties : undefined}
                >
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
                            showLines={showLines}
                            fileIcons={fileIcons}
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
    showLines = true,
    fileIcons = true,
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
        <div className={cn('tree-view', showLines && 'show-lines', className)} {...rest}>
            <ul className="list" role="tree">
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
                        showLines={showLines}
                        fileIcons={fileIcons}
                    />
                ))}
            </ul>
        </div>
    )
}
