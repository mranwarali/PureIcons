import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Download, Code, ExternalLink, Check } from 'lucide-react';
import { generateSVGString, generateReactEmbed, generateCDNLink, downloadIcon, copyToClipboard } from '../utils/iconUtils';

const IconModal = ({ icon, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(24);
  const [selectedFormat, setSelectedFormat] = useState('svg');
  const [copiedItem, setCopiedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('html');

  if (!icon) return null;

  const IconComponent = icon.component;
  const sizes = [16, 20, 24, 32, 48, 64];
  const formats = ['svg', 'png'];
  const tabs = [
    { id: 'html', label: 'HTML', icon: Code },
    { id: 'react', label: 'React', icon: Code },
    { id: 'cdn', label: 'CDN', icon: ExternalLink }
  ];

  const handleCopy = (text, item) => {
    copyToClipboard(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const getCodeExample = () => {
    switch (activeTab) {
      case 'html':
        // For HTML embed, we now provide the direct SVG string
        return generateSVGString(icon.svgData, selectedSize); // Pass svgData
      case 'react':
        return generateReactEmbed(icon.pascalName); // Use icon.pascalName
      case 'cdn':
        return generateCDNLink(icon.id, selectedFormat);
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 bg-white dark:bg-gray-800 rounded-2xl z-50 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-xl">
                    <IconComponent size={32} className="text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{icon.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 capitalize">{icon.category} • {icon.tags.join(', ')}</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-auto">
                <div className="grid md:grid-cols-2 gap-8 p-6">
                  {/* Preview Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Preview</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center">
                      <motion.div
                        key={selectedSize}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block"
                      >
                        <IconComponent size={selectedSize * 2} className="text-gray-700 dark:text-gray-300" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Size</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map(size => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSize(size)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedSize === size
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-700 text-blue-700 dark:text-blue-200'
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="text-sm font-medium">{size}px</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Download Section */}
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Download</h4>
                    <div className="flex gap-2">
                      {formats.map(format => (
                        <motion.button
                          key={format}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => downloadIcon(icon.id, icon.name, format, selectedSize, icon.svgData)} // Pass icon.svgData
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                        >
                          <Download size={16} />
                          <span>{format.toUpperCase()}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Code Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Integration Code</h3>
                    
                    {/* Tabs */}
                    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
                      {tabs.map(tab => {
                        const TabIcon = tab.icon;
                        return (
                          <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                              activeTab === tab.id
                                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                            }`}
                          >
                            <TabIcon size={16} />
                            <span>{tab.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Code Display */}
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{getCodeExample()}</code>
                      </pre>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(getCodeExample(), activeTab)}
                        className="absolute top-2 right-2 flex items-center space-x-1 px-3 py-1 bg-white/10 backdrop-blur text-white rounded-md hover:bg-white/20 transition-all"
                      >
                        {copiedItem === activeTab ? (
                          <>
                            <Check size={14} />
                            <span className="text-xs">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span className="text-xs">Copy</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Icon Info */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Icon Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Name:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{icon.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Category:</span>
                        <span className="font-medium capitalize text-gray-900 dark:text-white">{icon.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tags:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{icon.tags.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Format:</span>
                        <span className="font-medium text-gray-900 dark:text-white">SVG Vector</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default IconModal;