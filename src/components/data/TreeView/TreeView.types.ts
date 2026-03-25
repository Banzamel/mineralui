import type {HTMLAttributes, ReactNode} from 'react'

export interface TreeNode {
    id: string
    label: string
    children?: TreeNode[]
    icon?: ReactNode
    disabled?: boolean
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
}

export interface TreeItemProps {
    node: TreeNode
    level: number
    expandable?: boolean
    selectable?: boolean
    expandedIds: Set<string>
    selectedId?: string | null
    onToggle: (id: string) => void
    onSelect?: (id: string, node: TreeNode) => void
    indent: number
    showLines?: boolean
    fileIcons?: boolean
}
