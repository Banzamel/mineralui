import {useEffect, useRef, useState} from 'react'
import type {CSSProperties, DragEvent, MouseEvent} from 'react'
import type {TreeViewProps, TreeItemProps, TreeNode, TreeViewContextMenuItem, TreeViewMoveEvent} from './TreeView.types'
import {cn} from '../../../utils/cn'
import {Portal} from '../../primitives/Portal'
import './TreeView.css'

type FileTypeMeta = {
    label: string
    color: string
    background: string
}

// Keep file badges simple but still readable for common extensions.
const folderClosed = (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H7.71L6.85 3.36A1.5 1.5 0 0 0 5.79 3H1.5z" />
    </svg>
)

const folderOpen = (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path d="M.54 3.87L.5 3a2 2 0 0 1 2-2h3.67a2 2 0 0 1 1.41.59l.83.82H14.5a2 2 0 0 1 2 2v1.1a.5.5 0 0 1 0 .1V12a2 2 0 0 1-2 2H1.5a2 2 0 0 1-2-2V4.5a.5.5 0 0 1 0-.13V4a.5.5 0 0 1 .04-.13zM2.5 2a1 1 0 0 0-1 1v.5h4.38l-.73-.73A1 1 0 0 0 4.44 2.5H2.5zM1.5 5v7a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V5.5h-13V5z" />
    </svg>
)

const genericFileIcon = (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
        <path
            d="M5 1.75h6.1l3.9 3.9v11.1a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 16.75v-13A2 2 0 0 1 5 1.75z"
            fill="var(--mineral-surface)"
            stroke="var(--mineral-border-strong, var(--mineral-border))"
            strokeWidth="1"
        />
        <path
            d="M11 1.75v3a1 1 0 0 0 1 1h3"
            fill="none"
            stroke="var(--mineral-border-strong, var(--mineral-border))"
            strokeWidth="1"
        />
    </svg>
)

const fileTypeMap: Record<string, FileTypeMeta> = {
    pdf: {label: 'PDF', color: '#c62828', background: '#fde8e8'},
    ts: {label: 'TS', color: '#3178c6', background: '#e8f1fb'},
    tsx: {label: 'TSX', color: '#3178c6', background: '#e8f1fb'},
    js: {label: 'JS', color: '#7a5f00', background: '#fff7c2'},
    jsx: {label: 'JSX', color: '#7a5f00', background: '#fff7c2'},
    css: {label: 'CSS', color: '#264de4', background: '#e6edff'},
    scss: {label: 'CSS', color: '#bf4b8a', background: '#fdebf4'},
    html: {label: 'HTML', color: '#e34c26', background: '#fff0ea'},
    json: {label: 'JSON', color: '#6b7a1b', background: '#f3f8d8'},
    md: {label: 'MD', color: '#0f7490', background: '#e6f7fb'},
    txt: {label: 'TXT', color: '#475569', background: '#eef2f7'},
    csv: {label: 'CSV', color: '#0f766e', background: '#e5fbf6'},
    zip: {label: 'ZIP', color: '#7c3aed', background: '#f0e8ff'},
    svg: {label: 'SVG', color: '#c97a00', background: '#fff3d8'},
    png: {label: 'IMG', color: '#7c3aed', background: '#f2eaff'},
    jpg: {label: 'IMG', color: '#7c3aed', background: '#f2eaff'},
    jpeg: {label: 'IMG', color: '#7c3aed', background: '#f2eaff'},
    gif: {label: 'IMG', color: '#7c3aed', background: '#f2eaff'},
    webp: {label: 'IMG', color: '#7c3aed', background: '#f2eaff'},
}

// Read the file extension once so icon logic stays predictable.
function getFileExtension(label: string): string | null {
    const dot = label.lastIndexOf('.')
    if (dot < 1) return null
    return label.slice(dot + 1).toLowerCase()
}

// Treat explicit folders and nodes with children as directory-like.
function isFolderNode(node: TreeNode) {
    return node.kind === 'folder' || Boolean(node.children?.length)
}

// Map the extension to a small label and color pair.
function getFileTypeMeta(label: string): FileTypeMeta | null {
    const ext = getFileExtension(label)
    if (!ext) return null

    return (
        fileTypeMap[ext] ?? {
            label: ext.slice(0, 3).toUpperCase(),
            color: '#475569',
            background: '#eef2f7',
        }
    )
}

