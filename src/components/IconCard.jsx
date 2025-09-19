import React from 'react'
import { motion } from 'framer-motion'

const IconCard = ({ icon, viewMode, onSelect }) => {
  const IconComponent = icon.component

  // Fallback if IconComponent is undefined
  const RenderIcon = IconComponent ? (
    <IconComponent className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors duration-200" />
  ) : (
    <div className="w-8 h-8 bg-red-200 text-red-800 flex items-center justify-center rounded text-xs font-bold">?</div>
  )

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
        onClick={onSelect}
        className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg mr-4">
          {IconComponent ? (
            <IconComponent className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <div className="w-6 h-6 bg-red-200 text-red-800 flex items-center justify-center rounded text-xs font-bold">?</div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-white capitalize">
            {icon.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {icon.category} • {icon.tags.join(', ')}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-200 group"
    >
      <div className="flex items-center justify-center h-16 mb-3">
        {RenderIcon}
      </div>
      <h3 className="text-sm font-medium text-gray-900 dark:text-white text-center capitalize truncate">
        {icon.name}
      </h3>
    </motion.div>
  )
}

export default IconCard