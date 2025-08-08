import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AutomationCard from '../components/Automations/AutomationCard';
import CreateAutomationModal from '../components/Automations/CreateAutomationModal';
import { getAutomations, createAutomation, updateAutomationStatus } from '../services/automationService';

const { FiPlus, FiFilter, FiSearch } = FiIcons;

const Automations = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: 'Calendar Event Sync',
      description: 'Automatically sync calendar events across Google Calendar and Todoist',
      status: 'active',
      lastRun: new Date(Date.now() - 1000 * 60 * 30),
      successRate: 98.5,
      integrations: ['Google Calendar', 'Todoist'],
      trigger: 'schedule'
    },
    {
      id: 2,
      name: 'Email Digest Generator',
      description: 'Generate daily summary emails from multiple data sources',
      status: 'active',
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2),
      successRate: 96.2,
      integrations: ['Gmail', 'Analytics'],
      trigger: 'schedule'
    },
    {
      id: 3,
      name: 'Task Priority Optimizer',
      description: 'AI-powered task prioritization based on deadlines and importance',
      status: 'paused',
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24),
      successRate: 94.7,
      integrations: ['Todoist', 'AI Engine'],
      trigger: 'event'
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Uncomment this when ready to connect to Supabase
  /*
  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        setLoading(true);
        // In a real app, you would get the userId from auth context
        const userId = 'current-user-id';
        const data = await getAutomations(userId);
        setAutomations(data);
      } catch (error) {
        console.error('Failed to fetch automations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAutomations();
  }, []);
  */

  const handleCreateAutomation = async (automationData) => {
    try {
      // In a real app, you would get the userId from auth context
      const userId = 'current-user-id';
      const newAutomation = await createAutomation(automationData, userId);
      setAutomations([newAutomation, ...automations]);
    } catch (error) {
      console.error('Failed to create automation:', error);
    }
  };

  const handleStatusChange = async (automationId, newStatus) => {
    try {
      await updateAutomationStatus(automationId, newStatus);
      setAutomations(automations.map(automation => 
        automation.id === automationId ? { ...automation, status: newStatus } : automation
      ));
    } catch (error) {
      console.error('Failed to update automation status:', error);
    }
  };

  const filteredAutomations = automations.filter(automation => {
    const matchesFilter = filter === 'all' || automation.status === filter;
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
          <h1 className="text-2xl font-bold text-dark-900">Automations</h1>
          <p className="text-dark-600 mt-1">
            Manage your AI-powered automation workflows
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Create Automation</span>
        </motion.button>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-dark-100"
      >
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search automations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="text-dark-400 w-5 h-5" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="error">Error</option>
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

      {/* Automations Grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAutomations.map((automation, index) => (
            <motion.div
              key={automation.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <AutomationCard 
                automation={automation} 
                onStatusChange={handleStatusChange}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredAutomations.length === 0 && (
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
            No automations found
          </h3>
          <p className="text-dark-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}

      {/* Create Automation Modal */}
      <CreateAutomationModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateAutomation}
      />
    </div>
  );
};

export default Automations;