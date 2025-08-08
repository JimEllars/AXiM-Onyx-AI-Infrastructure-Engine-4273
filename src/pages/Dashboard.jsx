import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import StatsCard from '../components/Dashboard/StatsCard';
import ActivityFeed from '../components/Dashboard/ActivityFeed';
import SystemHealth from '../components/Dashboard/SystemHealth';

const { FiZap, FiGrid, FiTrendingUp, FiClock } = FiIcons;

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Automations',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: FiZap,
      color: 'primary'
    },
    {
      title: 'Connected Services',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: FiGrid,
      color: 'accent'
    },
    {
      title: 'Success Rate',
      value: '98.7%',
      change: '+0.3%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'green'
    },
    {
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-0.1s',
      trend: 'down',
      icon: FiClock,
      color: 'blue'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to Onyx AI Engine
            </h1>
            <p className="text-primary-100 text-lg">
              Your intelligent automation platform is running smoothly
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiZap} className="w-10 h-10" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <SystemHealth />
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ActivityFeed />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;