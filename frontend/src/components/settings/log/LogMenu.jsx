// LogMenu.jsx
import React from 'react';
import {Search} from 'lucide-react';
import Input from '@/components/ui/Input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/Select';

const LogMenu = ({
    logTypes,
    selectedType,
    setSelectedType,
    selectedFile,
    setSelectedFile,
    filteredFiles,
    filters,
    handleChange
}) => {
    const selectStyles =
        'flex h-11 w-full items-center justify-between whitespace-nowrap rounded-md appearance-none cursor-pointer border border-border bg-transparent px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1';

    const formatLogType = type => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {/* Log Type Selection */}
                <div className='relative'>
                    <select
                        className={selectStyles}
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}>
                        {logTypes.map(type => (
                            <option key={type} value={type}>
                                Type: {formatLogType(type)}
                            </option>
                        ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                        <svg
                            className='h-4 w-4 fill-current text-foreground'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'>
                            <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                        </svg>
                    </div>
                </div>

                {/* Log File Selection */}
                <div className='relative'>
                    <select
                        className={selectStyles}
                        value={selectedFile}
                        onChange={e => setSelectedFile(e.target.value)}>
                        {filteredFiles.map(f => (
                            <option key={f.filename} value={f.filename}>
                                File: {f.filename}
                            </option>
                        ))}
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                        <svg
                            className='h-4 w-4 fill-current text-foreground'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'>
                            <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                        </svg>
                    </div>
                </div>

                {/* Log Lines */}
                <Input
                    type='number'
                    value={filters.lines}
                    onChange={e => handleChange('lines', e.target.value)}
                    placeholder='Lines: last N lines...'
                />

                {/* Log Level */}
                <div className='relative'>
                    <select
                        className={selectStyles}
                        value={filters.level}
                        onChange={e => handleChange('level', e.target.value)}>
                        <option value=''>Level: All</option>
                        <option value='info'>Level: INFO</option>
                        <option value='debug'>Level: DEBUG</option>
                        <option value='warning'>Level: WARNING</option>
                        <option value='error'>Level: ERROR</option>
                    </select>
                    <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
                        <svg
                            className='h-4 w-4 fill-current text-foreground'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'>
                            <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Log Search */}
            <div className='relative'>
                <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                    <Search size={16} className='text-foreground' />
                </div>
                <Input
                    type='search'
                    placeholder='Search logs...'
                    value={filters.search}
                    onChange={e => handleChange('search', e.target.value)}
                    className='pl-10'
                />
            </div>
        </div>
    );
};

export default LogMenu;
