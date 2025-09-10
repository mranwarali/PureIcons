import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Package, Code, Download, Zap, Copy, Check, Terminal, Globe, Palette, Plus, Mail, Lock, Eye, EyeOff, Search, Menu, User, ShoppingCart, Heart, Star, MessageCircle } from 'lucide-react';
import { generateSVGString } from '../utils/iconUtils';

const DocsPage = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: Zap },
    { id: 'installation', title: 'Installation', icon: Package },
    { id: 'usage', title: 'Usage Examples', icon: Code },
    { id: 'customization', title: 'Customization', icon: Palette },
    { id: 'cdn', title: 'CDN Usage', icon: Globe },
    { id: 'contributing', title: 'Contributing', icon: Plus }
  ];

  const CodeBlock = ({ code, language = 'bash', id }) => (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-gray-400 text-sm font-mono">{language}</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center space-x-1 px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
        >
          {copiedCode === id ? <Check size={12} /> : <Copy size={12} />}
          <span>{copiedCode === id ? 'Copied!' : 'Copy'}</span>
        </motion.button>
      </div>
      <pre className="p-4 text-gray-100 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  const renderContent = () => {
    // Get a sample SVG for the direct SVG example
    const sampleHeartSvgCode = generateSVGString(null, 24); // Using null as svgData since @lucide/core is removed

    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Getting Started with PureIcons</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                PureIcons provides 100+ beautiful, free, and open-source icons that you can use in any project.
                Our icons are based on Lucide React and can be used in multiple ways.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                What makes PureIcons special?
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">100% Free forever</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">No attribution required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">SVG vector format</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Multiple integration methods</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Consistent design system</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Regular updates</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Start</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Choose your preferred method:</p>

              <div className="grid md:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection('installation')}
                  className="p-4 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all text-left"
                >
                  <Package className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">NPM Package</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Install via npm for React projects</p>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection('cdn')}
                  className="p-4 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg hover:border-green-300 dark:hover:border-green-700 transition-all text-left"
                >
                  <Globe className="w-8 h-8 text-green-600 mb-2" />
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">CDN Links</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Direct links for quick usage</p>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection('installation')}
                  className="p-4 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg hover:border-purple-300 dark:hover:border-purple-700 transition-all text-left"
                >
                  <Download className="w-8 h-8 text-purple-600 mb-2" />
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Download</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Download individual icons</p>
                </motion.button>
              </div>
            </div>
          </div>
        );

      case 'installation':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Installation Guide</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Multiple ways to install and use PureIcons icons in your projects.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <Package className="mr-2 text-blue-600" />
                  React/Next.js Projects
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For React-based projects, install Lucide React which powers our icons:
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">NPM Installation:</h4>
                    <CodeBlock
                      code="npm install lucide-react"
                      id="npm-install"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Yarn Installation:</h4>
                    <CodeBlock
                      code="yarn add lucide-react"
                      id="yarn-install"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Usage:</h4>
                    <CodeBlock
                      code={`import { Heart, Star, ArrowRight } from 'lucide-react';

function MyComponent() {
  return (
    <div>
      <Heart size={24} color="#ff0000" />
      <Star size={32} className="text-yellow-500" />
      <ArrowRight size={20} strokeWidth={1.5} />
    </div>
  );
}`}
                      language="jsx"
                      id="react-usage"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <Terminal className="mr-2 text-green-600" />
                  HTML/CSS Projects
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For vanilla HTML projects, you can use our icons in several ways:
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Method 1: Direct SVG</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Copy SVG code directly from our icon modals:</p>
                    <CodeBlock
                      code={sampleHeartSvgCode}
                      language="html"
                      id="html-svg"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Method 2: Download and use</h4>
                    <CodeBlock
                      code={`<!-- After downloading the icon -->
<img src="icons/heart.svg" alt="Heart" width="24" height="24">`}
                      language="html"
                      id="html-img"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                  <Globe className="mr-2 text-purple-600" />
                  CDN Usage
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Quick setup without any installation:
                </p>

                <CodeBlock
                  code={`<!-- Include Lucide via CDN -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

<!-- Use in HTML -->
<i data-lucide="heart"></i>
<i data-lucide="star" data-size="32"></i>

<!-- Initialize -->
<script>
  lucide.createIcons();
</script>`}
                  language="html"
                  id="cdn-usage"
                />
              </div>
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Usage Examples</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Practical examples of how to use PureIcons icons in different scenarios.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Basic React Usage</h3>
                <CodeBlock
                  code={`import { Search, Menu, User, ShoppingCart } from 'lucide-react';

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Menu size={24} />
      <div className="flex items-center space-x-2">
        <Search size={20} />
        <input placeholder="Search..." />
      </div>
      <div className="flex items-center space-x-4">
        <User size={20} />
        <ShoppingCart size={20} />
      </div>
    </header>
  );
}`}
                  language="jsx"
                  id="basic-react"
                />
              </div>

              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Styling with Tailwind CSS</h3>
                <CodeBlock
                  code={`import { Heart, Star, MessageCircle } from 'lucide-react';

function SocialActions() {
  return (
    <div className="flex items-center space-x-4">
      <button className="flex items-center space-x-1 text-red-500 hover:text-red-600">
        <Heart size={18} />
        <span>Like</span>
      </button>

      <button className="flex items-center space-x-1 text-yellow-500 hover:text-yellow-600">
        <Star size={18} />
        <span>Favorite</span>
      </button>

      <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600">
        <MessageCircle size={18} />
        <span>Comment</span>
      </button>
    </div>
  );
}`}
                  language="jsx"
                  id="tailwind-styling"
                />
              </div>

              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Form with Icons</h3>
                <CodeBlock
                  code={`import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="email"
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Login
      </button>
    </form>
  );
}`}
                  language="jsx"
                  id="form-icons"
                />
              </div>
            </div>
          </div>
        );

      case 'customization':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Customization Options</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Tailor PureIcons to perfectly match your project's aesthetic.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Adjusting Size and Color
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  For React components, you can easily change size and color using props:
                </p>
                <CodeBlock
                  code={`import { Sun } from 'lucide-react';

function MyComponent() {
  return (
    <div className="flex items-center space-x-4">
      <Sun size={16} color="orange" />
      <Sun size={24} color="#FFD700" />
      <Sun size={32} className="text-yellow-500" />
    </div>
  );
}`}
                  language="jsx"
                  id="size-color"
                />
              </div>

              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Stroke Width and Other Props
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Lucide React components accept all SVG attributes as props:
                </p>
                <CodeBlock
                  code={`import { Feather } from 'lucide-react';

function MyComponent() {
  return (
    <div className="flex items-center space-x-4">
      <Feather size={24} strokeWidth={1} />
      <Feather size={24} strokeWidth={2} />
      <Feather size={24} strokeWidth={3} color="blue" />
    </div>
  );
}`}
                  language="jsx"
                  id="stroke-width"
                />
              </div>

              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  CSS Styling
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You can also style icons using CSS classes, especially with Tailwind CSS:
                </p>
                <CodeBlock
                  code={`import { Bell } from 'lucide-react';

function NotificationIcon() {
  return (
    <div className="relative">
      <Bell className="w-6 h-6 text-blue-500 hover:text-blue-700 transition-colors" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
    </div>
  );
}`}
                  language="jsx"
                  id="css-styling"
                />
              </div>
            </div>
          </div>
        );

      case 'cdn':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">CDN Usage</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Integrate PureIcons quickly into any HTML project using CDN links.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                How to use Lucide via CDN
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Include the Lucide script in your HTML and then use `data-lucide` attributes:
              </p>
              <CodeBlock
                code={`<!DOCTYPE html>
<html lang="en">
<head>
  <title>My Page</title>
  <!-- ... other head elements ... -->
</head>
<body>
  <h2>My Awesome Icons</h2>

  <!-- Use icons with data-lucide attribute -->
  <i data-lucide="home"></i>
  <i data-lucide="settings" data-size="32" data-color="blue"></i>
  <i data-lucide="heart" data-stroke-width="1.5"></i>

  <!-- Include Lucide via CDN (UMD build) -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
  <script>
    // Initialize Lucide icons after the DOM is loaded
    lucide.createIcons();
  </script>
</body>
</html>`}
                language="html"
                id="cdn-full-example"
              />
            </div>
          </div>
        );

      case 'contributing':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contributing to PureIcons</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                We welcome contributions from the community to make PureIcons even better!
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  How to Contribute
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  PureIcons is built on top of Lucide, so contributions typically involve:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Reporting bugs or suggesting new features on our GitHub.</li>
                  <li>Improving documentation or examples.</li>
                  <li>Helping with code reviews.</li>
                  <li>Contributing new icons to the upstream Lucide project.</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400">
                  For more details, please visit our GitHub repository.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Join Our Community!</h3>
                <p className="text-lg mb-6 opacity-90">
                  Your contributions help us grow and provide a better resource for everyone.
                </p>
                <motion.a
                  href="https://github.com/lucide-icons/lucide" // Link to Lucide's GitHub as PureIcons is based on it
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  <Plus size={20} />
                  <span>Contribute on GitHub</span>
                </motion.a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Icons</span>
        </motion.button>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.nav
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="md:col-span-1 sticky top-24 self-start"
          >
            <ul className="space-y-2">
              {sections.map((section) => {
                const SectionIcon = section.icon;
                return (
                  <motion.li
                    key={section.id}
                    whileHover={{ x: 5 }}
                    className="transform transition-transform"
                  >
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center space-x-3 w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <SectionIcon size={18} />
                      <span>{section.title}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>

          {/* Main Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-3"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocsPage;