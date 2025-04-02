// components/auth/LoginPage.js
import React, {useState} from 'react';
import {login} from '@api/auth';
import Alert from '@ui/Alert';
import {Info, Shield, KeyRound} from 'lucide-react';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/input';
import {ThemeToggle} from '@/components/ui/ThemeToggle';
import {Button} from '@/components/ui/button';

const LoginPage = ({onLoginComplete}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        setLoading(true);
        try {
            await login(username, password);
            Alert.success('Login successful');
            onLoginComplete();
        } catch (error) {
            if (error.message.includes('Too many failed attempts')) {
                Alert.warning(error.message);
            } else {
                Alert.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center p-4 gap-4'>
            <div className='flex flex-col gap-4 md:flex-row md:gap-6 xl:gap-8'>
                <Container className=' w-full flex flex-col gap-4 md:max-w-md'>
                    {/* Main Login Card */}
                    <div className='flex items-center gap-4 mb-2'>
                        <KeyRound className='h-8 w-8 text-blue-500' />
                        <h2 className='text-3xl font-bold text-foreground'>
                            Login
                        </h2>
                    </div>

                    <form
                        className='flex flex-col gap-4'
                        onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor='username'
                                className='block text-foreground mb-1'>
                                Username
                            </label>
                            <Input
                                id='username'
                                name='username'
                                type='text'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                placeholder='Enter your username'
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='password'
                                className='block text-foreground mb-1'>
                                Password
                            </label>
                            <Input
                                id='password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                placeholder='Enter your password'
                                autoFocus
                            />
                        </div>

                        <Button
                            type='submit'
                            size='lg'
                            className='w-full'
                            disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>

                    {/* Info Card */}
                    <div className='mt-2 space-y-2 bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-800/30 dark:border-blue-800/80'>
                        <h3 className='text-sm font-bold'>Having trouble?</h3>
                        <p className='text-xs text-foreground'>
                            For security reasons, there is no automated password
                            recovery process. Too many failed attempts will
                            temporarily lock your account to protect against
                            unauthorized access.
                        </p>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default LoginPage;
