import React from 'react';
import {CheckSquare} from 'lucide-react';
import {Button} from '@/components/ui/Button';

const ToggleSelectButton = ({isSelectionMode, onClick, shortcutKey = 'A'}) => {
    return (
        <Button
            variant='outline'
            onClick={onClick}
            className={`
        ${
            isSelectionMode
                ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-blue-500/50 hover:text-blue-500 dark:hover:border-blue-500/50 dark:hover:text-blue-400'
        }
      `}
            title={`Toggle selection mode (Ctrl+${shortcutKey})`}>
            <CheckSquare
                className={`w-4 h-4 transition-all duration-200
        ${
            isSelectionMode
                ? ''
                : 'group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:animate-[check-bounce_0.3s_ease-in-out]'
        }
      `}
            />
            <span>Select</span>
        </Button>
    );
};

export default ToggleSelectButton;
