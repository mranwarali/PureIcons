import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DocsPage from './components/DocsPage';
import NotFound from './components/NotFound';

function App() {
  // Theme state management
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <footer className="bg-gray-900 text-white py-6 dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PI</span>
            </div> */}
            {/* <h3 className="text-2xl font-bold">PureIcons</h3> */}
          </div>
          <p className="text-gray-400 mb-6">
            Free and open-source icons for everyone. Built with ❤️ by Anwar Ali for the community.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/feathericons/feather" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
            <a href="https://github.com/feathericons/feather/blob/master/LICENSE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">License</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;