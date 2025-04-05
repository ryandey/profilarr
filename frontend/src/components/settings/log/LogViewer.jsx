import React from 'react';
import {ANSI_COLORS} from '@constants/colors';
import {cn} from '@/lib/utils';

const parseAnsiLine = line => {
    // Split on ANSI escape sequences
    const parts = line.split(/\u001b\[(\d+)m/g);
    if (parts.length === 1) return [{text: line, className: 'text-gray-200'}];

    const result = [];
    let currentClasses = ['text-gray-200'];

    for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
            // Text content
            if (parts[i]) {
                result.push({
                    text: parts[i],
                    className: currentClasses.join(' ')
                });
            }
        } else {
            // ANSI code
            if (parts[i] === '0') {
                currentClasses = ['text-gray-200'];
            } else {
                const colorClass = ANSI_COLORS[parts[i]];
                if (colorClass) {
                    if (parts[i] === '1' || parts[i] === '22') {
                        currentClasses = currentClasses
                            .filter(c => !c.startsWith('font-'))
                            .concat([colorClass]);
                    } else {
                        currentClasses = currentClasses
                            .filter(c => !c.startsWith('text-'))
                            .concat([colorClass]);
                    }
                }
            }
        }
    }

    return result;
};

const LogViewer = ({
    selectedFile,
    zoom,
    setZoom,
    loading,
    error,
    logContent
}) => {
    const [isTerminalDarkMode, setIsTerminalDarkMode] = React.useState(true);

    return (
        <div
            className={cn(
                'h-full rounded-lg border border-border',
                isTerminalDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            )}>
            <div className='px-4 py-2 border-b border-gray-700 flex items-center justify-between'>
                <div
                    className={cn(
                        'text-sm pl-2',
                        isTerminalDarkMode ? 'text-gray-200' : 'text-gray-800'
                    )}>
                    {selectedFile}
                </div>
                <span className='flex gap-12 items-center'>
                    <div>
                        <div className='flex items-center gap-1.5'>
                            <input
                                className='accent-checkbox'
                                type='checkbox'
                                id='toggle-terminal-dark-mode'
                                aria-label='Toggle terminal dark mode'
                                checked={isTerminalDarkMode}
                                onChange={e =>
                                    setIsTerminalDarkMode(e.target.checked)
                                }
                            />
                            <label
                                htmlFor='toggle-terminal-dark-mode'
                                className={cn(
                                    'text-sm',
                                    isTerminalDarkMode
                                        ? 'text-gray-200'
                                        : 'text-gray-800'
                                )}>
                                Dark Mode
                            </label>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span
                            className={cn(
                                'text-sm',
                                isTerminalDarkMode
                                    ? 'text-gray-200'
                                    : 'text-gray-800'
                            )}>
                            Zoom:
                        </span>
                        <button
                            onClick={() =>
                                setZoom(prev => Math.max(0.5, prev - 0.1))
                            }
                            className={cn(
                                'text-sm hover:text-muted-foreground px-2 py-1 rounded-sm',
                                isTerminalDarkMode
                                    ? 'text-gray-200'
                                    : 'text-gray-800'
                            )}>
                            -
                        </button>
                        <span
                            className={cn(
                                'text-sm',
                                isTerminalDarkMode
                                    ? 'text-gray-200'
                                    : 'text-gray-800'
                            )}>
                            {Math.round(zoom * 100)}%
                        </span>
                        <button
                            onClick={() =>
                                setZoom(prev => Math.min(2, prev + 0.1))
                            }
                            className={cn(
                                'text-sm hover:text-muted-foreground px-2 py-1 rounded-sm',
                                isTerminalDarkMode
                                    ? 'text-gray-200'
                                    : 'text-gray-800'
                            )}>
                            +
                        </button>
                    </div>
                </span>
            </div>
            <div
                className='h-[calc(100vh-30rem)] overflow-y-auto p-4 scrollable'
                style={{fontSize: `${zoom}rem`}}>
                {loading && (
                    <div
                        className={cn(
                            'flex items-center justify-center p-4',
                            isTerminalDarkMode
                                ? 'text-gray-200'
                                : 'text-gray-800'
                        )}>
                        <span>Loading logs...</span>
                    </div>
                )}
                {!loading && error && (
                    <div
                        className={cn(
                            'flex items-center justify-center p-4 text-red-400',
                            isTerminalDarkMode
                                ? 'text-gray-200'
                                : 'text-gray-800'
                        )}></div>
                )}
                {!loading &&
                    !error &&
                    logContent.length === 0 &&
                    selectedFile && (
                        <div
                            className={cn(
                                'flex items-center justify-center p-4',
                                isTerminalDarkMode
                                    ? 'text-gray-200'
                                    : 'text-gray-800'
                            )}>
                            No log content found
                        </div>
                    )}
                {!loading && !error && (
                    <div>
                        {logContent.map((line, lineIdx) => (
                            <pre
                                key={lineIdx}
                                className={cn(
                                    'px-2 hover:bg-gray-700 rounded-sm transition-colors whitespace-pre-wrap break-all font-mono',
                                    isTerminalDarkMode
                                        ? 'hover:bg-gray-800'
                                        : 'hover:bg-gray-200'
                                )}>
                                {parseAnsiLine(line).map((part, partIdx) => (
                                    <span
                                        key={partIdx}
                                        className={cn(
                                            isTerminalDarkMode
                                                ? 'text-gray-200'
                                                : 'text-gray-800'
                                        )}>
                                        {part.text}
                                    </span>
                                ))}
                            </pre>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogViewer;
