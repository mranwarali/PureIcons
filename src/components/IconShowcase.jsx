import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'feather-icons-react'
import { motion } from 'framer-motion'
import { iconData } from '../data/icons' // Import iconData
import IconModal from './IconModal' // Import IconModal

const IconShowcase = () => {
  const [selectedIcon, setSelectedIcon] = useState(null) // State to manage the modal

  // Select specific icons for the showcase, ensuring they exist in iconData
  const showcaseIconNames = [
    'home', 'user', 'heart', 'star', 'search', 'settings',
    'mail', 'phone', 'camera', 'music', 'video', 'download'
  ];
  const showcaseIcons = iconData.filter(icon => showcaseIconNames.includes(icon.name));

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Icon Collection Preview
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get a glimpse of our carefully curated icon collection
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
          {showcaseIcons.map((icon, index) => (
            <motion.div
              key={icon.id} // Use icon.id for unique key
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => setSelectedIcon(icon)} // Make it clickable
              className="card p-6 text-center icon-hover group"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-200">
                {icon.component ? (
                  <icon.component className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors duration-200" />
                ) : (
                  <div className="w-6 h-6 bg-red-200 text-red-800 flex items-center justify-center rounded text-xs font-bold">?</div>
                )}
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {icon.name}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/browse"
            className="inline-flex items-center btn-primary text-lg group"
          >
            View All Icons
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>

      {/* Icon Modal */}
      {selectedIcon && (
        <IconModal
          icon={selectedIcon}
          onClose={() => setSelectedIcon(null)}
        />
      )}
    </section>
  )
}

export default IconShowcase