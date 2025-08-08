import supabase from '../lib/supabase';

export const getIntegrations = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('user_id', userId)
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching integrations:', error);
    throw error;
  }
};

export const connectIntegration = async (integration, userId) => {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .insert({
        user_id: userId,
        name: integration.name,
        provider: integration.provider,
        category: integration.category,
        status: 'connected',
        credentials: integration.credentials,
        created_at: new Date(),
        updated_at: new Date()
      })
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error connecting integration:', error);
    throw error;
  }
};

export const disconnectIntegration = async (integrationId) => {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .update({ 
        status: 'disconnected',
        updated_at: new Date()
      })
      .eq('id', integrationId)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error disconnecting integration:', error);
    throw error;
  }
};

export const getIntegrationUsage = async (integrationId, timeRange = '24h') => {
  try {
    // In a real implementation, this would query usage metrics from a logs or metrics table
    // For now we'll return mock data
    return {
      apiCalls: Math.floor(Math.random() * 1000) + 500,
      successRate: 95 + (Math.random() * 5),
      lastSync: new Date()
    };
  } catch (error) {
    console.error('Error fetching integration usage:', error);
    throw error;
  }
};