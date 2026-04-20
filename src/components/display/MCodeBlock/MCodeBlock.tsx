import {useEffect, useMemo, useRef, useState} from 'react'
import type {MCodeBlockProps} from './MCodeBlock.types'
import {MCard, MCardBody, MCardHeader} from '../../cards'
import {MButton} from '../../controls'
import {MBadge} from '../../feedback'
import {MInline} from '../../layout'
import {MText} from '../../typography'
import {MCopyIcon} from '../../../icons'
import {cn} from '../../../utils/cn'
import './MCodeBlock.css'

const languageMap: Record<string, string> = {
    c: 'c',
    cpp: 'cpp',
    'c++': 'cpp',
    arduino: 'cpp',
    ino: 'cpp',
    ts: 'typescript',
    typescript: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    javascript: 'javascript',
    jsx: 'jsx',
    json: 'json',
    css: 'css',
    html: 'markup',
    markup: 'markup',
    bash: 'bash',
    shell: 'bash',
    shellscript: 'bash',
    php: 'php',
}

let prismPromise: Promise<PrismLike> | null = null
const codeBlockTypingSpeed = 42
const codeBlockTypingStartDelay = 200

interface PrismGrammar {
    [key: string]: unknown
}

interface PrismLike {
    languages: Record<string, PrismGrammar | undefined>
    highlight: (code: string, grammar: PrismGrammar, language: string) => string
}

function escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function resolveLanguage(language: string): string {
    return languageMap[language] ?? language
}

async function getPrism(): Promise<PrismLike> {
    if (!prismPromise) {
        prismPromise = (async () => {
            const prism = (await import('prismjs/components/prism-core')).default as PrismLike

            await import('prismjs/components/prism-markup')
            await import('prismjs/components/prism-clike')
            await import('prismjs/components/prism-c')
            await import('prismjs/components/prism-cpp')
            await import('prismjs/components/prism-javascript')
            await import('prismjs/components/prism-markup-templating')
            await import('prismjs/components/prism-jsx')
            await import('prismjs/components/prism-typescript')
            await import('prismjs/components/prism-tsx')
            await import('prismjs/components/prism-json')
            await import('prismjs/components/prism-css')
            await import('prismjs/components/prism-bash')
            await import('prismjs/components/prism-php')

            return prism
        })()
    }

    return prismPromise
}

