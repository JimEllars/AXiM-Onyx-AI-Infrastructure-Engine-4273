import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSave, FiShield, FiDatabase, FiBell, FiUser, FiKey, FiServer } = FiIcons;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      slack: false,
      webhook: true
    },
    security: {
      twoFactor: true,
      apiKeyRotation: 30,
      sessionTimeout: 24
    },
    system: {
      logLevel: 'info',
      retryAttempts: 3,
      timeout: 30
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: FiUser },
    { id: 'security', name: 'Security', icon: FiShield },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'system', name: 'System', icon: FiServer },
    { id: 'api', name: 'API Keys', icon: FiKey }
  ];

  const handleSave = () => {
    // Handle save logic
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Settings</h1>
          <p className="text-dark-600 mt-1">
            Configure your automation engine preferences
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
        >
          <SafeIcon icon={FiSave} className="w-5 h-5" />
          <span>Save Changes</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl p-4 shadow-lg border border-dark-100">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                      : 'text-dark-600 hover:text-dark-900 hover:bg-dark-50'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-5 h-5 mr-3" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-dark-100">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-dark-900">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      defaultValue="AXiM Systems"
                      className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>UTC</option>
                      <option>EST</option>
                      <option>PST</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Language
                    </label>
                    <select className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Date Format
                    </label>
                    <select className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-dark-900">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-dark-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-dark-600">Add an extra layer of security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactor}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, twoFactor: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-dark-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        API Key Rotation (days)
                      </label>
                      <input
                        type="number"
                        value={settings.security.apiKeyRotation}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, apiKeyRotation: parseInt(e.target.value) }
                        })}
                        className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        Session Timeout (hours)
                      </label>
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                        })}
                        className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-dark-900">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-dark-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-dark-900 capitalize">{key} Notifications</h3>
                        <p className="text-sm text-dark-600">
                          Receive notifications via {key}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, [key]: e.target.checked }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-dark-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-dark-900">System Configuration</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Log Level
                    </label>
                    <select
                      value={settings.system.logLevel}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, logLevel: e.target.value }
                      })}
                      className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="debug">Debug</option>
                      <option value="info">Info</option>
                      <option value="warn">Warning</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Retry Attempts
                    </label>
                    <input
                      type="number"
                      value={settings.system.retryAttempts}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, retryAttempts: parseInt(e.target.value) }
                      })}
                      className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Timeout (seconds)
                    </label>
                    <input
                      type="number"
                      value={settings.system.timeout}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, timeout: parseInt(e.target.value) }
                      })}
                      className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-dark-900">API Key Management</h2>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <SafeIcon icon={FiShield} className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        API keys provide access to your automation engine. Keep them secure and rotate regularly.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Production API Key', created: '2024-01-15', lastUsed: '2 hours ago', status: 'active' },
                    { name: 'Development API Key', created: '2024-01-10', lastUsed: '1 day ago', status: 'active' },
                    { name: 'Testing API Key', created: '2024-01-05', lastUsed: '1 week ago', status: 'inactive' }
                  ].map((key, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-dark-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-dark-900">{key.name}</h3>
                        <p className="text-sm text-dark-600">
                          Created: {key.created} • Last used: {key.lastUsed}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          key.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {key.status}
                        </span>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          Rotate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-3 border-2 border-dashed border-dark-300 rounded-lg text-dark-600 hover:border-primary-500 hover:text-primary-600 transition-colors">
                  + Generate New API Key
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;