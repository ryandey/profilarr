// components/settings/TaskContainer.jsx
import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {getAllTasks, triggerTask} from '@/api/task';
import {Loader} from 'lucide-react';
import Alert from '@ui/Alert';
import TaskCard from './TaskCard';
import Container from '@/components/ui/Container';

const TaskContainer = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [triggeringTask, setTriggeringTask] = useState(null);

    useEffect(() => {
        fetchTasks();
        const interval = setInterval(fetchTasks, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchTasks = async () => {
        try {
            const taskData = await getAllTasks();
            setTasks(taskData);
        } catch (error) {
            Alert.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleTriggerTask = async taskId => {
        setTriggeringTask(taskId);
        try {
            const result = await triggerTask(taskId);
            if (result.success) {
                Alert.success(result.message || 'Task triggered successfully');
                await fetchTasks();
            } else {
                Alert.error(result.message);
            }
        } finally {
            setTriggeringTask(null);
        }
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center p-8'>
                <Loader className='animate-spin' size={24} />
            </div>
        );
    }

    const headers = [
        'Name',
        'Interval',
        'Last Execution',
        'Next Execution',
        'Actions'
    ];

    return (
        <Container className='overflow-x-auto p-0 md:p-0 space-y-4'>
            <div className='px-6 pt-6 md:px-8 md:pt-8'>
                <h2 className='text-xl font-bold text-foreground'>
                    Scheduled Tasks
                </h2>
            </div>
            <table className='min-w-full'>
                <thead className='bg-background text-left border-b border-t border-border'>
                    <tr>
                        {headers.map(header => (
                            <th
                                key={header}
                                className={clsx(
                                    'py-3 px-4 font-medium text-foreground',
                                    header === 'Actions' && 'text-right'
                                )}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onTrigger={handleTriggerTask}
                            isTriggering={triggeringTask === task.id}
                            className={
                                tasks[tasks.length - 1] === task
                                    ? 'border-b-0'
                                    : ''
                            }
                        />
                    ))}
                </tbody>
            </table>
        </Container>
    );
};

export default TaskContainer;