// Draw a tiny file badge when the node does not provide a custom icon.
function renderFileIcon(label: string) {
    const meta = getFileTypeMeta(label)

    if (!meta) {
        return genericFileIcon
    }

    return (
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            <path
                d="M5 1.75h6.1l3.9 3.9v11.1a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 16.75v-13A2 2 0 0 1 5 1.75z"
                fill="var(--mineral-surface)"
                stroke="var(--mineral-border-strong, var(--mineral-border))"
                strokeWidth="1"
            />
            <path
                d="M11 1.75v3a1 1 0 0 0 1 1h3"
                fill="none"
                stroke="var(--mineral-border-strong, var(--mineral-border))"
                strokeWidth="1"
            />
            <rect x="4.5" y="10.25" width="11" height="5.25" rx="1.6" fill={meta.background} />
            <text
                x="10"
                y="14"
                textAnchor="middle"
                fontSize="4"
                fontWeight="700"
                fontFamily="var(--mineral-font-family-sans, sans-serif)"
                fill={meta.color}
            >
                {meta.label}
            </text>
        </svg>
    )
}

// Prefer custom icons first, then fall back to folder or file visuals.
function getDefaultIcon(node: TreeNode, isExpanded: boolean, fileIcons: boolean) {
    if (node.icon) return node.icon
    if (!fileIcons) return null

    if (isFolderNode(node)) return isExpanded ? folderOpen : folderClosed

    return renderFileIcon(node.label)
}

// Cache nodes and descendants so drag-drop validation stays fast.
function buildTreeLookup(items: TreeNode[]) {
    const nodeMap = new Map<string, TreeNode>()
    const descendants = new Map<string, Set<string>>()

    function walk(node: TreeNode) {
        nodeMap.set(node.id, node)

        const childIds = new Set<string>()

        for (const child of node.children ?? []) {
            childIds.add(child.id)

            const nestedIds = walk(child)
            nestedIds.forEach((id) => childIds.add(id))
        }

        descendants.set(node.id, childIds)
        return childIds
    }

    items.forEach(walk)

    return {nodeMap, descendants}
}

// Keep the context menu inside the viewport.
function clampMenuPosition(x: number, y: number) {
    if (typeof window === 'undefined') {
        return {x, y}
    }

    return {
        x: Math.max(8, Math.min(x, window.innerWidth - 220)),
        y: Math.max(8, Math.min(y, window.innerHeight - 16)),
    }
}

