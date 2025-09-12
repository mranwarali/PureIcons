import React, { useState, useMemo, useEffect, useRef, useTransition } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import IconGrid from './components/IconGrid';
import IconModal from './components/IconModal';
import Documentation from './components/Documentation';
import DocsPage from './components/DocsPage';
import { iconData } from './data/icons';
import { generateSVGString } from './utils/iconUtils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const iconsPerPage = 20; // Display 20 icons per page

  const [isPending, startTransition] = useTransition();

  const iconGridRef = useRef(null);

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

  // Debounce search term with useTransition
  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        setDebouncedSearchTerm(searchTerm);
        setCurrentPage(1); // Reset to first page on new search
      });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Handler for category change, wrapped in startTransition
  const handleCategoryChange = (categoryId) => {
    startTransition(() => {
      setSelectedCategory(categoryId);
      setCurrentPage(1); // Reset to first page on category change
    });
  };

  const filteredIcons = useMemo(() => {
    return iconData.filter(icon => {
      const matchesSearch = debouncedSearchTerm === '' ||
        icon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        icon.tags.some(tag => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
        icon.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || icon.category.toLowerCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearchTerm, selectedCategory]);

  // Pagination logic
  const indexOfLastIcon = currentPage * iconsPerPage;
  const indexOfFirstIcon = indexOfLastIcon - iconsPerPage;
  const currentIcons = filteredIcons.slice(indexOfFirstIcon, indexOfLastIcon);
  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);

  // Derived state for overall searching/filtering status
  const isSearching = searchTerm !== debouncedSearchTerm || isPending;

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIcon(null);
  };

  const handleDocsClick = () => {
    setShowDocs(true);
  };

  const handleBackFromDocs = () => {
    setShowDocs(false);
  };

  const handleBrowseIcons = () => {
    if (iconGridRef.current) {
      iconGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextPage = () => {
    startTransition(() => {
      setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    });
  };

  const handlePrevPage = () => {
    startTransition(() => {
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    });
  };

  const handleDownloadPackage = async () => {
    setIsDownloading(true);
    const zip = new JSZip();
    const folder = zip.folder("pureicons");

    for (const icon of iconData) {
      const svgContent = generateSVGString(icon.svgData, 24);
      folder.file(`${icon.id}.svg`, svgContent);
    }

    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "pureicons.zip");
      alert('PureIcons package downloaded!');
    } catch (error) {
      console.error('Error generating or downloading zip:', error);
      alert('Failed to download icon package.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (showDocs) {
    return <DocsPage onBack={handleBackFromDocs} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onDocsClick={handleDocsClick} theme={theme} toggleTheme={toggleTheme} />
      <Hero onBrowseIcons={handleBrowseIcons} onDownloadPackage={handleDownloadPackage} isDownloading={isDownloading} />

      <main className="py-16 flex-grow" ref={iconGridRef}>
        <div className="container max-w-full sm:max-w-4xl md:max-w-6xl lg:max-w-7xl px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse Our Icon Collection</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-4xl mx-auto mb-6">
              {iconData.length} carefully crafted icons ready to use in your projects. Our icon library is designed to provide developers and designers with a versatile set of SVG icons that are easy to customize and integrate into any web or mobile application. Whether you need icons for UI elements, navigation, or branding, PureIcons offers a comprehensive solution that enhances your project's visual appeal and usability.
            </p>
          </motion.div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            totalResults={filteredIcons.length} // Pass total filtered results
            isSearching={isSearching}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <IconGrid
            icons={currentIcons} // Pass only icons for the current page
            onIconClick={handleIconClick}
            isSearching={isSearching}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </div>
      </main>

      {/* Why Choose PureIcons Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose PureIcons?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              PureIcons stands out as the premier choice for developers and designers seeking high-quality, versatile icon solutions. Our commitment to excellence and user experience sets us apart in the crowded icon market.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">100% Free & Open Source</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All our icons are completely free to use in any project, personal or commercial. No hidden fees, no attribution required, and fully open-source under the MIT license.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast Performance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Optimized SVG icons that load instantly and scale perfectly at any size. Our icons are designed for performance, ensuring your applications remain fast and responsive.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Developer Friendly</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with developers in mind, our icons integrate seamlessly with popular frameworks and libraries. Easy to customize, style, and implement in your projects.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Join thousands of developers and designers who trust PureIcons for their icon needs. Start building better user interfaces today with our comprehensive icon collection.
            </p>
          </motion.div>
        </div>
      </section>

      <Documentation />

      <footer className="bg-gray-900 text-white py-12 dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PI</span>
            </div>
            <h3 className="text-2xl font-bold">PureIcons</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Free and open-source icons for everyone. Built with ❤️ by <a href="" className='font-medium text-green-500'>Anwar Ali</a> for the community.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/lucide-icons/lucide" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <button
              onClick={handleDocsClick}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Documentation
            </button>
            <a href="https://github.com/lucide-icons/lucide/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">License</a>
          </div>
        </div>
      </footer>

      <IconModal
        icon={selectedIcon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
