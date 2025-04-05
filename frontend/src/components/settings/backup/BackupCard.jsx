import React from 'react';
import {Loader, Download, Trash2, RefreshCw} from 'lucide-react';
import Tooltip, {TooltipContent, TooltipTrigger} from '../../ui/Tooltip';

const BackupCard = ({
    backup,
    onRestore,
    onDelete,
    onDownload,
    isRestoring,
    isDeleting,
    className
}) => {
    const formatDateTime = dateString => new Date(dateString).toLocaleString();

    const formatSize = size =>
        size ? `${(size / 1024 / 1024).toFixed(2)} MB` : 'N/A';

    return (
        <tr className={`bg-background/10 border-b border-border ${className}`}>
            <td className='py-4 px-4'>
                <div className='flex items-center gap-3'>
                    <span className='text-foreground'>{backup.filename}</span>
                </div>
            </td>
            <td className='py-4 px-4 text-foreground'>
                {formatDateTime(backup.created_at)}
            </td>
            <td className='py-4 px-4 text-foreground'>
                {formatSize(backup.size)}
            </td>
            <td className='py-4 px-4 flex justify-end gap-2'>
                {/* Restore */}
                <div className='group relative'>
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger>
                            <button
                                onClick={() => onRestore(backup.filename)}
                                disabled={isRestoring}
                                className='p-2 rounded-md bg-primary hover:bg-primary/80 disabled:opacity-50 transition-colors cursor-pointer'>
                                {isRestoring ? (
                                    <Loader
                                        className='animate-spin text-foreground invert'
                                        size={16}
                                    />
                                ) : (
                                    <RefreshCw
                                        size={16}
                                        className='text-foreground invert'
                                    />
                                )}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>Restore Backup</TooltipContent>
                    </Tooltip>
                </div>

                {/* Download */}
                <div className='group relative'>
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger>
                            <button
                                onClick={() => onDownload(backup.filename)}
                                className='p-2 rounded-md bg-primary hover:bg-primary/80 disabled:opacity-50 transition-colors cursor-pointer'>
                                <Download
                                    size={16}
                                    className='text-foreground invert'
                                />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>Download Backup</TooltipContent>
                    </Tooltip>
                </div>

                {/* Delete */}
                <div className='group relative'>
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger>
                            <button
                                onClick={() => onDelete(backup.filename)}
                                disabled={isDeleting}
                                className='p-2 rounded-md bg-primary hover:bg-primary/80 disabled:opacity-50 transition-colors cursor-pointer'>
                                {isDeleting ? (
                                    <Loader
                                        className='animate-spin text-foreground invert'
                                        size={16}
                                    />
                                ) : (
                                    <Trash2
                                        size={16}
                                        className='text-foreground invert'
                                    />
                                )}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Backup</TooltipContent>
                    </Tooltip>
                </div>
            </td>
        </tr>
    );
};

export default BackupCard;
