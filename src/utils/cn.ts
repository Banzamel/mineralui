// Join optional class names without pulling a runtime dependency.
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ')
}
