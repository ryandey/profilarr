import React from 'react';
import {Link, Loader} from 'lucide-react';
import GithubIcon from '@logo/GitHub.svg';
import {Button} from '@/components/ui/Button';

const EmptyRepo = ({onLinkRepo, loadingAction}) => {
    return (
        <div className='flex flex-col items-center space-y-4 lg:items-center lg:flex-row lg:space-y-0 lg:space-x-8'>
            <img
                src={GithubIcon}
                alt='GitHub'
                className='w-16 h-16 filter dark:invert lg:w-12 lg:h-12'
            />
            <div className='grow text-center mb-8 lg:text-left lg:mb-0'>
                <h2 className='text-lg font-medium text-foreground'>
                    No Repository Connected
                </h2>
                <p className='text-sm text-muted-foreground'>
                    Profilarr leverages Git to create an open-source
                    configuration sharing system. Connect to the{' '}
                    <a
                        href='https://github.com/Dictionarry-Hub/database'
                        className='text-blue-500 hover:underline'
                        target='_blank'
                        rel='noopener noreferrer'>
                        Dictionarry Database
                    </a>{' '}
                    or any external database to get started.
                </p>
            </div>
            <Button
                aria-label='Link Repository'
                onClick={onLinkRepo}
                size='lg'
                className={`${
                    loadingAction ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loadingAction !== ''}>
                {loadingAction === 'link_repo' ? (
                    <Loader size={16} className='animate-spin' />
                ) : (
                    <Link size={16} />
                )}
                Link Repository
            </Button>
        </div>
    );
};

export default EmptyRepo;
