import {forwardRef} from 'react'
import {FileMark} from './fileMark'
import type {IconProps} from '../Icon.types'

function makeFileIcon(name: string, mark: string, fill: string, markColor?: string) {
    const FileExtIcon = forwardRef<SVGSVGElement, IconProps>(function FileExtIcon(props, ref) {
        return <FileMark ref={ref} mark={mark} fill={fill} markColor={markColor} {...props} />
    })

    FileExtIcon.displayName = name

    return FileExtIcon
}

export const FileTxtIcon = makeFileIcon('FileTxtIcon', 'TXT', '#475569')
export const FileDocsIcon = makeFileIcon('FileDocsIcon', 'DOCS', '#2563eb')
export const FileJpgIcon = makeFileIcon('FileJpgIcon', 'JPG', '#ea580c')
export const FileJsonIcon = makeFileIcon('FileJsonIcon', 'JSON', '#f59e0b', '#111827')
export const FileExeIcon = makeFileIcon('FileExeIcon', 'EXE', '#1f2937')
export const FileOdtIcon = makeFileIcon('FileOdtIcon', 'ODT', '#0f766e')
export const FileMdIcon = makeFileIcon('FileMdIcon', 'MD', '#334155')
export const FileJsIcon = makeFileIcon('FileJsIcon', 'JS', '#facc15', '#111827')
export const FileHtmlIcon = makeFileIcon('FileHtmlIcon', 'HTML', '#ea580c')
export const FileCssIcon = makeFileIcon('FileCssIcon', 'CSS', '#2563eb')
export const FilePhpIcon = makeFileIcon('FilePhpIcon', 'PHP', '#7c3aed')
export const FilePngIcon = makeFileIcon('FilePngIcon', 'PNG', '#0891b2')
export const FileSvgIcon = makeFileIcon('FileSvgIcon', 'SVG', '#f97316')
export const FileGifIcon = makeFileIcon('FileGifIcon', 'GIF', '#ec4899')
export const FileWebpIcon = makeFileIcon('FileWebpIcon', 'WEBP', '#0f766e')
export const FileTsIcon = makeFileIcon('FileTsIcon', 'TS', '#2563eb')
export const FileTsxIcon = makeFileIcon('FileTsxIcon', 'TSX', '#0284c7')
export const FileJsxIcon = makeFileIcon('FileJsxIcon', 'JSX', '#0ea5e9')
export const FileXmlIcon = makeFileIcon('FileXmlIcon', 'XML', '#7c2d12')
export const FileCsvIcon = makeFileIcon('FileCsvIcon', 'CSV', '#15803d')
export const FileXlsIcon = makeFileIcon('FileXlsIcon', 'XLS', '#166534')
export const FilePptIcon = makeFileIcon('FilePptIcon', 'PPT', '#dc2626')
export const FileZipIcon = makeFileIcon('FileZipIcon', 'ZIP', '#a16207')
export const FileRarIcon = makeFileIcon('FileRarIcon', 'RAR', '#92400e')
export const FileMp3Icon = makeFileIcon('FileMp3Icon', 'MP3', '#9333ea')
export const FileMp4Icon = makeFileIcon('FileMp4Icon', 'MP4', '#be123c')
