import React, { useState } from 'react'
import { Code, Download, X, Check, Copy, Image } from 'feather-icons-react'
import feather from 'feather-icons/dist/feather.js'
import { motion, AnimatePresence } from 'framer-motion'

const IconModal = ({ icon, onClose }) => {
  const [activeTab, setActiveTab] = useState('svg')
  const [copySuccess, setCopySuccess] = useState(false)
  const [iconSize, setIconSize] = useState(24)

  const IconComponent = icon.component

  // Fallback if IconComponent is undefined
  const RenderModalIcon = IconComponent ? (
    <IconComponent className="w-6 h-6 text-primary-500" />
  ) : (
    <div className="w-6 h-6 bg-red-200 text-red-800 flex items-center justify-center rounded text-xs font-bold">?</div>
  )

  const RenderPreviewIcon = IconComponent ? (
    <IconComponent size={iconSize} className="text-gray-700 dark:text-gray-300" />
  ) : (
    <div className="w-24 h-24 bg-red-200 text-red-800 flex items-center justify-center rounded-2xl text-lg font-bold">?</div>
  )

  const handleCopy = async (text) => {
    console.log('Attempting to copy text:', text);

    let copiedSuccessfully = false;

    // Attempt using modern Clipboard API first (preferred)
    try {
      await navigator.clipboard.writeText(text);
      copiedSuccessfully = true;
      console.log('Copied successfully using navigator.clipboard.writeText.');
    } catch (err) {
      console.error('Failed to copy using navigator.clipboard.writeText:', err);
      // Fallback to deprecated document.execCommand('copy')
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; // Prevent scrolling to bottom
        textarea.style.opacity = '0'; // Hide it
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copiedSuccessfully = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (copiedSuccessfully) {
          console.log('Copied successfully using document.execCommand("copy").');
        } else {
          console.error('Failed to copy using document.execCommand("copy").');
        }
      } catch (execErr) {
        console.error('Error during document.execCommand("copy") fallback:', execErr);
      }
    }

    if (copiedSuccessfully) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } else {
      // Optionally, show a user-friendly error message if both methods fail
      alert('Failed to copy code to clipboard. Please try again or copy manually.');
    }
  };

  const getSvgCode = () => {
    const featherIcon = feather.icons[icon.name]
    let svgString;
    if (!featherIcon) {
      // Fallback SVG code - template literals handle newlines and quotes correctly
      svgString = `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Icon not found in feather-icons core library -->
</svg>`;
    } else {
      // Get SVG from feather-icons library - it returns a clean SVG string
      svgString = featherIcon.toSvg({
        width: iconSize,
        height: iconSize,
        'stroke-width': 2,
        'stroke': 'currentColor',
        'fill': 'none',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      });
    }
    console.log('Generated SVG Code (from getSvgCode):', svgString);
    return svgString;
  }

  const getReactCode = () => {
    const componentName = icon.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    // React component code - template literals handle newlines and quotes correctly
    const reactString = `import { ${componentName} } from 'feather-icons-react'

function MyComponent() {
  return (
    <${componentName} 
      size={${iconSize}} 
      color="currentColor" 
      strokeWidth={2} // Default stroke width for Feather icons
    />
  )
}`;
    console.log('Generated React Code (from getReactCode):', reactString);
    return reactString;
  }

  const getCssClassCode = () => {
    const className = `icon-${icon.name}`;
    return `<div class="${className}"></div>`;
  };

  const handleDownload = (format) => {
    // Implementation for downloading icon in different formats
    console.log(`Downloading ${icon.name} as ${format}`)
  }

  const tabs = [
    { id: 'svg', label: 'SVG', icon: <Code className="w-4 h-4" /> },
    { id: 'react', label: 'React', icon: <Code className="w-4 h-4" /> },
    { id: 'css-class', label: 'CSS Class', icon: <Code className="w-4 h-4" /> },
    { id: 'download', label: 'Download', icon: <Download className="w-4 h-4" /> }
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                {RenderModalIcon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                  {icon.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {icon.category} icon
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Preview */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-4">
                {RenderPreviewIcon}
              </div>
              
              {/* Size Control */}
              <div className="flex items-center justify-center space-x-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Size:
                </label>
                <input
                  type="range"
                  min="16"
                  max="64"
                  value={iconSize}
                  onChange={(e) => setIconSize(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                  {iconSize}px
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === 'svg' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">SVG Code</h3>
                    <button
                      onClick={() => handleCopy(getSvgCode())}
                      className="flex items-center space-x-2 px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm"
                    >
                      {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-sm overflow-x-auto">
                    <code>{getSvgCode()}</code>
                  </pre>
                </div>
              )}

              {activeTab === 'react' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">React Component</h3>
                    <button
                      onClick={() => handleCopy(getReactCode())}
                      className="flex items-center space-x-2 px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm"
                    >
                      {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-sm overflow-x-auto">
                    <code>{getReactCode()}</code>
                  </pre>
                </div>
              )}

              {activeTab === 'css-class' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">CSS Class</h3>
                    <button
                      onClick={() => handleCopy(getCssClassCode())}
                      className="flex items-center space-x-2 px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm"
                    >
                      {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-sm overflow-x-auto">
                    <code>{getCssClassCode()}</code>
                  </pre>
                </div>
              )}

              {activeTab === 'download' && (
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">Download Options</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleDownload('svg')}
                      className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                    >
                      <Code className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-2" />
                      <span className="font-medium text-gray-900 dark:text-white">SVG File</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Vector format</span>
                    </button>
                    <button
                      onClick={() => handleDownload('png')}
                      className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                    >
                      <Image className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-2" />
                      <span className="font-medium text-gray-900 dark:text-white">PNG File</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{iconSize}x{iconSize}px</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {icon.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default IconModal