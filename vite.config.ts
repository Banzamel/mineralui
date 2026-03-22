import {defineConfig, type Plugin} from 'vite'
import {resolve} from 'path'
import {readFileSync, writeFileSync} from 'fs'
import dts from 'vite-plugin-dts'

// Inline plugin: after build, inject CSS into JS bundles so consumers don't need a separate styles.css import.
// The standalone styles.css is kept in dist for backward compatibility.
function cssAutoInject(): Plugin {
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

            for (const file of ['index.js', 'index.cjs']) {
                const path = resolve(distDir, file)
                try {
                    const code = readFileSync(path, 'utf-8')
                    writeFileSync(path, injector + '\n' + code)
                } catch { /* skip if file doesn't exist */ }
            }
        },
    }
}

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
            rollupTypes: true,
        }),
        cssAutoInject(),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'MineralUI',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
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
