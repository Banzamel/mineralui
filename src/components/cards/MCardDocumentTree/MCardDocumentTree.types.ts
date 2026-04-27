import type {ReactNode} from 'react'
import type {MColor} from '../../../theme'
import type {MTreeNode} from '../../data/MTreeView'
import type {MCardProps} from '../MCard'
import type {MDetailListItem} from '../../display/MDetailList'
import type {MCardActionProps} from '../shared'

export interface MCardDocumentTreeAction extends MCardActionProps {
    id: string
    label: ReactNode
    icon?: ReactNode
    color?: MColor
    disabled?: boolean
    onClick?: () => void
}

export interface MCardDocumentTreeProps extends Omit<MCardProps, 'children' | 'title' | 'onSelect'> {
    title?: ReactNode
    description?: ReactNode
    items: MTreeNode[]
    selected?: string | null
    onSelect?: (id: string, node: MTreeNode) => void
    defaultExpanded?: string[]
    expanded?: string[]
    onExpandChange?: (ids: string[]) => void
    detailsTitle?: ReactNode
    detailsMeta?: ReactNode
    detailsItems?: MDetailListItem[]
    detailsActions?: MCardDocumentTreeAction[]
    renderDetails?: ReactNode
    emptyDetails?: ReactNode
    primaryAction?: ReactNode
}
