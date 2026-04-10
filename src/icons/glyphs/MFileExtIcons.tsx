import {forwardRef} from 'react'
import {MFileMark} from './MFileMark'
import type {MIconProps} from '../MIcon.types'

function makeFileIcon(name: string, mark: string, fill: string, markColor?: string) {
    const FileExtIcon = forwardRef<SVGSVGElement, MIconProps>(function FileExtIcon(props, ref) {
        return <MFileMark ref={ref} mark={mark} fill={fill} markColor={markColor} {...props} />
    })

    FileExtIcon.displayName = name

    return FileExtIcon
}

export const MFileTxtIcon = makeFileIcon('MFileTxtIcon', 'TXT', '#475569')
export const MFileDocsIcon = makeFileIcon('MFileDocsIcon', 'DOCS', '#2563eb')
export const MFileJpgIcon = makeFileIcon('MFileJpgIcon', 'JPG', '#ea580c')
export const MFileJsonIcon = makeFileIcon('MFileJsonIcon', 'JSON', '#f59e0b', '#111827')
export const MFileExeIcon = makeFileIcon('MFileExeIcon', 'EXE', '#1f2937')
export const MFileOdtIcon = makeFileIcon('MFileOdtIcon', 'ODT', '#0f766e')
export const MFileMdIcon = makeFileIcon('MFileMdIcon', 'MD', '#334155')
export const MFileJsIcon = makeFileIcon('MFileJsIcon', 'JS', '#facc15', '#111827')
export const MFileHtmlIcon = makeFileIcon('MFileHtmlIcon', 'HTML', '#ea580c')
export const MFileCssIcon = makeFileIcon('MFileCssIcon', 'CSS', '#2563eb')
export const MFilePhpIcon = makeFileIcon('MFilePhpIcon', 'PHP', '#7c3aed')
export const MFilePngIcon = makeFileIcon('MFilePngIcon', 'PNG', '#0891b2')
export const MFileSvgIcon = makeFileIcon('MFileSvgIcon', 'SVG', '#f97316')
export const MFileGifIcon = makeFileIcon('MFileGifIcon', 'GIF', '#ec4899')
export const MFileWebpIcon = makeFileIcon('MFileWebpIcon', 'WEBP', '#0f766e')
export const MFileTsIcon = makeFileIcon('MFileTsIcon', 'TS', '#2563eb')
export const MFileTsxIcon = makeFileIcon('MFileTsxIcon', 'TSX', '#0284c7')
export const MFileJsxIcon = makeFileIcon('MFileJsxIcon', 'JSX', '#0ea5e9')
export const MFileXmlIcon = makeFileIcon('MFileXmlIcon', 'XML', '#7c2d12')
export const MFileCsvIcon = makeFileIcon('MFileCsvIcon', 'CSV', '#15803d')
export const MFileXlsIcon = makeFileIcon('MFileXlsIcon', 'XLS', '#166534')
export const MFilePptIcon = makeFileIcon('MFilePptIcon', 'PPT', '#dc2626')
export const MFileZipIcon = makeFileIcon('MFileZipIcon', 'ZIP', '#a16207')
export const MFileRarIcon = makeFileIcon('MFileRarIcon', 'RAR', '#92400e')
export const MFileMp3Icon = makeFileIcon('MFileMp3Icon', 'MP3', '#9333ea')
export const MFileMp4Icon = makeFileIcon('MFileMp4Icon', 'MP4', '#be123c')
