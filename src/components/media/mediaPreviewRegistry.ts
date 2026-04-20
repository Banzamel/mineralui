import type {MMediaLightboxItem} from './MMediaLightbox/MMediaLightbox'

interface MMediaPreviewRegistryItem extends MMediaLightboxItem {
    id: string
}

const previewGroups = new Map<string, Map<string, MMediaPreviewRegistryItem>>()

export function registerMediaPreviewItem(group: string, id: string, item: MMediaLightboxItem) {
    let groupItems = previewGroups.get(group)

    if (!groupItems) {
        groupItems = new Map()
        previewGroups.set(group, groupItems)
    }

    groupItems.set(id, {id, ...item})

    return () => {
        const currentGroupItems = previewGroups.get(group)
        if (!currentGroupItems) {
            return
        }

        currentGroupItems.delete(id)

        if (currentGroupItems.size === 0) {
            previewGroups.delete(group)
        }
    }
}

export function getMediaPreviewGroupItems(group: string) {
    return Array.from(previewGroups.get(group)?.values() ?? [])
}
