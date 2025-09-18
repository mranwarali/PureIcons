import React, { useState, useMemo, useEffect, useRef, useTransition } from 'react';

import { motion } from 'framer-motion';
import Hero from './Hero';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import IconGrid from './IconGrid';
import IconModal from './IconModal';
import Documentation from './Documentation';
import { iconData } from '../data/icons';
import { generateSVGString } from '../utils/iconUtils';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ theme, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const iconsPerPage = 20; // Display 20 icons per page

  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const iconGridRef = useRef(null);

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
    const filtered = iconData.filter(icon => {
      const matchesSearch = debouncedSearchTerm === '' ||
        icon.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        icon.tags.some(tag => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
        icon.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || icon.category.toLowerCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
    console.log("Filtered icons count:", filtered.length); // Added log
    return filtered;
  }, [debouncedSearchTerm, selectedCategory]);

  // Pagination logic
  const indexOfLastIcon = currentPage * iconsPerPage;
  const indexOfFirstIcon = indexOfLastIcon - iconsPerPage;
  let currentIcons = filteredIcons.slice(indexOfFirstIcon, indexOfLastIcon);
  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);

  // Responsive columns count state
  const [columnsCount, setColumnsCount] = useState(6);

  useEffect(() => {
    const updateColumnsCount = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnsCount(2); // sm
      else if (width < 768) setColumnsCount(3); // md
      else if (width < 1024) setColumnsCount(4); // lg
      else if (width < 1280) setColumnsCount(5); // xl
      else setColumnsCount(6); // 2xl and above
    };

    updateColumnsCount();
    window.addEventListener('resize', updateColumnsCount);
    return () => window.removeEventListener('resize', updateColumnsCount);
  }, []);

  // Pad currentIcons with placeholders to fill last row based on columnsCount
  const remainder = currentIcons.length % columnsCount;
  if (remainder !== 0) {
    const placeholdersToAdd = columnsCount - remainder;
    for (let i = 0; i < placeholdersToAdd; i++) {
      currentIcons.push({ id: `placeholder-${i}`, placeholder: true });
    }
  }

  // Derived state for overall searching/filtering status
  const isSearching = searchTerm !== debouncedSearchTerm || isPending;

  const handleIconClick = (icon) => {
    if (icon.placeholder) return; // Ignore clicks on placeholders
    setSelectedIcon(icon);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIcon(null);
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

  console.log("Rendering HomePage. Total icons in iconData:", iconData.length); // Added log
  console.log("Current icons for display (after filter/pagination):", currentIcons.length); // Added log

  return (
    <>
      <Hero onBrowseIcons={handleBrowseIcons} onDownloadPackage={handleDownloadPackage} isDownloading={isDownloading} />

      <main className="py-16" ref={iconGridRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse Our Icon Collection</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {iconData.length} carefully crafted icons ready to use in your projects
            </p>
          </motion.div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            totalResults={filteredIcons.length}
            isSearching={isSearching}
          />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <IconGrid
            icons={currentIcons}
            onIconClick={handleIconClick}
            isSearching={isSearching}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </div>
      </main>

      <Documentation />

      <IconModal
        icon={selectedIcon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default HomePage;