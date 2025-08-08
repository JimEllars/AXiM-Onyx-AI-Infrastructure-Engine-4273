import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiZap, FiCheckCircle, FiAlertCircle, FiInfo, FiRefreshCw } = FiIcons;

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'automation',
      title: 'Calendar sync completed',
      description: 'Google Calendar integration processed 45 events',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'success',
      icon: FiCheckCircle
    },
    {
      id: 2,
      type: 'integration',
      title: 'New Todoist connection',
      description: 'Successfully connected to Todoist API',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'info',
      icon: FiZap
    },
    {
      id: 3,
      type: 'system',
      title: 'Security scan completed',
      description: 'All services passed security validation',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'success',
      icon: FiCheckCircle
    },
    {
      id: 4,
      type: 'automation',
      title: 'Workflow retry',
      description: 'Email automation retried due to rate limit',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'warning',
      icon: FiRefreshCw
    },
    {
      id: 5,
      type: 'system',
      title: 'Performance optimization',
      description: 'Auto-scaling triggered for increased load',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: 'info',
      icon: FiInfo
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-dark-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-dark-900">Recent Activity</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 hover:bg-dark-50 rounded-lg transition-colors"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
              <SafeIcon icon={activity.icon} className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-dark-900 truncate">
                {activity.title}
              </h4>
              <p className="text-sm text-dark-600 mt-1">
                {activity.description}
              </p>
              <p className="text-xs text-dark-500 mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-dark-200">
        <p className="text-xs text-dark-500 text-center">
          Real-time activity monitoring
        </p>
      </div>
    </div>
  );
};

export default ActivityFeed;