import React from 'react';
import {
    Loader,
    Unlink,
    GitBranch,
    GitCommit,
    Star,
    CircleDot,
    GitFork
} from 'lucide-react';
import Tooltip from '@ui/Tooltip';
import {Button} from '@/components/ui/Button';

const RepoAvatar = ({avatarUrl, repoFullName, avatarColor, firstLetter}) => {
    if (avatarUrl) {
        return (
            <img
                src={avatarUrl}
                alt={`${repoFullName} avatar`}
                className='w-10 h-10 rounded-lg shadow-lg'
                onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                }}
            />
        );
    }

    return (
        <div
            className={`w-10 h-10 ${avatarColor} rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
            {firstLetter}
        </div>
    );
};

const RepoStats = ({repoStats}) => {
    if (!repoStats) {
        return <Loader size={14} className='animate-spin' />;
    }

    // For private repositories or when stats can't be loaded
    if (repoStats.isPrivate) {
        return (
            <div className='flex items-center space-x-1'>
                <span className='text-xs px-2 py-0.5 rounded-md bg-gray-700/70 border border-gray-600 text-gray-300 flex items-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-3 w-3 mr-1'
                        viewBox='0 0 20 20'
                        fill='currentColor'>
                        <path
                            fillRule='evenodd'
                            d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                            clipRule='evenodd'
                        />
                    </svg>
                    Private
                </span>
            </div>
        );
    }

    return (
        <>
            <div className='flex items-center space-x-1'>
                <Star size={14} className='text-gray-400' />
                <span className='text-xs'>{repoStats.stars}</span>
            </div>
            <div className='flex items-center space-x-1'>
                <CircleDot size={14} className='text-gray-400' />
                <span className='text-xs'>{repoStats.issues}</span>
            </div>
            <div className='flex items-center space-x-1'>
                <GitFork size={14} className='text-gray-400' />
                <span className='text-xs'>{repoStats.forks}</span>
            </div>
        </>
    );
};

const ActiveRepo = ({
    settings,
    status,
    avatarUrl,
    repoStats,
    repoFullName,
    avatarColor,
    firstLetter,
    onUnlinkRepo,
    loadingAction,
    onShowBranches,
    onShowCommits
}) => {
    return (
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0'>
            <div className='flex items-center space-x-4'>
                <RepoAvatar
                    avatarUrl={avatarUrl}
                    repoFullName={repoFullName}
                    avatarColor={avatarColor}
                    firstLetter={firstLetter}
                />
                <div>
                    {/* Repository Name */}
                    <a
                        href={settings.gitRepo}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-lg font-bold text-foreground hover:text-blue-400 transition-colors'>
                        {repoFullName}
                    </a>

                    {/* Repository Stats */}
                    <div className='flex items-center gap-3 mt-1 text-muted-foreground'>
                        <RepoStats repoStats={repoStats} />
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                {/* Repository Branch */}
                <Button
                    variant='secondary'
                    onClick={onShowBranches}
                    disabled={!status}>
                    <GitBranch className='text-blue-400' size={16} />
                    <span>{status ? status.branch : 'Loading...'}</span>
                </Button>

                {/* Local Commits */}
                {status && status.local_commits && (
                    <div className='bg-gray-700/50 px-3 py-2 rounded-lg'>
                        <span className='text-sm text-gray-200'>
                            <span className='font-medium'>
                                {status.local_commits.length}
                            </span>{' '}
                            local commits
                        </span>
                    </div>
                )}

                {/* Repository Commits */}
                <Button
                    variant='secondary'
                    onClick={onShowCommits}
                    disabled={!status}>
                    <GitCommit size={16} />
                    Commits
                </Button>

                {/* Unlink Repository */}
                <Tooltip content='Unlink this repository'>
                    <Button
                        variant='destructive'
                        onClick={onUnlinkRepo}
                        disabled={loadingAction !== ''}>
                        {loadingAction === 'unlink_repo' ? (
                            <Loader size={16} className='animate-spin' />
                        ) : (
                            <Unlink size={16} />
                        )}
                        Unlink
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};

export default ActiveRepo;
