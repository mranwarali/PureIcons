import React, { useState, useMemo } from 'react'
import { Download, Search, Grid, List } from 'feather-icons-react' // Changed to named imports
import { motion } from 'framer-motion'
import IconGrid from '../components/IconGrid'
import IconModal from '../components/IconModal'
import { iconData } from '../data/icons'

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [showFilters, setShowFilters] = useState(false) // This state is not currently used, can be removed if not planned for future use

  const categories = [
    'all', 'ui', 'social', 'media', 'files', 'communication', 
    'navigation', 'commerce', 'weather', 'devices'
  ]

  const filteredIcons = useMemo(() => {
    return iconData.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          icon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const handleDownloadAll = () => {
    // Implementation for downloading all icons as ZIP
    console.log('Downloading all icons...')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Browse Icons
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover {iconData.length} beautiful icons for your projects
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button
                onClick={handleDownloadAll}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download All</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 shadow-sm'
                      : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                  } transition-all duration-200`}
                >
                  <Grid className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 shadow-sm'
                      : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                  } transition-all duration-200`}
                >
                  <List className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {filteredIcons.length} icons found
              {searchTerm && (
                <span> for "{searchTerm}"</span>
              )}
            </p>
          </div>

          <IconGrid
            icons={filteredIcons}
            viewMode={viewMode}
            onIconSelect={setSelectedIcon}
          />
        </motion.div>

        {/* Icon Modal */}
        {selectedIcon && (
          <IconModal
            icon={selectedIcon}
            onClose={() => setSelectedIcon(null)}
          />
        )}
      </div>
    </div>
  )
}

export default Browse