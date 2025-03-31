import React from 'react';
import ArrContainer from './arrs/ArrContainer';
import GeneralContainer from './general/GeneralContainer';
import TaskContainer from './tasks/TaskContainer';
import GitContainer from './git/GitContainer';
import BackupContainer from './backup/BackupContainer';
import LogContainer from './log/LogContainer';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@ui/Tabs';

const SettingsPage = () => {
    return (
        <div>
            <Tabs defaultValue='git'>
                <TabsList className='my-3'>
                    <TabsTrigger value='git'>Database</TabsTrigger>
                    <TabsTrigger value='general'>General</TabsTrigger>
                    <TabsTrigger value='app'>External Apps</TabsTrigger>
                    <TabsTrigger value='tasks'>Tasks</TabsTrigger>
                    <TabsTrigger value='backup'>Backups</TabsTrigger>
                    <TabsTrigger value='logs'>Logs</TabsTrigger>
                </TabsList>

                <TabsContent value='git'>
                    <GitContainer />
                </TabsContent>
                <TabsContent value='general'>
                    <GeneralContainer />
                </TabsContent>
                <TabsContent value='app'>
                    <ArrContainer />
                </TabsContent>
                <TabsContent value='tasks'>
                    <TaskContainer />
                </TabsContent>
                <TabsContent value='backup'>
                    <BackupContainer />
                </TabsContent>
                <TabsContent value='logs'>
                    <LogContainer />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsPage;
