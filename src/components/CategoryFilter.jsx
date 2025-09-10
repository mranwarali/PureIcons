import React from 'react';
import { motion } from 'framer-motion';
import { iconCategories } from '../data/icons';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {iconCategories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {category.name}
            <span className={`ml-2 text-sm ${
              selectedCategory === category.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
            }`}>
              ({category.count})
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryFilter;