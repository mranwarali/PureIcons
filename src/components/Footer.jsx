import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Heart, ArrowUp } from 'feather-icons-react'

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleExternalLink = (url) => {
    window.open(url, '_blank')
  }

  const handleMailto = (email) => {
    window.location.href = `mailto:${email}`
  }

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                PureIcons
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              A modern, free & open-source icon library with 100+ beautiful SVG icons. 
              Perfect for web developers and designers.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/pureicons"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/pureicons"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/browse" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200">
                  Browse Icons
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200">
                  Documentation
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleExternalLink('https://github.com/feathericons/feather')} // Placeholder URL
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 text-left"
                >
                  API Reference
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleExternalLink('https://www.figma.com/community/plugin/744047966581015514/feather-icons')} // Placeholder URL
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 text-left"
                >
                  Figma Plugin
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleExternalLink('https://www.sketch.com/plugins/pureicons')} // Placeholder URL
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 text-left"
                >
                  Sketch Plugin
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleMailto('requests@pureicons.com?subject=Icon%20Request')} // Mailto link
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200 text-left"
                >
                  Icon Requests
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; 2025 PureIcons. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center mt-4 md:mt-0">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for developers
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  )
}

export default Footer
