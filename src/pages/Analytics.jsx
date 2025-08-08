import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import * as echarts from 'echarts';

const { FiTrendingUp, FiActivity, FiClock, FiZap, FiCalendar } = FiIcons;

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  // Sample data for charts
  const performanceData = {
    option: {
      title: {
        text: 'Automation Performance',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'normal' }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['Success Rate', 'Response Time'],
        bottom: 0
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: [
        {
          type: 'value',
          name: 'Success Rate (%)',
          min: 90,
          max: 100,
          axisLabel: { formatter: '{value}%' }
        },
        {
          type: 'value',
          name: 'Response Time (ms)',
          min: 0,
          max: 2000,
          axisLabel: { formatter: '{value}ms' }
        }
      ],
      series: [
        {
          name: 'Success Rate',
          type: 'line',
          data: [98.5, 97.8, 99.2, 98.9, 99.5, 98.1, 99.3],
          itemStyle: { color: '#0ea5e9' },
          smooth: true
        },
        {
          name: 'Response Time',
          type: 'line',
          yAxisIndex: 1,
          data: [1200, 1350, 1100, 1250, 980, 1400, 1150],
          itemStyle: { color: '#e052ff' },
          smooth: true
        }
      ]
    }
  };

  const usageData = {
    option: {
      title: {
        text: 'Integration Usage',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'normal' }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'API Calls',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 2100, name: 'AI Engine' },
            { value: 1250, name: 'Google Calendar' },
            { value: 890, name: 'Todoist' },
            { value: 345, name: 'Serper.dev' },
            { value: 150, name: 'Others' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  };

  const executionData = {
    option: {
      title: {
        text: 'Automation Executions',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'normal' }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [12, 8, 25, 42, 38, 15],
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#0ea5e9' },
              { offset: 1, color: '#e052ff' }
            ])
          }
        }
      ]
    }
  };

  const keyMetrics = [
    {
      title: 'Total Executions',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: FiZap,
      color: 'primary'
    },
    {
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-0.3s',
      trend: 'down',
      icon: FiClock,
      color: 'green'
    },
    {
      title: 'Success Rate',
      value: '98.7%',
      change: '+0.5%',
      trend: 'up',
      icon: FiTrendingUp,
      color: 'accent'
    },
    {
      title: 'Active Automations',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: FiActivity,
      color: 'blue'
    }
  ];

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
          <h1 className="text-2xl font-bold text-dark-900">Analytics</h1>
          <p className="text-dark-600 mt-1">
            Monitor performance and usage metrics
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <SafeIcon icon={FiCalendar} className="text-dark-400 w-5 h-5" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-dark-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${
                metric.color === 'primary' ? 'from-primary-500 to-primary-600' :
                metric.color === 'accent' ? 'from-accent-500 to-accent-600' :
                metric.color === 'green' ? 'from-green-500 to-green-600' :
                'from-blue-500 to-blue-600'
              } rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={metric.icon} className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <SafeIcon 
                  icon={metric.trend === 'up' ? FiTrendingUp : FiTrendingUp} 
                  className="w-4 h-4 mr-1" 
                />
                {metric.change}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-dark-900 mb-1">{metric.value}</h3>
              <p className="text-dark-600 text-sm">{metric.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-dark-100"
        >
          <ReactECharts option={performanceData.option} style={{ height: '350px' }} />
        </motion.div>

        {/* Usage Chart */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-dark-100"
        >
          <ReactECharts option={usageData.option} style={{ height: '350px' }} />
        </motion.div>
      </div>

      {/* Execution Timeline */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-dark-100"
      >
        <ReactECharts option={executionData.option} style={{ height: '300px' }} />
      </motion.div>

      {/* Recent Events */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-dark-100"
      >
        <h3 className="text-lg font-semibold text-dark-900 mb-4">Recent Performance Events</h3>
        <div className="space-y-3">
          {[
            { time: '2 hours ago', event: 'Peak performance detected', type: 'success' },
            { time: '5 hours ago', event: 'Auto-scaling triggered', type: 'info' },
            { time: '1 day ago', event: 'Integration timeout resolved', type: 'warning' },
            { time: '2 days ago', event: 'New performance baseline established', type: 'success' }
          ].map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-dark-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  event.type === 'success' ? 'bg-green-500' :
                  event.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
                <span className="text-dark-900">{event.event}</span>
              </div>
              <span className="text-dark-500 text-sm">{event.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;