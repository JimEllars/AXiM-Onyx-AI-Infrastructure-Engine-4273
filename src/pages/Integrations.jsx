import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import IntegrationCard from '../components/Integrations/IntegrationCard';
import { getIntegrations, connectIntegration, disconnectIntegration } from '../services/integrationService';

const { FiPlus, FiSearch, FiFilter } = FiIcons;

const Integrations = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [integrations, setIntegrations] = useState([
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync events and manage calendar data',
      category: 'productivity',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 15),
      apiCalls: 1250,
      successRate: 99.2,
      features: ['Event Creation', 'Event Updates', 'Sync', 'Webhooks']
    },
    {
      id: 'todoist',
      name: 'Todoist',
      description: 'Task management and project organization',
      category: 'productivity',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 30),
      apiCalls: 890,
      successRate: 98.7,
      features: ['Task Creation', 'Project Management', 'Labels', 'Comments']
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Email management and automation',
      category: 'communication',
      status: 'available',
      lastSync: null,
      apiCalls: 0,
      successRate: 0,
      features: ['Send Emails', 'Read Emails', 'Labels', 'Filters']
    },
    {
      id: 'serper',
      name: 'Serper.dev',
      description: 'Google Search API for data retrieval',
      category: 'data',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 60),
      apiCalls: 345,
      successRate: 97.1,
      features: ['Web Search', 'Image Search', 'News Search', 'Shopping']
    },
    {
      id: 'ai-engine',
      name: 'AI Processing Engine',
      description: 'Internal AI processing and analysis',
      category: 'ai',
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 5),
      apiCalls: 2100,
      successRate: 99.8,
      features: ['Text Analysis', 'Decision Making', 'Pattern Recognition', 'Automation']
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and notifications',
      category: 'communication',
      status: 'available',
      lastSync: null,
      apiCalls: 0,
      successRate: 0,
      features: ['Send Messages', 'Channel Management', 'File Sharing', 'Notifications']
    }
  ]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'communication', label: 'Communication' },
    { value: 'data', label: 'Data' },
    { value: 'ai', label: 'AI & ML' }
  ];

  // Uncomment this when ready to connect to Supabase
  /*
  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        setLoading(true);
        // In a real app, you would get the userId from auth context
        const userId = 'current-user-id';
        const data = await getIntegrations(userId);
        setIntegrations(data);
      } catch (error) {
        console.error('Failed to fetch integrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIntegrations();
  }, []);
  */

  const handleConnectIntegration = async (integrationData) => {
    try {
      // In a real app, you would get the userId from auth context
      const userId = 'current-user-id';
      const connected = await connectIntegration(integrationData, userId);
      
      // Update the integrations list
      setIntegrations(integrations.map(integration => 
        integration.id === connected.id ? connected : integration
      ));
    } catch (error) {
      console.error('Failed to connect integration:', error);
    }
  };

  const handleDisconnectIntegration = async (integrationId) => {
    try {
      const disconnected = await disconnectIntegration(integrationId);
      
      // Update the integrations list
      setIntegrations(integrations.map(integration => 
        integration.id === disconnected.id ? disconnected : integration
      ));
    } catch (error) {
      console.error('Failed to disconnect integration:', error);
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesFilter = filter === 'all' || integration.category === filter;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const totalApiCalls = integrations.reduce((sum, i) => sum + i.apiCalls, 0);

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
          <h1 className="text-2xl font-bold text-dark-900">Integrations</h1>
          <p className="text-dark-600 mt-1">
            Connect and manage external services
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add Integration</span>
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg border border-dark-100">
          <h3 className="text-2xl font-bold text-dark-900">{connectedCount}</h3>
          <p className="text-dark-600">Connected Services</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-dark-100">
          <h3 className="text-2xl font-bold text-dark-900">{totalApiCalls.toLocaleString()}</h3>
          <p className="text-dark-600">API Calls Today</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-dark-100">
          <h3 className="text-2xl font-bold text-dark-900">98.9%</h3>
          <p className="text-dark-600">Avg Success Rate</p>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-dark-100"
      >
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="text-dark-400 w-5 h-5" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Integrations Grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration, index) => (
            <motion.div
              key={integration.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <IntegrationCard 
                integration={integration}
                onConnect={handleConnectIntegration}
                onDisconnect={handleDisconnectIntegration}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredIntegrations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiSearch} className="w-8 h-8 text-dark-400" />
          </div>
          <h3 className="text-lg font-medium text-dark-900 mb-2">
            No integrations found
          </h3>
          <p className="text-dark-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Integrations;