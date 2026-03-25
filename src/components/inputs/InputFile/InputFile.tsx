import {useState, useCallback, useRef, useMemo, useEffect, forwardRef} from 'react'
import type {InputFileProps, InputFileCropOptions} from './InputFile.types'
import {CropEditor} from './CropEditor'
import {cn} from '../../../utils/cn'
import './InputFile.css'

function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileExtension(name: string): string {
    const dot = name.lastIndexOf('.')
    return dot >= 0 ? name.slice(dot + 1).toUpperCase() : ''
}

function isImage(file: File): boolean {
    return file.type.startsWith('image/')
}

function FileTypeIcon({ext}: {ext: string}) {
    const label = ext || 'FILE'
    return (
        <div className="type-icon" aria-hidden="true">
            <svg viewBox="0 0 40 48" fill="none">
                <path
                    d="M4 4C4 1.8 5.8 0 8 0H26L36 10V44C36 46.2 34.2 48 32 48H8C5.8 48 4 46.2 4 44V4Z"
                    fill="currentColor"
                    opacity="0.12"
                />
                <path
                    d="M26 0L36 10H30C27.8 10 26 8.2 26 6V0Z"
                    fill="currentColor"
                    opacity="0.2"
                />
            </svg>
            <span className="type-ext">{label}</span>
        </div>
    )
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
        crop,
        className,
        ...rest
    },
    ref
) {
    const [dragging, setDragging] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [fileError, setFileError] = useState('')
    const [cropFile, setCropFile] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const dragCounter = useRef(0)

    const cropOptions: InputFileCropOptions | null = crop
        ? typeof crop === 'boolean'
            ? {shape: 'square', outputSize: 256, quality: 0.92}
            : {shape: crop.shape ?? 'square', outputSize: crop.outputSize ?? 256, quality: crop.quality ?? 0.92}
        : null

    const objectUrls = useMemo(() => {
        return files.map((f) => (isImage(f) ? URL.createObjectURL(f) : null))
    }, [files])

    useEffect(() => {
        return () => {
            objectUrls.forEach((url) => {
                if (url) URL.revokeObjectURL(url)
            })
        }
    }, [objectUrls])

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

            if (cropOptions && accepted.length === 1 && isImage(accepted[0])) {
                setCropFile(accepted[0])
                return
            }

            setFiles(accepted)
            onChange?.(accepted)
        },
        [accept, maxSize, maxFiles, onChange, cropOptions]
    )

    const handleCropDone = useCallback(
        (cropped: File) => {
            setCropFile(null)
            setFiles([cropped])
            onChange?.([cropped])
        },
        [onChange]
    )

    const handleCropCancel = useCallback(() => {
        setCropFile(null)
    }, [])

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
            const url = objectUrls[index]
            if (url) URL.revokeObjectURL(url)
            const next = files.filter((_, i) => i !== index)
            setFiles(next)
            onChange?.(next)
        },
        [files, objectUrls, onChange]
    )

    const displayError = errorText || fileError
    const hasError = error || !!fileError

    return (
        <div
            ref={ref}
            className={cn('input-file', color, size, fullWidth && 'full-width', disabled && 'disabled', className)}
            {...rest}
        >
            {label && <div className="label">{label}</div>}

            <div
                className={cn('dropzone', dragging && 'dragging', hasError && 'error')}
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
                    className="hidden-input"
                />

                <div className="content">
                    {icon && <div className="icon">{icon}</div>}
                    {!icon && (
                        <svg className="icon-default" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M12 16V4M12 4L8 8M12 4L16 8M4 17V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V17"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                    <div className="text">
                        {dragging ? dropText : placeholder}
                    </div>
                    {accept && (
                        <div className="accept">{accept}</div>
                    )}
                </div>
            </div>

            {cropFile && cropOptions && (
                <CropEditor
                    file={cropFile}
                    shape={cropOptions.shape!}
                    outputSize={cropOptions.outputSize!}
                    quality={cropOptions.quality!}
                    onCrop={handleCropDone}
                    onCancel={handleCropCancel}
                />
            )}

            {helperText && !hasError && (
                <div className="helper">{helperText}</div>
            )}
            {hasError && displayError && (
                <div className="error-text">{displayError}</div>
            )}

            {preview && files.length > 0 && !cropFile && (
                <div className="preview">
                    {files.map((file, i) => (
                        <div key={`${file.name}-${i}`} className="item">
                            <div className="thumb">
                                {objectUrls[i] ? (
                                    <img
                                        src={objectUrls[i]!}
                                        alt={file.name}
                                        className="image"
                                    />
                                ) : (
                                    <FileTypeIcon ext={fileExtension(file.name)} />
                                )}
                            </div>
                            <div className="info">
                                <span className="name">{file.name}</span>
                                <span className="size">{formatSize(file.size)}</span>
                            </div>
                            <button
                                type="button"
                                className="remove"
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
