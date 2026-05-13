import type {MInputProps} from '../MInput'
import type {ValidationResult} from '../../../utils/validators'

export interface MInputUrlProps extends Omit<MInputProps, 'type'> {
    /**
     * Allowed URL protocols (without trailing colon). Defaults to
     * `['http', 'https']`. Pass `[]` to accept any scheme; this also stops
     * `formatOnBlur` from prepending a default protocol.
     */
    protocols?: string[]
    /**
     * Whether the value must include a protocol to be considered valid.
     * Defaults to `true`. Set to `false` to accept bare host/path strings
     * like `example.com/path`.
     */
    requireProtocol?: boolean
    /**
     * When `true`, on blur prepend `${protocols[0]}://` to the value if it
     * has no scheme yet. Quality-of-life shortcut so users can type
     * `example.com` and end up with `https://example.com` after focus leaves
     * the field. Skipped when `protocols` is empty. Defaults to `false`.
     */
    formatOnBlur?: boolean
    validateOnBlur?: boolean
    validateOnChange?: boolean
    showValidIcon?: boolean
    onValidationChange?: (result: ValidationResult) => void
}
