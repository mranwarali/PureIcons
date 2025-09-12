import React from 'react';
import { motion } from 'framer-motion';
import { Code, Download, Zap, Package } from 'lucide-react';
import { generateSVGString } from '../utils/iconUtils'; // Import generateSVGString

const Documentation = () => {
  // Get a sample SVG for the direct SVG example
  // Since @lucide/core is removed, we use a placeholder SVG string
  const sampleSvgCode = generateSVGString(null, 24); // Pass null as svgData

  const methods = [
    {
      icon: Code,
      title: 'Direct SVG',
      description: 'Copy and paste SVG code directly into your HTML',
      code: sampleSvgCode // Use dynamically generated SVG
    },
    {
      icon: Download,
      title: 'Download Files',
      description: 'Download icons as SVG or PNG files',
      code: `<!-- After downloading -->
<img src=\"icon-name.svg\" alt=\"Icon\" width=\"24\" height=\"24\">`
    },
    {
      icon: Zap,
      title: 'CDN Links',
      description: 'Use our CDN for fast loading',
      code: `<!-- Lucide icons are typically used as React components or embedded SVGs. -->
<!-- Direct CDN links for individual SVGs are not standard for Lucide. -->
<!-- Consider embedding SVG directly or using the React component. -->`
    },
    {
      icon: Package,
      title: 'React Components',
      description: 'Import as React components (Lucide React)',
      code: `import { Activity } from 'lucide-react';

<Activity size={24} color=\"#3b82f6\" strokeWidth={2} />`
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How to Use PureIcons
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Multiple ways to integrate our icons into your projects.
            Choose what works best for your workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {methods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all overflow-x-auto"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg">
                    <IconComponent size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{method.title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
                
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-gray-100 text-sm">
                    <code>{method.code}</code>
                  </pre>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
            <p className="text-lg mb-6 opacity-90">
              Check out our GitHub repository for more examples, documentation,
              and community support.
            </p>
            <motion.a
              href="https://github.com/lucide-icons/lucide" // Added GitHub link
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              View on GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Documentation;