// Render one visible row and recurse into children when expanded.
function TreeItem({
    node,
    level,
    expandable,
    selectable,
    expandedIds,
    selectedId,
    draggedId,
    dropTargetId,
    onToggle,
    onSelect,
    indent,
    showLines,
    fileIcons,
    draggable,
    canDropOnNode,
    onContextMenu,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
}: TreeItemProps) {
    const hasChildren = isFolderNode(node)
    const isExpanded = expandedIds.has(node.id)
    const isSelected = selectedId === node.id
    const isDragging = draggedId === node.id
    const isDropTarget = dropTargetId === node.id
    const canDrop = canDropOnNode?.(node)
    const icon = getDefaultIcon(node, isExpanded, !!fileIcons)

    return (
        <li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
            <div
                className={cn(
                    'item',
                    isSelected && 'selected',
                    node.disabled && 'disabled',
                    selectable && !node.disabled && 'selectable',
                    draggable && !node.disabled && 'draggable',
                    isDragging && 'dragging',
                    canDrop && 'can-drop',
                    isDropTarget && 'drop-target'
                )}
                style={{paddingLeft: level * indent}}
                draggable={draggable && !node.disabled}
                onClick={() => {
                    if (node.disabled) return
                    if (hasChildren && expandable) onToggle(node.id)
                    if (selectable) onSelect?.(node.id, node)
                }}
                onContextMenu={(event) => onContextMenu?.(event, node)}
                onDragStart={(event) => onDragStart?.(event, node)}
                onDragOver={(event) => onDragOver?.(event, node)}
                onDrop={(event) => onDrop?.(event, node)}
                onDragEnd={onDragEnd}
                aria-grabbed={draggable && !node.disabled ? isDragging : undefined}
            >
                <span className="toggle">
                    {hasChildren && expandable ? (
                        <span className={cn('arrow', isExpanded && 'expanded')}>{'>'}</span>
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
                    style={showLines ? ({'--line-left': `${level * indent + 17}px`} as CSSProperties) : undefined}
                >
                    {(node.children ?? []).map((child) => (
                        <TreeItem
                            key={child.id}
                            node={child}
                            level={level + 1}
                            expandable={expandable}
                            selectable={selectable}
                            expandedIds={expandedIds}
                            selectedId={selectedId}
                            draggedId={draggedId}
                            dropTargetId={dropTargetId}
                            onToggle={onToggle}
                            onSelect={onSelect}
                            indent={indent}
                            showLines={showLines}
                            fileIcons={fileIcons}
                            draggable={draggable}
                            canDropOnNode={canDropOnNode}
                            onContextMenu={onContextMenu}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            onDragEnd={onDragEnd}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

// Render a file tree with selection, context actions and folder moves.
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
    draggable = false,
    canDrop,
    onMove,
    contextMenuItems,
    onContextMenuAction,
    className,
    ...rest
}: TreeViewProps) {
    const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpanded)
    const [internalSelected, setInternalSelected] = useState<string | null>(null)
    const [draggedId, setDraggedId] = useState<string | null>(null)
    const [dropTargetId, setDropTargetId] = useState<string | null>(null)
    const [menu, setMenu] = useState<{
        node: TreeNode
        items: TreeViewContextMenuItem[]
        x: number
        y: number
    } | null>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const expandedArr = controlledExpanded ?? internalExpanded
    const expandedIds = new Set(expandedArr)
    const selectedId = controlledSelected !== undefined ? controlledSelected : internalSelected
    const {nodeMap, descendants} = buildTreeLookup(items)
    const draggedNode = draggedId ? (nodeMap.get(draggedId) ?? null) : null

    useEffect(() => {
        if (!menu) return

        function closeMenu(event?: Event) {
            if (event && menuRef.current && menuRef.current.contains(event.target as Node)) {
                return
            }

            setMenu(null)
        }

        function handleKey(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setMenu(null)
            }
        }

        document.addEventListener('mousedown', closeMenu)
        document.addEventListener('scroll', closeMenu, true)
        window.addEventListener('resize', closeMenu)
        document.addEventListener('keydown', handleKey)

        return () => {
            document.removeEventListener('mousedown', closeMenu)
            document.removeEventListener('scroll', closeMenu, true)
            window.removeEventListener('resize', closeMenu)
            document.removeEventListener('keydown', handleKey)
        }
    }, [menu])

    function handleToggle(id: string) {
        const next = expandedIds.has(id) ? expandedArr.filter((e) => e !== id) : [...expandedArr, id]
        if (onExpandChange) onExpandChange(next)
        else setInternalExpanded(next)
    }

    function handleSelect(id: string, node: TreeNode) {
        if (onSelect) onSelect(id, node)
        else setInternalSelected(id)
    }

    function closeDrag() {
        setDraggedId(null)
        setDropTargetId(null)
    }

    function isValidDropTarget(targetNode: TreeNode) {
        if (!draggedNode || !draggable || !onMove) return false
        if (targetNode.disabled || !isFolderNode(targetNode)) return false
        if (targetNode.id === draggedNode.id) return false
        if (descendants.get(draggedNode.id)?.has(targetNode.id)) return false

        return canDrop ? canDrop(draggedNode, targetNode) : true
    }

    function handleContextMenu(event: MouseEvent<HTMLDivElement>, node: TreeNode) {
        if (!contextMenuItems || node.disabled) return

        const items = contextMenuItems(node).filter(Boolean)
        if (!items.length) return

        event.preventDefault()
        handleSelect(node.id, node)

        const pos = clampMenuPosition(event.clientX, event.clientY)
        setMenu({
            node,
            items,
            x: pos.x,
            y: pos.y,
        })
    }

    function handleDragStart(event: DragEvent<HTMLDivElement>, node: TreeNode) {
        if (!draggable || node.disabled) return

        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/plain', node.id)
        setMenu(null)
        setDraggedId(node.id)
    }

    function handleDragOver(event: DragEvent<HTMLDivElement>, targetNode: TreeNode) {
        if (!isValidDropTarget(targetNode)) return

        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
        setDropTargetId(targetNode.id)
    }

    function handleDrop(event: DragEvent<HTMLDivElement>, targetNode: TreeNode) {
        event.preventDefault()

        if (!draggedNode || !isValidDropTarget(targetNode)) {
            closeDrag()
            return
        }

        onMove?.({
            draggedId: draggedNode.id,
            draggedNode,
            targetId: targetNode.id,
            targetNode,
        } satisfies TreeViewMoveEvent)

        if (expandable && !expandedIds.has(targetNode.id)) {
            handleToggle(targetNode.id)
        }

        closeDrag()
    }

    return (
        <div className={cn('tree', showLines && 'lines', className)} {...rest}>
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
                        draggedId={draggedId}
                        dropTargetId={dropTargetId}
                        onToggle={handleToggle}
                        onSelect={handleSelect}
                        indent={indent}
                        showLines={showLines}
                        fileIcons={fileIcons}
                        draggable={draggable}
                        canDropOnNode={isValidDropTarget}
                        onContextMenu={handleContextMenu}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onDragEnd={closeDrag}
                    />
                ))}
            </ul>
            {menu && (
                <Portal>
                    <div ref={menuRef} className="tree-menu" style={{top: menu.y, left: menu.x}} role="menu">
                        {menu.items.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className={cn('action', item.color, item.disabled && 'disabled')}
                                role="menuitem"
                                disabled={item.disabled}
                                onClick={() => {
                                    if (item.disabled) return
                                    onContextMenuAction?.(item.id, menu.node)
                                    setMenu(null)
                                }}
                            >
                                {item.icon && <span className="icon">{item.icon}</span>}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </Portal>
            )}
        </div>
    )
}
