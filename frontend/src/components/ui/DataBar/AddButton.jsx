import React from 'react';
import {Plus} from 'lucide-react';
import {Button} from '@/components/ui/Button';

const AddButton = ({onClick, label = 'Add New'}) => {
    return (
        <Button onClick={onClick} variant='outline' title={label}>
            <Plus
                className='w-4 h-4 transition-transform duration-200 ease-out
        group-hover:rotate-90 group-hover:scale-110 
        group-hover:text-blue-500 dark:group-hover:text-blue-400'
            />
            <span className='text-sm font-medium'>{label}</span>
        </Button>
    );
};

export default AddButton;
