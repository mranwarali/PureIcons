import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, Play } from 'feather-icons-react'
import { motion } from 'framer-motion'

const Hero = () => {
  const handleWatchDemo = () => {
    // Replace with your actual demo video URL
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); 
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Free & Open Source
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Beautiful Icons for{' '}
              <span className="text-primary-500">Modern Web</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover 100+ carefully crafted SVG icons. Copy code, download files, 
              or integrate seamlessly into your React projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/browse"
                className="inline-flex items-center justify-center btn-primary text-lg group"
              >
                Start Browsing
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <button 
                onClick={handleWatchDemo}
                className="inline-flex items-center justify-center btn-secondary text-lg"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start space-x-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Icons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">0$</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cost</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">MIT</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">License</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <div className="grid grid-cols-4 gap-6">
                {/* Icon Grid Preview */}
                {Array.from({ length: 16 }, (_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                    className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="w-6 h-6 bg-primary-500 rounded group-hover:scale-110 transition-transform duration-200"></div>
                  </motion.div>
                ))}
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
              >
                SVG
              </motion.div>
              
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
              >
                React
              </motion.div>
            </div>
            
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl blur-3xl opacity-10 -z-10 transform scale-110"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero