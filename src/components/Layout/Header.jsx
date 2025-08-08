import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiMenu, FiBell, FiUser, FiActivity } = FiIcons;

const Header = ({ onMenuClick, sidebarOpen }) => {
  return (
    <header className="bg-white border-b border-dark-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-dark-100 text-dark-600 transition-colors"
          >
            <SafeIcon icon={FiMenu} className="w-5 h-5" />
          </motion.button>
          
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-dark-800">
              AI Automation Engine
            </h2>
            <p className="text-sm text-dark-500">
              Internal Infrastructure Management
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* System Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
            <SafeIcon icon={FiActivity} className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Operational
            </span>
          </div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg hover:bg-dark-100 text-dark-600 transition-colors"
          >
            <SafeIcon icon={FiBell} className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
          </motion.button>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark-100 text-dark-600 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="w-4 h-4 text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium">
              Admin
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;