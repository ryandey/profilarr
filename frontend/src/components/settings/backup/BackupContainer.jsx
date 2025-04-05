import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {
    listBackups,
    createBackup,
    restoreBackup,
    deleteBackup,
    importBackup,
    downloadBackup
} from '@api/backup';
import Alert from '@ui/Alert';
import {Loader, Upload, RefreshCw} from 'lucide-react';
import BackupCard from './BackupCard';
import Container from '@/components/ui/Container';
import {Button} from '@/components/ui/button';

const BackupContainer = () => {
    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [restoringBackup, setRestoringBackup] = useState(null);
    const [deletingBackup, setDeletingBackup] = useState(null);

    useEffect(() => {
        fetchBackups();
    }, []);

    const fetchBackups = async () => {
        setLoading(true);
        try {
            const fetchedBackups = await listBackups();
            setBackups(fetchedBackups);
        } catch (error) {
            Alert.error('Failed to fetch backups');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBackup = async () => {
        try {
            await createBackup();
            Alert.success('Backup created successfully');
            fetchBackups();
        } catch (error) {
            Alert.error('Failed to create backup');
        }
    };

    const handleRestoreBackup = async filename => {
        if (
            window.confirm(
                'Are you sure you want to restore this backup? This will overwrite your current configuration.'
            )
        ) {
            setRestoringBackup(filename);
            try {
                await restoreBackup(filename);
                Alert.success('Backup restored successfully');
                fetchBackups();
            } catch (error) {
                Alert.error('Failed to restore backup');
            } finally {
                setRestoringBackup(null);
            }
        }
    };

    const handleDeleteBackup = async filename => {
        if (window.confirm('Are you sure you want to delete this backup?')) {
            setDeletingBackup(filename);
            try {
                await deleteBackup(filename);
                Alert.success('Backup deleted successfully');
                fetchBackups();
            } catch (error) {
                Alert.error('Failed to delete backup');
            } finally {
                setDeletingBackup(null);
            }
        }
    };

    const handleImportBackup = async event => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            await importBackup(file);
            Alert.success('Backup imported and restored successfully');
            fetchBackups();
        } catch (error) {
            Alert.error('Failed to import and restore backup');
        }
    };

    const handleDownloadBackup = async filename => {
        try {
            const response = await downloadBackup(filename);
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            Alert.error('Failed to download backup');
        }
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center p-8'>
                <Loader className='animate-spin' size={24} />
            </div>
        );
    }

    const headers = ['Name', 'Date/Time', 'Size', 'Actions'];

    return (
        <Container className='overflow-x-auto p-0 md:p-0 space-y-4'>
            <div className='flex justify-between items-center px-6 pt-6 md:px-8 md:pt-8'>
                <h2 className='text-xl font-bold text-foreground'>
                    Backup Management
                </h2>

                <div className='flex gap-2'>
                    <Button
                        variant='outline'
                        onClick={() =>
                            document.getElementById('backupFile').click()
                        }>
                        <Upload className='inline-block mr-2' size={16} />
                        Restore From Zip
                        <input
                            type='file'
                            id='backupFile'
                            onChange={handleImportBackup}
                            accept='.zip'
                            className='hidden'
                        />
                    </Button>
                    <Button onClick={handleCreateBackup}>
                        <RefreshCw className='inline-block mr-2' size={16} />
                        Create Backup
                    </Button>
                </div>
            </div>
            <div className='overflow-x-auto'>
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
                        {backups.length === 0 ? (
                            <tr>
                                <td
                                    colSpan='4'
                                    className='text-center py-4 text-foreground'>
                                    No backups available
                                </td>
                            </tr>
                        ) : (
                            backups.map(backup => (
                                <BackupCard
                                    key={backup.filename}
                                    backup={backup}
                                    onRestore={handleRestoreBackup}
                                    onDelete={handleDeleteBackup}
                                    onDownload={handleDownloadBackup}
                                    isRestoring={
                                        restoringBackup === backup.filename
                                    }
                                    isDeleting={
                                        deletingBackup === backup.filename
                                    }
                                    className={
                                        backups[backups.length - 1] === backup
                                            ? 'border-b-0'
                                            : ''
                                    }
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default BackupContainer;
