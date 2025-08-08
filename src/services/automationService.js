import supabase from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export const getAutomations = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('automations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching automations:', error);
    throw error;
  }
};

export const createAutomation = async (automation, userId) => {
  try {
    const { data, error } = await supabase
      .from('automations')
      .insert({
        id: uuidv4(),
        user_id: userId,
        name: automation.name,
        description: automation.description,
        trigger: automation.trigger,
        status: 'active',
        config: {
          schedule: automation.schedule,
          integrations: automation.integrations
        },
        created_at: new Date(),
        updated_at: new Date()
      })
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating automation:', error);
    throw error;
  }
};

export const updateAutomationStatus = async (automationId, status) => {
  try {
    const { data, error } = await supabase
      .from('automations')
      .update({ 
        status,
        updated_at: new Date()
      })
      .eq('id', automationId)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating automation status:', error);
    throw error;
  }
};

export const deleteAutomation = async (automationId) => {
  try {
    const { error } = await supabase
      .from('automations')
      .delete()
      .eq('id', automationId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting automation:', error);
    throw error;
  }
};