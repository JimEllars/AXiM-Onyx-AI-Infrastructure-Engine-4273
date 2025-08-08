import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiServer, FiDatabase, FiCloud, FiShield, FiCheckCircle, FiAlertTriangle } = FiIcons;

const SystemHealth = () => {
  const services = [
    { 
      name: 'API Gateway', 
      status: 'healthy', 
      uptime: '99.9%', 
      icon: FiServer,
      latency: '45ms'
    },
    { 
      name: 'Message Queue', 
      status: 'healthy', 
      uptime: '99.8%', 
      icon: FiDatabase,
      latency: '12ms'
    },
    { 
      name: 'Cloud Functions', 
      status: 'healthy', 
      uptime: '99.7%', 
      icon: FiCloud,
      latency: '120ms'
    },
    { 
      name: 'Security Layer', 
      status: 'warning', 
      uptime: '98.9%', 
      icon: FiShield,
      latency: '8ms'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-dark-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-dark-900">System Health</h3>
        <div className="flex items-center text-sm text-green-600 font-medium">
          <SafeIcon icon={FiCheckCircle} className="w-4 h-4 mr-1" />
          All Systems Operational
        </div>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-dark-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                service.status === 'healthy' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                <SafeIcon icon={service.icon} className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-dark-900">{service.name}</h4>
                <p className="text-sm text-dark-600">Uptime: {service.uptime}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-dark-900">{service.latency}</p>
                <p className="text-xs text-dark-500">avg latency</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                service.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart Placeholder */}
      <div className="mt-6 p-4 bg-dark-50 rounded-lg">
        <h4 className="text-sm font-medium text-dark-700 mb-3">
          Performance Overview (Last 24h)
        </h4>
        <div className="h-20 bg-gradient-to-r from-primary-100 to-accent-100 rounded flex items-end justify-center">
          <p className="text-sm text-dark-600">Performance metrics visualization</p>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;