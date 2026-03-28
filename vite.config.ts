import {defineConfig, type Plugin} from 'vite'
import {resolve} from 'path'
import {readFileSync, writeFileSync} from 'fs'
import dts from 'vite-plugin-dts'

// Build one shared style runtime and attach it to every public entry once.
// This keeps subpath exports small while preserving automatic style injection.
function cssAutoInject(entryNames: string[]): Plugin {
    return {
        name: 'mineral-css-auto-inject',
        apply: 'build',
        closeBundle() {
            const distDir = resolve(__dirname, 'dist')
            let css: string
            try {
                css = readFileSync(resolve(distDir, 'styles.css'), 'utf-8')
            } catch {
                return
            }

            const escaped = css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
            const injector = [
                'if(typeof document!=="undefined"){',
                'let s=document.getElementById("mineral-ui-styles");',
                'if(!s){s=document.createElement("style");',
                's.id="mineral-ui-styles";',
                `s.textContent=\`${escaped}\`;`,
                'document.head.appendChild(s)}}',
            ].join('')

            const runtimes = [
                {
                    file: 'style-runtime.js',
                    include: (file: string) => `${file}.js`,
                    prefix: 'import \'./style-runtime.js\'\n',
                },
                {
                    file: 'style-runtime.cjs',
                    include: (file: string) => `${file}.cjs`,
                    prefix: 'require(\'./style-runtime.cjs\')\n',
                },
            ]

            for (const runtime of runtimes) {
                const runtimePath = resolve(distDir, runtime.file)
                writeFileSync(runtimePath, injector)

                for (const entryName of entryNames) {
                    const entryPath = resolve(distDir, runtime.include(entryName))

                    try {
                        const code = readFileSync(entryPath, 'utf-8')

                        if (!code.startsWith(runtime.prefix)) {
                            writeFileSync(entryPath, runtime.prefix + code)
                        }
                    } catch {
                        /* skip if file doesn't exist */
                    }
                }
            }
        },
    }
}

const entryMap = {
    index: resolve(__dirname, 'src/index.ts'),
    layout: resolve(__dirname, 'src/layout.ts'),
    controls: resolve(__dirname, 'src/controls.ts'),
    icons: resolve(__dirname, 'src/icons.entry.ts'),
    cards: resolve(__dirname, 'src/cards.ts'),
    data: resolve(__dirname, 'src/data.ts'),
    display: resolve(__dirname, 'src/display.ts'),
    dropdowns: resolve(__dirname, 'src/dropdowns.ts'),
    feedback: resolve(__dirname, 'src/feedback.ts'),
    form: resolve(__dirname, 'src/form.ts'),
    inputs: resolve(__dirname, 'src/inputs.ts'),
    media: resolve(__dirname, 'src/media.ts'),
    overlays: resolve(__dirname, 'src/overlays.ts'),
    primitives: resolve(__dirname, 'src/primitives.ts'),
    typography: resolve(__dirname, 'src/typography.ts'),
    theme: resolve(__dirname, 'src/theme.entry.ts'),
    i18n: resolve(__dirname, 'src/i18n.entry.ts'),
    utils: resolve(__dirname, 'src/utils.entry.ts'),
}

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
            rollupTypes: false,
        }),
        cssAutoInject(Object.keys(entryMap)),
    ],
    build: {
        lib: {
            entry: entryMap,
            name: 'MineralUI',
            formats: ['es', 'cjs'],
            fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                },
                assetFileNames: 'styles.css',
            },
        },
        cssCodeSplit: false,
        sourcemap: true,
    },
})
