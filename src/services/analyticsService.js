import supabase from '../lib/supabase';

export const getExecutionMetrics = async (timeRange = '7d') => {
  try {
    // In a real implementation, this would query metrics from a logs or analytics table
    // For now we'll return mock data
    
    // Generate metrics based on timeRange
    let totalExecutions = 0;
    let successRate = 0;
    let avgResponseTime = 0;
    
    switch (timeRange) {
      case '24h':
        totalExecutions = Math.floor(Math.random() * 200) + 100;
        successRate = 97 + (Math.random() * 3);
        avgResponseTime = 800 + (Math.random() * 400);
        break;
      case '7d':
        totalExecutions = Math.floor(Math.random() * 1000) + 500;
        successRate = 98 + (Math.random() * 2);
        avgResponseTime = 900 + (Math.random() * 300);
        break;
      case '30d':
        totalExecutions = Math.floor(Math.random() * 5000) + 3000;
        successRate = 98.5 + (Math.random() * 1.5);
        avgResponseTime = 1000 + (Math.random() * 200);
        break;
      case '90d':
        totalExecutions = Math.floor(Math.random() * 15000) + 10000;
        successRate = 99 + (Math.random() * 1);
        avgResponseTime = 1100 + (Math.random() * 100);
        break;
      default:
        totalExecutions = Math.floor(Math.random() * 1000) + 500;
        successRate = 98 + (Math.random() * 2);
        avgResponseTime = 900 + (Math.random() * 300);
    }
    
    return {
      totalExecutions,
      successRate: successRate.toFixed(1),
      avgResponseTime: (avgResponseTime / 1000).toFixed(1) + 's',
      activeAutomations: Math.floor(Math.random() * 10) + 20
    };
  } catch (error) {
    console.error('Error fetching execution metrics:', error);
    throw error;
  }
};

export const getPerformanceData = async (timeRange = '7d') => {
  try {
    // In a real implementation, this would query performance data from an analytics table
    // For now we'll return mock data
    
    // Generate dates for x-axis based on timeRange
    const dates = [];
    const successRates = [];
    const responseTimes = [];
    
    let days = 7;
    switch (timeRange) {
      case '24h':
        days = 1;
        break;
      case '7d':
        days = 7;
        break;
      case '30d':
        days = 30;
        break;
      case '90d':
        days = 90;
        break;
    }
    
    // Generate data points
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      dates.push(date.toISOString().split('T')[0]);
      
      // Generate random data with a reasonable trend
      successRates.push(97 + (Math.random() * 3));
      responseTimes.push(900 + (Math.random() * 400));
    }
    
    return {
      dates,
      successRates,
      responseTimes
    };
  } catch (error) {
    console.error('Error fetching performance data:', error);
    throw error;
  }
};

export const getIntegrationUsage = async (timeRange = '7d') => {
  try {
    // In a real implementation, this would query usage data from an analytics table
    // For now we'll return mock data
    return [
      { name: 'AI Engine', value: Math.floor(Math.random() * 1000) + 1500 },
      { name: 'Google Calendar', value: Math.floor(Math.random() * 500) + 1000 },
      { name: 'Todoist', value: Math.floor(Math.random() * 300) + 700 },
      { name: 'Serper.dev', value: Math.floor(Math.random() * 200) + 200 },
      { name: 'Others', value: Math.floor(Math.random() * 100) + 100 }
    ];
  } catch (error) {
    console.error('Error fetching integration usage:', error);
    throw error;
  }
};

export const getExecutionTimeline = async (timeRange = '7d') => {
  try {
    // In a real implementation, this would query timeline data from a logs or analytics table
    // For now we'll return mock data
    
    const timeLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    const executionCounts = [
      Math.floor(Math.random() * 10) + 5,
      Math.floor(Math.random() * 5) + 5,
      Math.floor(Math.random() * 20) + 15,
      Math.floor(Math.random() * 25) + 30,
      Math.floor(Math.random() * 20) + 25,
      Math.floor(Math.random() * 10) + 10
    ];
    
    return {
      timeLabels,
      executionCounts
    };
  } catch (error) {
    console.error('Error fetching execution timeline:', error);
    throw error;
  }
};