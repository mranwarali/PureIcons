import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconCard from './IconCard';
import Spinner from './Spinner';
import { ArrowLeft as FeatherArrowLeft, ArrowRight as FeatherArrowRight } from 'feather-icons-react'; // Import Feather icons

const IconGrid = ({ icons, onIconClick, isSearching, currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="container mx-auto px-4 relative min-h-[300px]">
      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 z-10 rounded-xl"
          >
            <Spinner size={48} className="text-blue-500" />
          </motion.div>
        ) : (
          <motion.div
            key="icons"
            layout
            // Updated grid-cols to make cards narrower and gap to 4
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            <AnimatePresence>
              {icons.map((icon, index) => (
                <motion.div
                  key={icon.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.02 }}
                >
                  {icon.placeholder ? (
                    <div className="w-full h-24" aria-hidden="true" />
                  ) : (
                    <IconCard icon={icon} onIconClick={onIconClick} />
                  )}
                </motion.div>
              ))}</AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {!isSearching && icons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">💡</div> {/* Changed emoji to something more generic */}
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No icons found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or category filter</p>
        </motion.div>
      )}

      {/* Pagination Controls */}
      {!isSearching && totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center space-x-4 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
            }`}
          >
            <FeatherArrowLeft size={20} />
            <span>Previous</span>
          </motion.button>

          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentPage === totalPages
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
            }`}
          >
            <span>Next</span>
            <FeatherArrowRight size={20} />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default IconGrid;