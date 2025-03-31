import {cn} from '@/lib/utils';

const Container = ({children, className}) => {
    return (
        <div
            className={cn(
                'w-full flex flex-col gap-4 p-6 md:p-8 bg-linear-to-br from-white-50 to-gray-50 border border-gray-300 rounded-lg shadow-lg overflow-hidden dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 dark:shadow-xl',
                className
            )}>
            {children}
        </div>
    );
};

export default Container;
