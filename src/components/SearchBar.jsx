import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as FeatherSearch, X as FeatherX } from 'feather-icons-react'; // Import Feather icons
import Spinner from './Spinner';

const SearchBar = ({ searchTerm, onSearchChange, totalResults, isSearching }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-2xl mx-auto"
      >
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused
              ? "0 10px 25px rgba(0, 0, 0, 0.1)"
              : "0 4px 6px rgba(0, 0, 0, 0.05)"
          }}
          className="relative"
        >
          {isSearching ? (
            <Spinner size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500" />
          ) : (
            <FeatherSearch
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
          )}

          <input
            type="text"
            placeholder="Search icons by name, category, or tags..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-12 pr-12 py-4 text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all"
          />

          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <FeatherX size={18} />
            </motion.button>
          )}
        </motion.div>

        {searchTerm && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-center text-gray-600 dark:text-gray-400"
          >
            Found {totalResults} icon{totalResults !== 1 ? 's' : ''} matching "{searchTerm}"
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SearchBar;