// Render a syntax-highlighted code block with optional card header and copy action.
export function MCodeBlock({
    code,
    language = 'tsx',
    title,
    showHeader = true,
    showLanguage = true,
    showCopyButton = true,
    copyLabel = 'Copy',
    copiedLabel = 'Copied',
    maxHeight,
    stretch = false,
    animated = false,
    lineNumbers = false,
    className,
    ...rest
}: MCodeBlockProps) {
    const normalizedLanguage = useMemo(() => resolveLanguage(language.trim().toLowerCase()), [language])
    const [visibleLength, setVisibleLength] = useState(() => (animated ? 0 : code.length))
    const renderedCode = animated ? code.slice(0, visibleLength) : code
    const [highlightedCode, setHighlightedCode] = useState(() => escapeHtml(renderedCode))
    const [copied, setCopied] = useState(false)
    const copyTimeoutRef = useRef<number | null>(null)
    const typingTimeoutRef = useRef<number | null>(null)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const canCopy = typeof navigator !== 'undefined' && typeof navigator.clipboard?.writeText === 'function'
    const hasHeader = showHeader && (Boolean(title) || showLanguage || showCopyButton)
    const lineCount = useMemo(() => Math.max(1, renderedCode.split('\n').length), [renderedCode])

    useEffect(() => {
        if (typingTimeoutRef.current !== null) {
            window.clearTimeout(typingTimeoutRef.current)
            typingTimeoutRef.current = null
        }

        setVisibleLength(animated ? 0 : code.length)
    }, [animated, code])

    useEffect(() => {
        if (!animated || code.length === 0) {
            return
        }

        if (visibleLength < code.length) {
            typingTimeoutRef.current = window.setTimeout(
                () => {
                    setVisibleLength((current) => Math.min(current + 1, code.length))
                    typingTimeoutRef.current = null
                },
                visibleLength === 0 ? codeBlockTypingStartDelay : codeBlockTypingSpeed
            )
        }

        return () => {
            if (typingTimeoutRef.current !== null) {
                window.clearTimeout(typingTimeoutRef.current)
                typingTimeoutRef.current = null
            }
        }
    }, [animated, code.length, visibleLength])

    useEffect(() => {
        let active = true

        async function highlightCode() {
            try {
                const prism = await getPrism()
                const grammar = prism.languages[normalizedLanguage]
                const html = grammar
                    ? prism.highlight(renderedCode, grammar, normalizedLanguage)
                    : escapeHtml(renderedCode)

                if (active) {
                    setHighlightedCode(html)
                }
            } catch {
                if (active) {
                    setHighlightedCode(escapeHtml(renderedCode))
                }
            }
        }

        void highlightCode()

        return () => {
            active = false
        }
    }, [normalizedLanguage, renderedCode])

    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current !== null) {
                window.clearTimeout(copyTimeoutRef.current)
            }

            if (typingTimeoutRef.current !== null) {
                window.clearTimeout(typingTimeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (!animated || !scrollRef.current) {
            return
        }

        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [animated, visibleLength])

    async function handleCopy() {
        if (!canCopy) {
            return
        }

        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)

            if (copyTimeoutRef.current !== null) {
                window.clearTimeout(copyTimeoutRef.current)
            }

            copyTimeoutRef.current = window.setTimeout(() => {
                setCopied(false)
                copyTimeoutRef.current = null
            }, 1200)
        } catch {
            setCopied(false)
        }
    }

    return (
        <MCard className={cn('code-block-card', className)} {...rest} padded={false} stretch={stretch}>
            {hasHeader && (
                <MCardHeader className="code-block-header">
                    <MInline
                        className="code-block-header-layout"
                        align="center"
                        justify="between"
                        wrap="nowrap"
                        px="lg"
                        py="md"
                    >
                        <MInline className="code-block-header-meta" align="center" wrap="wrap">
                            {title && (
                                <MText as="span" className="code-block-title" size="sm" weight="semibold">
                                    {title}
                                </MText>
                            )}
                            {showLanguage && language && (
                                <MBadge color="info" size="sm">
                                    {language}
                                </MBadge>
                            )}
                        </MInline>
                        {showCopyButton && (
                            <MButton
                                variant="ghost"
                                size="sm"
                                color="neutral"
                                startIcon={<MCopyIcon size="sm" aria-hidden="true" />}
                                onClick={handleCopy}
                                disabled={!canCopy}
                            >
                                {copied ? copiedLabel : copyLabel}
                            </MButton>
                        )}
                    </MInline>
                </MCardHeader>
            )}

            <MCardBody className="code-block-body">
                <div
                    ref={scrollRef}
                    className="code-block-scroll"
                    style={maxHeight ? {maxHeight, overflowY: 'auto'} : undefined}
                >
                    <pre
                        className={cn(
                            'code-block-pre',
                            lineNumbers && 'with-line-numbers',
                            `language-${normalizedLanguage}`
                        )}
                    >
                        {lineNumbers && (
                            <span className="code-block-line-numbers" aria-hidden="true">
                                {Array.from({length: lineCount}, (_, index) => (
                                    <span key={index + 1} className="code-block-line-number">
                                        {index + 1}
                                    </span>
                                ))}
                            </span>
                        )}
                        <span className="code-block-code-shell">
                            <code
                                className={cn('code-block-code', `language-${normalizedLanguage}`)}
                                dangerouslySetInnerHTML={{__html: highlightedCode}}
                            />
                        </span>
                    </pre>
                </div>
            </MCardBody>
        </MCard>
    )
}
