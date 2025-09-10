import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Download } from 'lucide-react';
import Spinner from './Spinner'; // Import Spinner

const Hero = ({ onBrowseIcons, onDownloadPackage, isDownloading }) => { // Accept isDownloading
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900 py-20 transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div> {/* Added pointer-events-none */}

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 mb-6">
              <Sparkles size={16} className="text-blue-600" />
              <span>100% Free & Open Source</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Beautiful Icons for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Every Project
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our comprehensive collection of 100+ carefully crafted SVG icons designed specifically for developers and designers. These icons are completely free to use, open-source, and optimized for web projects. Easy to integrate with popular frameworks like React, Vue, and Angular, and perfect for enhancing your user interfaces with beautiful, consistent iconography that makes your projects stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onBrowseIcons}
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all relative z-10"
            >
              <Zap size={20} />
              <span>Browse Icons</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDownloadPackage}
              disabled={isDownloading} // Disable button when downloading
              className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all relative z-10 ${
                isDownloading
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              {isDownloading ? (
                <Spinner size={20} color="currentColor" />
              ) : (
                <Download size={20} />
              )}
              <span>{isDownloading ? 'Downloading...' : 'Download Package'}</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto text-center"
          >
            {[
              { number: "100+", label: "Free Icons" },
              { number: "0", label: "Cost Forever" },
              { number: "∞", label: "Usage Rights" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;