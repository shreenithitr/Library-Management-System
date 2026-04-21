import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = ({ setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'Books', value: 'books' },
    { label: 'Issue/Return', value: 'issue' },
    { label: 'Users', value: 'users' },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">
              B
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              BiblioCore
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.value}
                onClick={() => setActivePage(item.value)}
                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-cyan-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden pb-4 space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setActivePage(item.value);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
