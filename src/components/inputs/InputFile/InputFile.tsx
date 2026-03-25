import {useState, useCallback, useRef, forwardRef} from 'react'
import type {InputFileProps} from './InputFile.types'
import {cn} from '../../../utils/cn'
import './InputFile.css'

function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const InputFile = forwardRef<HTMLDivElement, InputFileProps>(function InputFile(
    {
        accept,
        multiple = false,
        maxSize,
        maxFiles,
        onChange,
        label,
        helperText,
        errorText,
        error = false,
        disabled = false,
        color = 'primary',
        size = 'md',
        preview = true,
        icon,
        placeholder = 'Drop files here or click to browse',
        dropText = 'Drop files here',
        fullWidth = false,
        className,
        ...rest
    },
    ref
) {
    const [dragging, setDragging] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [fileError, setFileError] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const dragCounter = useRef(0)

    const processFiles = useCallback(
        (incoming: FileList | File[]) => {
            const list = Array.from(incoming)
            let accepted = list

            if (accept) {
                const patterns = accept.split(',').map((s) => s.trim().toLowerCase())
                accepted = accepted.filter((f) => {
                    const ext = '.' + f.name.split('.').pop()?.toLowerCase()
                    const mime = f.type.toLowerCase()
                    return patterns.some(
                        (p) =>
                            p === ext ||
                            p === mime ||
                            (p.endsWith('/*') && mime.startsWith(p.slice(0, -1)))
                    )
                })
            }

            if (maxSize) {
                const oversized = accepted.filter((f) => f.size > maxSize)
                if (oversized.length) {
                    setFileError(`Max file size: ${formatSize(maxSize)}`)
                    return
                }
            }

            if (maxFiles && accepted.length > maxFiles) {
                setFileError(`Max ${maxFiles} file${maxFiles > 1 ? 's' : ''}`)
                return
            }

            setFileError('')
            setFiles(accepted)
            onChange?.(accepted)
        },
        [accept, maxSize, maxFiles, onChange]
    )

    const handleDragEnter = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (disabled) return
            dragCounter.current++
            setDragging(true)
        },
        [disabled]
    )

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter.current--
        if (dragCounter.current <= 0) {
            dragCounter.current = 0
            setDragging(false)
        }
    }, [])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            dragCounter.current = 0
            setDragging(false)
            if (disabled) return
            if (e.dataTransfer.files.length) {
                processFiles(e.dataTransfer.files)
            }
        },
        [disabled, processFiles]
    )

    const handleClick = useCallback(() => {
        if (!disabled) inputRef.current?.click()
    }, [disabled])

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.length) {
                processFiles(e.target.files)
            }
        },
        [processFiles]
    )

    const removeFile = useCallback(
        (index: number) => {
            const next = files.filter((_, i) => i !== index)
            setFiles(next)
            onChange?.(next)
        },
        [files, onChange]
    )

    const displayError = errorText || fileError
    const hasError = error || !!fileError

    return (
        <div
            ref={ref}
            className={cn('input-file', color, size, fullWidth && 'full-width', disabled && 'disabled', className)}
            {...rest}
        >
            {label && <div className="input-file-label">{label}</div>}

            <div
                className={cn('input-file-dropzone', dragging && 'dragging', hasError && 'error')}
                onClick={handleClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                role="button"
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleClick()
                    }
                }}
                aria-label={label || placeholder}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                    tabIndex={-1}
                    className="input-file-hidden"
                />

                <div className="input-file-content">
                    {icon && <div className="input-file-icon">{icon}</div>}
                    {!icon && (
                        <svg className="input-file-icon-default" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M12 16V4M12 4L8 8M12 4L16 8M4 17V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V17"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                    <div className="input-file-text">
                        {dragging ? dropText : placeholder}
                    </div>
                    {accept && (
                        <div className="input-file-accept">{accept}</div>
                    )}
                </div>
            </div>

            {helperText && !hasError && (
                <div className="input-file-helper">{helperText}</div>
            )}
            {hasError && displayError && (
                <div className="input-file-error">{displayError}</div>
            )}

            {preview && files.length > 0 && (
                <div className="input-file-preview">
                    {files.map((file, i) => (
                        <div key={`${file.name}-${i}`} className="input-file-item">
                            <div className="input-file-item-info">
                                <span className="input-file-item-name">{file.name}</span>
                                <span className="input-file-item-size">{formatSize(file.size)}</span>
                            </div>
                            <button
                                type="button"
                                className="input-file-item-remove"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeFile(i)
                                }}
                                aria-label={`Remove ${file.name}`}
                            >
                                <svg viewBox="0 0 16 16" aria-hidden="true">
                                    <path
                                        d="M4 4L12 12M12 4L4 12"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
})
