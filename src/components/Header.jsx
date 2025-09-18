import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github as FeatherGithub, BookOpen as FeatherBookOpen, Sun as FeatherSun, Moon as FeatherMoon, Menu as FeatherMenu, X as FeatherX } from 'feather-icons-react'; // Import Feather icons
import { useNavigate } from 'react-router-dom';

const Header = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleDocsClick = () => {
    navigate('/docs');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              navigate('/');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PI</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PureIcons
            </h1>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="https://github.com/feathericons/feather"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FeatherGithub size={18} />
              <span>GitHub</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDocsClick}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <FeatherBookOpen size={18} />
              <span>Docs</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FeatherSun size={20} /> : <FeatherMoon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FeatherSun size={20} /> : <FeatherMoon size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FeatherX size={24} /> : <FeatherMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden mt-2 space-y-2"
          >
            <motion.a
              href="https://github.com/feathericons/feather"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              GitHub
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDocsClick}
              className="w-full text-left px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Docs
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
