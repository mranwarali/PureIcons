import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, Copy, Download, Smartphone, Feather, ArrowRight } from 'feather-icons-react' // Changed to named imports
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import FeatureCard from '../components/FeatureCard'
import IconShowcase from '../components/IconShowcase'

const Home = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized SVG icons that load instantly and scale perfectly at any size."
    },
    {
      icon: <Copy className="w-8 h-8" />,
      title: "Copy & Paste",
      description: "Get SVG code or React components instantly. No complex installation required."
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Multiple Formats",
      description: "Download as SVG, PNG, or get the entire icon pack as a ZIP file."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Friendly",
      description: "Responsive design ensures perfect browsing experience on all devices."
    },
    {
      icon: <Feather className="w-8 h-8" />, // Changed from Palette to Feather
      title: "Customizable",
      description: "Easy to customize colors, stroke width, and size to match your design."
    },
    {
      icon: <ArrowRight className="w-8 h-8" />,
      title: "Developer First",
      description: "Built by developers for developers with clean code and documentation."
    }
  ]

  return (
    <div className="animate-fade-in">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose PureIcons?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built for modern web development with performance and ease of use in mind
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Icon Showcase */}
      <IconShowcase />

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to enhance your project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start browsing our collection of beautiful icons and integrate them into your project today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="inline-flex items-center justify-center bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Browse Icons
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/docs"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-500 transition-all duration-200"
              >
                View Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home