import React from 'react';
import { useTheme } from '../../shared/context/ThemeContext';
import { ThemeType } from '../../types';
import { Navbar } from '../UI/Navbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  const getThemeClasses = () => {
    switch (theme) {
      case ThemeType.AMOLED:
        return 'bg-black text-white selection:bg-purple-500';
      case ThemeType.MINIMAL:
        return 'bg-gray-50 text-gray-900 selection:bg-gray-200';
      case ThemeType.SOFT:
        return 'bg-[#E3D5CA] text-[#433A36] selection:bg-[#C9A690]';
      case ThemeType.GLASS:
      default:
        return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white selection:bg-pink-500';
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ease-in-out ${getThemeClasses()} overflow-x-hidden relative`}>
       {theme === ThemeType.GLASS && (
         <div className="fixed inset-0 opacity-20 pointer-events-none z-0" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
       )}
       {theme === ThemeType.SOFT && (
         <div className="fixed inset-0 opacity-40 pointer-events-none z-0 bg-gradient-to-tr from-[#D6C2B4] to-transparent"></div>
       )}
      <Navbar />
      <main className="relative z-10 w-full">
        {children}
      </main>
    </div>
  );
};