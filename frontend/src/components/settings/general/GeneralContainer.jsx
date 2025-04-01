// settings/general/GeneralContainer.jsx
import React, {useState, useEffect} from 'react';
import {Eye, EyeOff, Copy, RefreshCw, Check} from 'lucide-react';
import {
    fetchGeneralSettings,
    updateUsername,
    updatePassword,
    resetApiKey
} from '@api/settings';
import Alert from '@ui/Alert';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';

const GeneralContainer = () => {
    const [loading, setLoading] = useState(true);
    const [showApiKey, setShowApiKey] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showUsernameCurrentPassword, setShowUsernameCurrentPassword] =
        useState(false);
    const [showApiKeyCurrentPassword, setShowApiKeyCurrentPassword] =
        useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [formData, setFormData] = useState({
        apiKey: '',
        username: '',
        usernameCurrentPassword: '',
        password: '',
        confirmPassword: '',
        currentPassword: '',
        currentUsername: '',
        apiKeyCurrentPassword: ''
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const {username, api_key} = await fetchGeneralSettings();
            setFormData(prev => ({
                ...prev,
                apiKey: api_key,
                username: username,
                currentUsername: username,
                usernameCurrentPassword: '',
                password: '',
                confirmPassword: '',
                currentPassword: '',
                apiKeyCurrentPassword: ''
            }));
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyApiKey = async () => {
        await navigator.clipboard.writeText(formData.apiKey);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 1000);
    };

    const handleResetApiKey = async () => {
        if (!formData.apiKeyCurrentPassword) {
            Alert.error(
                'Please enter your current password to reset the API key.'
            );
            return;
        }

        const confirmed = window.confirm(
            'Are you sure you want to reset your API key? This action cannot be undone and your current key will stop working immediately.'
        );

        if (confirmed) {
            try {
                const response = await resetApiKey(
                    formData.apiKeyCurrentPassword
                );
                setFormData(prev => ({
                    ...prev,
                    apiKey: response.api_key,
                    apiKeyCurrentPassword: ''
                }));
            } catch (error) {
                console.error('Error resetting API key:', error);
            }
        }
    };

    const handleUsernameChange = e => {
        setFormData(prev => ({
            ...prev,
            username: e.target.value
        }));
    };

    const handleUsernameCurrentPasswordChange = e => {
        setFormData(prev => ({
            ...prev,
            usernameCurrentPassword: e.target.value
        }));
    };

    const handlePasswordChange = e => {
        const newPassword = e.target.value;
        setFormData(prev => ({
            ...prev,
            password: newPassword
        }));
    };

    const handleConfirmPasswordChange = e => {
        setFormData(prev => ({
            ...prev,
            confirmPassword: e.target.value
        }));
    };

    const handleCurrentPasswordChange = e => {
        setFormData(prev => ({
            ...prev,
            currentPassword: e.target.value
        }));
    };

    const handleApiKeyCurrentPasswordChange = e => {
        setFormData(prev => ({
            ...prev,
            apiKeyCurrentPassword: e.target.value
        }));
    };

    const handleSaveUsername = async () => {
        try {
            await updateUsername(
                formData.username,
                formData.usernameCurrentPassword
            );
            setFormData(prev => ({
                ...prev,
                currentUsername: formData.username,
                usernameCurrentPassword: ''
            }));
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    const handleSavePassword = async () => {
        if (formData.password !== formData.confirmPassword) {
            Alert.error('Passwords do not match');
            return;
        }

        const confirmed = window.confirm(
            'Are you sure you want to change your password? You will need to log in again.'
        );

        if (confirmed) {
            try {
                const response = await updatePassword(
                    formData.currentPassword,
                    formData.password
                );

                if (response.requireRelogin) {
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error updating password:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center h-32'>
                <RefreshCw className='w-6 h-6 animate-spin text-gray-400' />
            </div>
        );
    }

    const hasUsernameChanges = formData.username !== formData.currentUsername;

    return (
        <div className='flex flex-col gap-4'>
            <Container>
                <h2 className='text-xl font-bold text-foreground'>
                    API Settings
                </h2>
                <div className='flex flex-col gap-2'>
                    <label className='text-foreground'>API Key</label>
                    <div className='flex gap-2'>
                        <div className='relative flex-1'>
                            <Input
                                type={showApiKey ? 'text' : 'password'}
                                value={formData.apiKey}
                                readOnly
                            />
                            <Button
                                variant='icon'
                                className='hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 text-foreground hover:text-foreground/70 w-6 h-6 items-center justify-center'
                                onClick={() => setShowApiKey(!showApiKey)}>
                                {showApiKey ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </Button>
                        </div>
                        <Button
                            variant='outline'
                            className='hidden md:flex h-11 w-11'
                            onClick={handleCopyApiKey}
                            title='Copy API key'>
                            {copySuccess ? (
                                <Check size={18} className='text-blue-500' />
                            ) : (
                                <Copy size={18} />
                            )}
                        </Button>
                        <Button
                            variant='outline'
                            className='hidden md:flex h-11 w-11'
                            onClick={handleResetApiKey}
                            title='Reset API Key - This will invalidate your current key'>
                            <RefreshCw size={18} />
                        </Button>
                    </div>

                    <div className='relative flex-1'>
                        <Input
                            type={
                                showApiKeyCurrentPassword ? 'text' : 'password'
                            }
                            value={formData.apiKeyCurrentPassword}
                            onChange={handleApiKeyCurrentPasswordChange}
                            placeholder='Enter current password to reset API key'
                        />
                        <Button
                            variant='icon'
                            onClick={() =>
                                setShowApiKeyCurrentPassword(
                                    !showApiKeyCurrentPassword
                                )
                            }
                            className='hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 text-foreground hover:text-foreground/70 w-6 h-6 items-center justify-center'>
                            {showApiKeyCurrentPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </Button>
                    </div>

                    {/* Mobile Only - Copy and Reset API Key */}
                    <div className='md:hidden flex gap-4 mt-2'>
                        <Button
                            variant='outline'
                            size='lg'
                            onClick={handleResetApiKey}
                            title='Reset API Key - This will INVALIDATE your current key'
                            className='w-full'>
                            <RefreshCw size={18} />
                            <span>Reset API Key</span>
                        </Button>
                        <Button
                            size='lg'
                            onClick={handleCopyApiKey}
                            title='Copy API key'
                            className='w-full'>
                            {copySuccess ? (
                                <>
                                    <Check size={18} />
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={18} />
                                    <span>Copy API Key</span>
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Container>

            <Container>
                <h2 className='text-xl font-bold text-foreground'>
                    User Settings
                </h2>
                <div className='space-y-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-foreground'>Username</label>
                        <div className='space-y-2'>
                            <div className='flex gap-2'>
                                <Input
                                    type='text'
                                    value={formData.username}
                                    onChange={handleUsernameChange}
                                />
                            </div>

                            {hasUsernameChanges && (
                                <div className='flex flex-col gap-2 md:flex-row'>
                                    <div className='relative flex-1'>
                                        <Input
                                            type={
                                                showUsernameCurrentPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={
                                                formData.usernameCurrentPassword
                                            }
                                            onChange={
                                                handleUsernameCurrentPasswordChange
                                            }
                                            placeholder='Enter current password'
                                        />
                                        <Button
                                            variant='icon'
                                            onClick={() =>
                                                setShowUsernameCurrentPassword(
                                                    !showUsernameCurrentPassword
                                                )
                                            }
                                            className='absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center'>
                                            {showUsernameCurrentPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </Button>
                                    </div>
                                    <Button
                                        size='lg'
                                        onClick={handleSaveUsername}
                                        disabled={
                                            !formData.usernameCurrentPassword
                                        }
                                        title={
                                            !formData.usernameCurrentPassword
                                                ? 'Enter current password'
                                                : 'Save changes'
                                        }
                                        className={`ml-auto h-11 max-w-fit mt-2 md:mt-0 ${
                                            formData.usernameCurrentPassword
                                                ? 'cursor-pointer'
                                                : 'cursor-not-allowed'
                                        }`}>
                                        Update Username
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-foreground'>Password</label>
                        <div className='flex flex-col gap-2'>
                            <div className='relative flex-1'>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handlePasswordChange}
                                    placeholder='Enter new password'
                                />
                                <Button
                                    variant='icon'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className='hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center'>
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </Button>
                            </div>

                            {formData.password && (
                                <>
                                    <div className='relative flex-1'>
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={formData.confirmPassword}
                                            onChange={
                                                handleConfirmPasswordChange
                                            }
                                            placeholder='Confirm new password'
                                        />
                                        <Button
                                            variant='icon'
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className='hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center'>
                                            {showConfirmPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </Button>
                                    </div>

                                    <div className='flex flex-col gap-2 md:flex-row'>
                                        <div className='relative flex-1'>
                                            <Input
                                                type={
                                                    showCurrentPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                value={formData.currentPassword}
                                                onChange={
                                                    handleCurrentPasswordChange
                                                }
                                                placeholder='Enter current password'
                                            />
                                            <Button
                                                variant='icon'
                                                onClick={() =>
                                                    setShowCurrentPassword(
                                                        !showCurrentPassword
                                                    )
                                                }
                                                className='hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center'>
                                                {showCurrentPassword ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}
                                            </Button>
                                        </div>
                                        <Button
                                            size='lg'
                                            onClick={handleSavePassword}
                                            disabled={
                                                !formData.password ||
                                                !formData.confirmPassword ||
                                                !formData.currentPassword ||
                                                formData.password !==
                                                    formData.confirmPassword
                                            }
                                            title={
                                                !formData.password
                                                    ? 'Enter a new password'
                                                    : !formData.confirmPassword
                                                    ? 'Confirm your new password'
                                                    : !formData.currentPassword
                                                    ? 'Enter your current password'
                                                    : formData.password !==
                                                      formData.confirmPassword
                                                    ? 'Passwords do not match'
                                                    : 'Save new password'
                                            }
                                            className={`ml-auto h-11 max-w-fit mt-2 md:mt-0 ${
                                                formData.password &&
                                                formData.confirmPassword &&
                                                formData.currentPassword &&
                                                formData.password ===
                                                    formData.confirmPassword
                                                    ? 'cursor-pointer'
                                                    : 'cursor-not-allowed'
                                            }`}>
                                            Update Password
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default GeneralContainer;
