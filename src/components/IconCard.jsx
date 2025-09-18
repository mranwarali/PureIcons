import React from 'react';
import { motion } from 'framer-motion';

const IconCard = ({ icon, onIconClick }) => {
  const IconComponent = icon.component;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onIconClick(icon)}
      // Reduced height to h-36
      className="bg-white dark:bg-gray-800 p-2 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-all group h-36 overflow-hidden flex flex-col justify-between group-hover:bg-blue-50 dark:group-hover:bg-gray-700"
    >
      <div className="flex flex-col items-center space-y-1 flex-grow">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl group-hover:from-blue-200 group-hover:to-purple-200 dark:group-hover:from-blue-800 dark:group-hover:to-purple-800 transition-all flex-shrink-0"
        >
          {/* Render the Feather Icon component, size remains 32 */}
          <IconComponent size={32} className="text-gray-800 dark:text-gray-200" />
        </motion.div>
        
        <div className="text-center mt-1 flex-grow-0">
          <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">
            {icon.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize truncate">
            {icon.category}
          </p>
        </div>
      </div>
        
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="flex flex-wrap justify-center gap-1 mt-1 flex-shrink-0"
      >
        {icon.tags.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full truncate max-w-[calc(50%-0.25rem)]"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default IconCard;