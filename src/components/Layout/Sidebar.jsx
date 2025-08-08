import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiHome, FiZap, FiGrid, FiBarChart3, FiSettings, FiX, FiCpu } = FiIcons;

const Sidebar = ({ onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: FiHome },
    { name: 'Automations', href: '/automations', icon: FiZap },
    { name: 'Integrations', href: '/integrations', icon: FiGrid },
    { name: 'Analytics', href: '/analytics', icon: FiBarChart3 },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  return (
    <div className="w-70 bg-dark-900 border-r border-dark-700 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-dark-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiCpu} className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Onyx AI</h1>
            <p className="text-dark-400 text-xs">AXiM Systems</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-dark-800 text-dark-400 hover:text-white transition-colors"
        >
          <SafeIcon icon={FiX} className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                      : 'text-dark-300 hover:text-white hover:bg-dark-800'
                  }`
                }
              >
                <SafeIcon 
                  icon={item.icon} 
                  className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" 
                />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-dark-700">
        <div className="bg-dark-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-white text-sm font-medium">System Online</p>
              <p className="text-dark-400 text-xs">All services operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;