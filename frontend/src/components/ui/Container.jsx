const Container = ({children}) => {
    return (
        <div className='w-full flex flex-col gap-4 p-8 bg-linear-to-br from-white-50 to-gray-50 border border-gray-300 rounded-lg shadow-lg overflow-hidden dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 dark:shadow-xl'>
            {children}
        </div>
    );
};

export default Container;
