import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import {useState, useEffect} from 'react';
import RegexPage from './components/regex/RegexPage';
import FormatPage from './components/format/FormatPage';
import ProfilePage from './components/profile/ProfilePage';
import SettingsPage from './components/settings/SettingsPage';
import SetupPage from './components/auth/SetupPage';
import LoginPage from './components/auth/LoginPage';
import Navbar from '@ui/Navbar';
import Footer from '@ui/Footer';
import {ToastContainer} from 'react-toastify';
import {checkSetupStatus} from '@api/auth';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from '@ui/ErrorBoundary';
import {ThemeProvider} from './components/theme-provider';

function App() {
    const [authState, setAuthState] = useState({
        checking: true,
        needsSetup: false,
        needsLogin: false,
        error: null
    });

    // Prevent layout shifts from scrollbar
    useEffect(() => {
        document.body.style.overflowY = 'scroll';
        return () => {
            document.body.style.overflowY = '';
        };
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const status = await checkSetupStatus();
                setAuthState({
                    checking: false,
                    needsSetup: status.needsSetup,
                    needsLogin: status.needsLogin,
                    error: status.error
                });
            } catch (error) {
                setAuthState({
                    checking: false,
                    needsSetup: false,
                    needsLogin: false,
                    error: 'Unable to connect to server'
                });
            }
        };

        checkAuth();
    }, []);

    if (authState.checking) {
        return (
            <>
                <div>Loading...</div>
                <ToastContainer
                    position='top-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='dark'
                />
            </>
        );
    }

    if (authState.needsSetup) {
        return (
            <>
                <SetupPage
                    onSetupComplete={() =>
                        setAuthState({
                            ...authState,
                            needsSetup: false,
                            needsLogin: false
                        })
                    }
                />
                <ToastContainer
                    position='top-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='dark'
                />
            </>
        );
    }

    if (authState.needsLogin) {
        return (
            <>
                <LoginPage
                    onLoginComplete={() =>
                        setAuthState({...authState, needsLogin: false})
                    }
                />
                <ToastContainer
                    position='top-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='dark'
                />
            </>
        );
    }

    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <Router>
                <ErrorBoundary>
                    <div className='min-h-screen flex flex-col bg-background text-foreground'>
                        {/* <Navbar darkMode={darkMode} setDarkMode={setDarkMode} /> */}
                        <Navbar />
                        <div className='max-w-(--breakpoint-2xl) mx-auto px-4 sm:px-6 lg:px-8 mt-2 grow flex-1 w-full'>
                            <Routes>
                                <Route path='/regex' element={<RegexPage />} />
                                <Route
                                    path='/format'
                                    element={<FormatPage />}
                                />
                                <Route
                                    path='/profile'
                                    element={<ProfilePage />}
                                />
                                <Route
                                    path='/settings'
                                    element={<SettingsPage />}
                                />
                                <Route
                                    path='/'
                                    element={<Navigate to='/settings' />}
                                />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </ErrorBoundary>
            </Router>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </ThemeProvider>
    );
}
export default App;
