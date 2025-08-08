import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiPlay, FiPause, FiSettings, FiClock, FiTrendingUp, FiZap, FiCalendar } = FiIcons;

const AutomationCard = ({ automation }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-dark-600 bg-dark-100';
    }
  };

  const getTriggerIcon = (trigger) => {
    switch (trigger) {
      case 'schedule': return FiCalendar;
      case 'event': return FiZap;
      default: return FiClock;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-dark-100 hover:shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-dark-900 mb-2">
            {automation.name}
          </h3>
          <p className="text-dark-600 text-sm">
            {automation.description}
          </p>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(automation.status)}`}>
          {automation.status}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-dark-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-dark-600">Success Rate</span>
          </div>
          <p className="text-lg font-bold text-dark-900">{automation.successRate}%</p>
        </div>
        
        <div className="bg-dark-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <SafeIcon icon={getTriggerIcon(automation.trigger)} className="w-4 h-4 text-primary-600" />
            <span className="text-xs font-medium text-dark-600">Trigger</span>
          </div>
          <p className="text-sm font-medium text-dark-900 capitalize">{automation.trigger}</p>
        </div>
      </div>

      {/* Integrations */}
      <div className="mb-4">
        <p className="text-xs font-medium text-dark-600 mb-2">Integrations</p>
        <div className="flex flex-wrap gap-2">
          {automation.integrations.map((integration, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
            >
              {integration}
            </span>
          ))}
        </div>
      </div>

      {/* Last Run */}
      <div className="flex items-center justify-between text-sm text-dark-600 mb-4">
        <span>Last run:</span>
        <span>{formatDistanceToNow(automation.lastRun, { addSuffix: true })}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            automation.status === 'active'
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          <SafeIcon 
            icon={automation.status === 'active' ? FiPause : FiPlay} 
            className="w-4 h-4 mr-2 inline" 
          />
          {automation.status === 'active' ? 'Pause' : 'Start'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-dark-100 text-dark-600 rounded-lg hover:bg-dark-200 transition-colors"
        >
          <SafeIcon icon={FiSettings} className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AutomationCard;