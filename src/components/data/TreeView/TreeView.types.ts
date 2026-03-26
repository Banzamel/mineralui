import type {DragEvent, HTMLAttributes, MouseEvent, ReactNode} from 'react'
import type {MineralColor} from '../../../theme'

export interface TreeNode {
    id: string
    label: string
    kind?: 'file' | 'folder'
    children?: TreeNode[]
    icon?: ReactNode
    disabled?: boolean
}

export interface TreeViewContextMenuItem {
    id: string
    label: ReactNode
    icon?: ReactNode
    color?: MineralColor
    disabled?: boolean
}

export interface TreeViewMoveEvent {
    draggedId: string
    draggedNode: TreeNode
    targetId: string
    targetNode: TreeNode
}

export interface TreeViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    items: TreeNode[]
    expandable?: boolean
    selectable?: boolean
    defaultExpanded?: string[]
    expanded?: string[]
    onExpandChange?: (ids: string[]) => void
    selected?: string | null
    onSelect?: (id: string, node: TreeNode) => void
    indent?: number
    showLines?: boolean
    fileIcons?: boolean
    draggable?: boolean
    canDrop?: (draggedNode: TreeNode, targetNode: TreeNode) => boolean
    onMove?: (event: TreeViewMoveEvent) => void
    contextMenuItems?: (node: TreeNode) => TreeViewContextMenuItem[]
    onContextMenuAction?: (actionId: string, node: TreeNode) => void
}

export interface TreeItemProps {
    node: TreeNode
    level: number
    expandable?: boolean
    selectable?: boolean
    expandedIds: Set<string>
    selectedId?: string | null
    draggedId?: string | null
    dropTargetId?: string | null
    onToggle: (id: string) => void
    onSelect?: (id: string, node: TreeNode) => void
    indent: number
    showLines?: boolean
    fileIcons?: boolean
    draggable?: boolean
    canDropOnNode?: (node: TreeNode) => boolean
    onContextMenu?: (event: MouseEvent<HTMLDivElement>, node: TreeNode) => void
    onDragStart?: (event: DragEvent<HTMLDivElement>, node: TreeNode) => void
    onDragOver?: (event: DragEvent<HTMLDivElement>, node: TreeNode) => void
    onDrop?: (event: DragEvent<HTMLDivElement>, node: TreeNode) => void
    onDragEnd?: () => void
}
