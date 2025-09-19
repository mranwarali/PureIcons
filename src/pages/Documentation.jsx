import React from 'react'
import { Download, Code, Zap, Heart } from 'feather-icons-react' // Changed to named imports
import { motion } from 'framer-motion'

const Documentation = () => {
  const sections = [
    {
      id: 'installation',
      title: 'Installation',
      icon: <Download className="w-6 h-6" />
    },
    {
      id: 'usage',
      title: 'Usage',
      icon: <Code className="w-6 h-6" />
    },
    {
      id: 'customization',
      title: 'Customization',
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'contributing',
      title: 'Contributing',
      icon: <Heart className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Learn how to integrate PureIcons into your projects
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Table of Contents
          </h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200"
              >
                {section.icon}
                <span>{section.title}</span>
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Installation Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          id="installation"
          className="card p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
            <Download className="w-7 h-7 text-primary-500" />
            <span>Installation</span>
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                NPM Package
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Install PureIcons (using Feather Icons) via npm for React projects:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm">npm install feather-icons-react feather-icons</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Direct Download
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Download individual icons or the complete package from our browse page.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Usage Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          id="usage"
          className="card p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
            <Code className="w-7 h-7 text-primary-500" />
            <span>Usage</span>
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                React Components
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Import and use icons as React components from `feather-icons-react`:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-4">
                <code className="text-sm">{`import { Heart, Star, Download } from 'feather-icons-react'

function MyComponent() {
  return (
    <div>
      <Heart size={24} color="#ff6b6b" />
      <Star size={32} color="currentColor" strokeWidth={1.5} />
      <Download size={20} />
    </div>
  )
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                HTML & CSS (Raw SVG)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                You can get the raw SVG code from the icon modal on the browse page, or import from the `feather-icons` package directly:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm">{`import feather from 'feather-icons';

const heartSvg = feather.icons.heart.toSvg();
// Then inject heartSvg into your HTML or component

// Example of raw SVG structure:
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                CDN (CSS Icons)
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                For simple HTML/CSS projects, you can include Feather Icons via a CDN and use them with `data-feather` attributes. Add the following to your HTML `&lt;head&gt;` section:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-4">
                <code className="text-sm">{`<!-- In your HTML <head> -->
<script src="https://unpkg.com/feather-icons"></script>`}</code>
              </pre>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Then, use an `&lt;i&gt;` tag with the `data-feather` attribute and call `feather.replace()` before your closing `&lt;/body&gt;` tag:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm">{`<!-- In your HTML <body> -->
<i data-feather="heart"></i>
<i data-feather="star" class="text-yellow-500" style="width: 32px; height: 32px;"></i>

<!-- Before your closing </body> tag -->
<script>
  feather.replace();
</script>`}</code>
              </pre>
            </div>
          </div>
        </motion.section>

        {/* Customization Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          id="customization"
          className="card p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
            <Zap className="w-7 h-7 text-primary-500" />
            <span>Customization</span>
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Size
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Adjust icon size using the `size` prop for React components or CSS `width`/`height` for raw SVGs:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm">{`// React
<Heart size={32} />

// CSS
.icon {
  width: 32px;
  height: 32px;
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Color
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Change colors using the `color` prop for React components or CSS `stroke` property for SVGs:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm">{`// React
<Heart color="#ff6b6b" />
<Heart color="currentColor" />

// CSS
.icon {
  stroke: #ff6b6b; /* For Feather icons, stroke is used */
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Stroke Width
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Adjust stroke width using the `strokeWidth` prop for React components or CSS `stroke-width` property for SVGs:
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm">{`// React
<Heart strokeWidth={1} />

// CSS
.icon {
  stroke-width: 1;
}`}</code>
              </pre>
            </div>
          </div>
        </motion.section>

        {/* Contributing Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          id="contributing"
          className="card p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
            <Heart className="w-7 h-7 text-primary-500" />
            <span>Contributing</span>
          </h2>

          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400">
              We welcome contributions to PureIcons! Here's how you can help:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Icon Requests
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Submit icon requests via GitHub issues</li>
                  <li>• Provide clear use cases and examples</li>
                  <li>• Check existing issues to avoid duplicates</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Bug Reports
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Report bugs on GitHub</li>
                  <li>• Include browser and version info</li>
                  <li>• Provide reproduction steps</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Code Contributions
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Fork the repository</li>
                  <li>• Create feature branches</li>
                  <li>• Submit pull requests</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Documentation
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Improve existing docs</li>
                  <li>• Add usage examples</li>
                  <li>• Fix typos and errors</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 mt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Getting Started
              </h4>
              <pre className="bg-white dark:bg-gray-800 rounded p-3 text-sm overflow-x-auto">
                <code>{`git clone https://github.com/pureicons/pureicons.git
cd pureicons
npm install
npm run dev`}</code>
              </pre>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Documentation
