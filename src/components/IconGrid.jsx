import React from 'react'
import { motion } from 'framer-motion'
import IconCard from './IconCard'

const IconGrid = ({ icons, viewMode, onIconSelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (icons.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No icons found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search terms or filters
        </p>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={
        viewMode === 'grid'
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
          : "space-y-2"
      }
    >
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          variants={itemVariants}
        >
          <IconCard
            icon={icon}
            viewMode={viewMode}
            onSelect={() => onIconSelect(icon)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default IconGrid