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
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onIconClick(icon)}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 cursor-pointer transition-all group"
    >
      <div className="flex flex-col items-center space-y-3">
        <motion.div
          whileHover={{ rotate: 5 }}
          className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-800 dark:group-hover:to-purple-800 transition-all"
        >
          <IconComponent size={32} className="text-gray-700 dark:text-gray-300" />
        </motion.div>
        
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{icon.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{icon.category}</p>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-1 mt-2"
        >
          {icon.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IconCard;