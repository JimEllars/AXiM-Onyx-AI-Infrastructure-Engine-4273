import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiCheck, FiPlus, FiSettings, FiActivity, FiTrendingUp, FiClock } = FiIcons;

const IntegrationCard = ({ integration }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-dark-600 bg-dark-100';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'productivity': return 'text-blue-600 bg-blue-100';
      case 'communication': return 'text-purple-600 bg-purple-100';
      case 'data': return 'text-orange-600 bg-orange-100';
      case 'ai': return 'text-pink-600 bg-pink-100';
      default: return 'text-dark-600 bg-dark-100';
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
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-dark-900">
              {integration.name}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(integration.category)}`}>
              {integration.category}
            </span>
          </div>
          <p className="text-dark-600 text-sm">
            {integration.description}
          </p>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
          {integration.status}
        </div>
      </div>

      {/* Metrics */}
      {integration.status === 'connected' && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-dark-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <SafeIcon icon={FiActivity} className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-medium text-dark-600">API Calls</span>
            </div>
            <p className="text-lg font-bold text-dark-900">{integration.apiCalls.toLocaleString()}</p>
          </div>
          
          <div className="bg-dark-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-dark-600">Success Rate</span>
            </div>
            <p className="text-lg font-bold text-dark-900">{integration.successRate}%</p>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mb-4">
        <p className="text-xs font-medium text-dark-600 mb-2">Features</p>
        <div className="flex flex-wrap gap-1">
          {integration.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded"
            >
              {feature}
            </span>
          ))}
          {integration.features.length > 3 && (
            <span className="px-2 py-1 bg-dark-100 text-dark-600 text-xs rounded">
              +{integration.features.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Last Sync */}
      {integration.lastSync && (
        <div className="flex items-center justify-between text-sm text-dark-600 mb-4">
          <span>Last sync:</span>
          <span>{formatDistanceToNow(integration.lastSync, { addSuffix: true })}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {integration.status === 'connected' ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 px-4 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors"
            >
              <SafeIcon icon={FiCheck} className="w-4 h-4 mr-2 inline" />
              Connected
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-dark-100 text-dark-600 rounded-lg hover:bg-dark-200 transition-colors"
            >
              <SafeIcon icon={FiSettings} className="w-4 h-4" />
            </motion.button>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2 inline" />
            Connect
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default IntegrationCard;