import supabase from '../lib/supabase';

// This script creates the necessary tables in Supabase for the application

async function createTables() {
  console.log('Creating Supabase tables...');

  try {
    // Create automations table
    const { error: automationsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS automations_axim (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        trigger TEXT NOT NULL,
        status TEXT NOT NULL,
        config JSONB NOT NULL DEFAULT '{}',
        last_run TIMESTAMP,
        success_rate NUMERIC(5,2) DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      ALTER TABLE automations_axim ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Users can view their own automations" ON automations_axim
        FOR SELECT USING (auth.uid() = user_id);
        
      CREATE POLICY "Users can insert their own automations" ON automations_axim
        FOR INSERT WITH CHECK (auth.uid() = user_id);
        
      CREATE POLICY "Users can update their own automations" ON automations_axim
        FOR UPDATE USING (auth.uid() = user_id);
        
      CREATE POLICY "Users can delete their own automations" ON automations_axim
        FOR DELETE USING (auth.uid() = user_id);
    `);

    if (automationsError) {
      throw new Error(`Error creating automations table: ${automationsError.message}`);
    }

    // Create integrations table
    const { error: integrationsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS integrations_axim (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        name TEXT NOT NULL,
        provider TEXT NOT NULL,
        category TEXT NOT NULL,
        status TEXT NOT NULL,
        credentials JSONB NOT NULL DEFAULT '{}',
        features JSONB,
        last_sync TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      ALTER TABLE integrations_axim ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Users can view their own integrations" ON integrations_axim
        FOR SELECT USING (auth.uid() = user_id);
        
      CREATE POLICY "Users can insert their own integrations" ON integrations_axim
        FOR INSERT WITH CHECK (auth.uid() = user_id);
        
      CREATE POLICY "Users can update their own integrations" ON integrations_axim
        FOR UPDATE USING (auth.uid() = user_id);
        
      CREATE POLICY "Users can delete their own integrations" ON integrations_axim
        FOR DELETE USING (auth.uid() = user_id);
    `);

    if (integrationsError) {
      throw new Error(`Error creating integrations table: ${integrationsError.message}`);
    }

    // Create execution_logs table
    const { error: logsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS execution_logs_axim (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        automation_id UUID NOT NULL,
        user_id UUID NOT NULL,
        status TEXT NOT NULL,
        duration INTEGER,
        error_message TEXT,
        result JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      ALTER TABLE execution_logs_axim ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Users can view their own logs" ON execution_logs_axim
        FOR SELECT USING (auth.uid() = user_id);
        
      CREATE POLICY "Users can insert their own logs" ON execution_logs_axim
        FOR INSERT WITH CHECK (auth.uid() = user_id);
    `);

    if (logsError) {
      throw new Error(`Error creating execution_logs table: ${logsError.message}`);
    }

    // Create api_usage table
    const { error: apiUsageError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS api_usage_axim (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        integration_id UUID NOT NULL,
        user_id UUID NOT NULL,
        calls INTEGER NOT NULL,
        success_count INTEGER NOT NULL,
        error_count INTEGER NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_DATE
      );

      ALTER TABLE api_usage_axim ENABLE ROW LEVEL SECURITY;
      
      CREATE POLICY "Users can view their own api usage" ON api_usage_axim
        FOR SELECT USING (auth.uid() = user_id);
        
      CREATE POLICY "Users can insert their own api usage" ON api_usage_axim
        FOR INSERT WITH CHECK (auth.uid() = user_id);
        
      CREATE POLICY "Users can update their own api usage" ON api_usage_axim
        FOR UPDATE USING (auth.uid() = user_id);
    `);

    if (apiUsageError) {
      throw new Error(`Error creating api_usage table: ${apiUsageError.message}`);
    }

    console.log('All tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

// Run the function if this file is executed directly
if (require.main === module) {
  createTables()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

export default createTables;