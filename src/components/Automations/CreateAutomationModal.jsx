import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiX, FiZap, FiCalendar, FiGrid, FiSettings } = FiIcons;

const CreateAutomationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trigger: 'schedule',
    integrations: [],
    schedule: '0 9 * * *'
  });

  const triggerTypes = [
    { id: 'schedule', name: 'Schedule', description: 'Run at specific times', icon: FiCalendar },
    { id: 'event', name: 'Event', description: 'Trigger on data changes', icon: FiZap },
    { id: 'webhook', name: 'Webhook', description: 'External API calls', icon: FiGrid }
  ];

  const availableIntegrations = [
    { id: 'google-calendar', name: 'Google Calendar', connected: true },
    { id: 'todoist', name: 'Todoist', connected: true },
    { id: 'gmail', name: 'Gmail', connected: false },
    { id: 'ai-engine', name: 'AI Engine', connected: true }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle automation creation
    console.log('Creating automation:', formData);
    onClose();
    setStep(1);
    setFormData({
      name: '',
      description: '',
      trigger: 'schedule',
      integrations: [],
      schedule: '0 9 * * *'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-200">
              <div>
                <h2 className="text-xl font-bold text-dark-900">Create Automation</h2>
                <p className="text-dark-600 text-sm">Step {step} of 3</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-dark-100 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiX} className="w-5 h-5 text-dark-600" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-dark-50">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      stepNum <= step 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-dark-200 text-dark-600'
                    }`}>
                      {stepNum}
                    </div>
                    {stepNum < 3 && (
                      <div className={`w-16 h-1 mx-2 ${
                        stepNum < step ? 'bg-primary-600' : 'bg-dark-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Automation Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter automation name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border border-dark-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows="3"
                      placeholder="Describe what this automation does"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-dark-900 mb-4">
                      Choose Trigger Type
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {triggerTypes.map((trigger) => (
                        <label
                          key={trigger.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.trigger === trigger.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-dark-300 hover:bg-dark-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="trigger"
                            value={trigger.id}
                            checked={formData.trigger === trigger.id}
                            onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                            className="sr-only"
                          />
                          <SafeIcon icon={trigger.icon} className="w-6 h-6 text-primary-600 mr-3" />
                          <div>
                            <h4 className="font-medium text-dark-900">{trigger.name}</h4>
                            <p className="text-sm text-dark-600">{trigger.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-dark-900 mb-4">
                      Select Integrations
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {availableIntegrations.map((integration) => (
                        <label
                          key={integration.id}
                          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                            integration.connected
                              ? 'border-dark-300 hover:bg-dark-50'
                              : 'border-dark-200 bg-dark-100 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              value={integration.id}
                              checked={formData.integrations.includes(integration.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    integrations: [...formData.integrations, integration.id]
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    integrations: formData.integrations.filter(id => id !== integration.id)
                                  });
                                }
                              }}
                              disabled={!integration.connected}
                              className="mr-3"
                            />
                            <span className={`font-medium ${
                              integration.connected ? 'text-dark-900' : 'text-dark-500'
                            }`}>
                              {integration.name}
                            </span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            integration.connected
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {integration.connected ? 'Connected' : 'Not Connected'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-200">
                <button
                  type="button"
                  onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                  className="px-4 py-2 text-dark-600 hover:text-dark-900 transition-colors"
                >
                  {step > 1 ? 'Previous' : 'Cancel'}
                </button>
                
                <div className="flex space-x-3">
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      Create Automation
                    </button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateAutomationModal;