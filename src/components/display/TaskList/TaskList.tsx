import type {TaskListProps} from './TaskList.types'
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
        <div className={cn('task-list', color, className)} role="list" {...rest}>
            {items.map((item) => (
                <label
                    key={item.id}
                    className={cn(
                        'task-list-item',
                        item.checked && 'checked',
                        item.disabled && 'disabled'
                    )}
                    role="listitem"
                >
                    <input
                        type="checkbox"
                        className="task-list-checkbox"
                        checked={item.checked ?? false}
                        disabled={item.disabled}
                        onChange={(e) => onChange?.(item.id, e.target.checked)}
                    />
                    <span className={cn('task-list-label', item.checked && strikethrough && 'done')}>
                        {item.label}
                    </span>
                </label>
            ))}
        </div>
    )
}
