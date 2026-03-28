import type {TaskListProps} from './TaskList.types'
import {Checkbox} from '../../controls'
import {cn} from '../../../utils/cn'
import './TaskList.css'

// Render an interactive checklist with toggleable task items.
export function TaskList({
    items,
    color = 'primary',
    strikethrough = true,
    onChange,
    className,
    ...rest
}: TaskListProps) {
    return (
        <div className={cn('task list', color, className)} role="list" {...rest}>
            {items.map((item) => (
                <div
                    key={item.id}
                    className={cn('task item', item.checked && 'checked', item.disabled && 'disabled')}
                    role="listitem"
                    onClick={(event) => {
                        if (item.disabled) return
                        if ((event.target as HTMLElement).closest('.checkbox')) return
                        onChange?.(item.id, !(item.checked ?? false))
                    }}
                >
                    <Checkbox
                        className="task control"
                        checked={item.checked ?? false}
                        color={color}
                        size="sm"
                        disabled={item.disabled}
                        onChange={(e) => onChange?.(item.id, e.target.checked)}
                        clickEffect="ripple"
                    />
                    <span className={cn('task label', item.checked && strikethrough && 'done')}>{item.label}</span>
                </div>
            ))}
        </div>
    )
}
