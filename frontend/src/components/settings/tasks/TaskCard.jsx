// components/settings/TaskCard.jsx
import React from 'react';
import {Play, Loader} from 'lucide-react';

const TaskCard = ({task, onTrigger, isTriggering, className}) => {
    const formatDateTime = dateString => {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleString();
    };

    const formatDuration = duration => {
        if (!duration) return '-';
        return `${duration}s`;
    };

    return (
        <tr className={`bg-background/10 border-b border-border ${className}`}>
            <td className='py-4 px-4'>
                <div className='flex items-center gap-3'>
                    <span className='text-foreground'>{task.name}</span>
                </div>
            </td>
            <td className='py-4 px-4 text-foreground'>
                {task.interval_minutes} minutes
            </td>
            <td className='py-4 px-4 text-foreground'>
                {formatDateTime(task.last_run)}
            </td>
            <td className='py-4 px-4 text-foreground'>
                {formatDateTime(task.next_run)}
            </td>
            <td className='py-4 px-4 text-right'>
                <button
                    onClick={() => onTrigger(task.id)}
                    disabled={isTriggering}
                    className='p-2 rounded-md bg-primary hover:bg-primary/80 disabled:opacity-50 transition-colors cursor-pointer'>
                    {isTriggering ? (
                        <Loader className='animate-spin' size={16} />
                    ) : (
                        <Play size={16} className='text-foreground invert' />
                    )}
                </button>
            </td>
        </tr>
    );
};

export default TaskCard;
