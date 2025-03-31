import {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ThemeToggle} from './ThemeToggle';
import Logo from '@ui/Logo';

function Navbar() {
    const [tabOffset, setTabOffset] = useState(0);
    const [tabWidth, setTabWidth] = useState(0);
    const tabsRef = useRef({});
    const location = useLocation();
    const [isInitialized, setIsInitialized] = useState(false);

    const getActiveTab = pathname => {
        if (pathname === '/' || pathname === '') return 'settings';
        if (pathname.startsWith('/regex')) return 'regex';
        if (pathname.startsWith('/format')) return 'format';
        if (pathname.startsWith('/profile')) return 'profile';
        if (pathname.startsWith('/settings')) return 'settings';
        return 'settings';
    };

    const activeTab = getActiveTab(location.pathname);

    const updateTabPosition = () => {
        if (tabsRef.current[activeTab]) {
            const tab = tabsRef.current[activeTab];
            setTabOffset(tab.offsetLeft);
            setTabWidth(tab.offsetWidth);
            if (!isInitialized) {
                setIsInitialized(true);
            }
        }
    };

    useLayoutEffect(() => {
        updateTabPosition();
    }, [activeTab]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(updateTabPosition);
        if (tabsRef.current[activeTab]) {
            resizeObserver.observe(tabsRef.current[activeTab]);
        }
        return () => resizeObserver.disconnect();
    }, [activeTab]);

    return (
        <nav className='bg-linear-to-br from-gray-800 to-gray-900 border-b border-gray-700 shadow-xl backdrop-blur-xs'>
            <div className='max-w-(--breakpoint-2xl) mx-auto px-4 sm:px-6 lg:px-8 relative'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center space-x-8'>
                        <div className='flex items-center gap-3'>
                            <Logo className='h-10 w-10' />
                            <h1 className='text-2xl font-bold text-white'>
                                profilarr
                            </h1>
                        </div>
                        <div className='relative flex space-x-2'>
                            {isInitialized && (
                                <div
                                    className='absolute top-0 bottom-0 bg-gray-900 rounded-md transition-all duration-300'
                                    style={{
                                        left: `${tabOffset}px`,
                                        width: `${tabWidth}px`
                                    }}></div>
                            )}
                            <Link
                                to='/regex'
                                ref={el => (tabsRef.current['regex'] = el)}
                                className={`px-3 py-2 rounded-md text-sm font-medium relative z-10 ${
                                    activeTab === 'regex'
                                        ? 'text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}>
                                Regex Patterns
                            </Link>
                            <Link
                                to='/format'
                                ref={el => (tabsRef.current['format'] = el)}
                                className={`px-3 py-2 rounded-md text-sm font-medium relative z-10 ${
                                    activeTab === 'format'
                                        ? 'text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}>
                                Custom Formats
                            </Link>
                            <Link
                                to='/profile'
                                ref={el => (tabsRef.current['profile'] = el)}
                                className={`px-3 py-2 rounded-md text-sm font-medium relative z-10 ${
                                    activeTab === 'profile'
                                        ? 'text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}>
                                Quality Profiles
                            </Link>
                            <Link
                                to='/settings'
                                ref={el => (tabsRef.current['settings'] = el)}
                                className={`px-3 py-2 rounded-md text-sm font-medium relative z-10 ${
                                    activeTab === 'settings'
                                        ? 'text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}>
                                Settings
                            </Link>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
