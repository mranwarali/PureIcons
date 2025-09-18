import React from 'react';
import { motion } from 'framer-motion';
import { Frown as FeatherFrown } from 'feather-icons-react'; // Import Feather icon
import { useNavigate } from 'react-router-dom';

// Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Variants for individual items
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Variants for the Frown icon with a subtle bounce on hover
const iconVariants = {
  initial: { y: -20, opacity: 0, rotate: -10 },
  animate: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.2,
    },
  },
  hover: {
    y: [0, -5, 0],
    transition: {
      repeat: Infinity,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 p-4"
    >
      <motion.div
        variants={iconVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="mb-6"
      >
        <FeatherFrown size={80} className="text-blue-600 dark:text-blue-400" />
      </motion.div>

      <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-4">
        404
      </motion.h1>
      <motion.h2 variants={itemVariants} className="text-2xl font-semibold mb-4">
        Page Not Found
      </motion.h2>
      <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
      >
        Go to Homepage
      </motion.button>
    </motion.div>
  );
};

export default NotFound;