import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import UserProfile from '@/components/UserProfile';
import { SunIcon, MoonIcon, UserCircleIcon, BellIcon, KeyIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../utils/AuthContext';
import { useTheme } from 'next-themes';
import { getUserSettings, updateUserSettings } from '../services/dataService';

interface UserSettings {
  theme?: string;
  email_notifications?: boolean;
  push_notifications?: boolean;
  reminder_notifications?: boolean;
  font_size?: number;
  accent_color?: string;
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [fontSize, setFontSize] = useState(3);
  const [accentColor, setAccentColor] = useState('blue');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Fetch user settings
  useEffect(() => {
    const fetchUserSettings = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await getUserSettings(user.id);
        
        if (error) {
          console.error('Error fetching user settings:', error);
        } else if (data) {
          // Apply settings from database
          if (data.theme) setTheme(data.theme);
          if (data.email_notifications !== undefined) setEmailNotifications(data.email_notifications);
          if (data.push_notifications !== undefined) setPushNotifications(data.push_notifications);
          if (data.reminder_notifications !== undefined) setReminderNotifications(data.reminder_notifications);
          if (data.font_size) setFontSize(data.font_size);
          if (data.accent_color) setAccentColor(data.accent_color);
        }
      } catch (error) {
        console.error('Error in fetchUserSettings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserSettings();
  }, [user, setTheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    if (user) {
      try {
        await updateUserSettings(user.id, { theme: newTheme });
      } catch (error) {
        console.error('Error saving theme preference:', error);
      }
    }
  };

  const saveNotificationSettings = async () => {
    if (!user) return;
    
    setLoading(true);
    setMessage(null);
    
    try {
      const { error } = await updateUserSettings(user.id, {
        email_notifications: emailNotifications,
        push_notifications: pushNotifications,
        reminder_notifications: reminderNotifications,
      });
      
      if (error) {
        throw error;
      }
      
      setMessage({ text: 'Notification settings saved successfully!', type: 'success' });
    } catch (error) {
      console.error('Error saving notification settings:', error);
      setMessage({ text: 'Error saving settings. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const saveAppearanceSettings = async () => {
    if (!user) return;
    
    setLoading(true);
    setMessage(null);
    
    try {
      const { error } = await updateUserSettings(user.id, {
        theme,
        font_size: fontSize,
        accent_color: accentColor,
      });
      
      if (error) {
        throw error;
      }
      
      setMessage({ text: 'Appearance settings saved successfully!', type: 'success' });
    } catch (error) {
      console.error('Error saving appearance settings:', error);
      setMessage({ text: 'Error saving settings. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAccentColorChange = (color: string) => {
    setAccentColor(color);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value));
  };

  return (
    <>
      <Head>
        <title>Settings | Dashboard-Z</title>
        <meta name="description" content="Customize your Dashboard-Z experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Settings</h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Customize your Dashboard-Z experience
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="card p-4">
                <nav className="space-y-1">
                  <button 
                    onClick={() => setActiveSection('appearance')}
                    className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeSection === 'appearance' 
                        ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100' 
                        : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <SunIcon className="mr-3 h-5 w-5 text-primary-600 dark:text-primary-400" />
                    Appearance
                  </button>
                  <button 
                    onClick={() => setActiveSection('profile')}
                    className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeSection === 'profile' 
                        ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100' 
                        : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <UserCircleIcon className="mr-3 h-5 w-5 text-neutral-400" />
                    Profile
                  </button>
                  <button 
                    onClick={() => setActiveSection('notifications')}
                    className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeSection === 'notifications' 
                        ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100' 
                        : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <BellIcon className="mr-3 h-5 w-5 text-neutral-400" />
                    Notifications
                  </button>
                  <button 
                    onClick={() => setActiveSection('security')}
                    className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeSection === 'security' 
                        ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100' 
                        : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <KeyIcon className="mr-3 h-5 w-5 text-neutral-400" />
                    Security
                  </button>
                  <button 
                    onClick={() => setActiveSection('privacy')}
                    className={`flex w-full items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeSection === 'privacy' 
                        ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100' 
                        : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <DocumentTextIcon className="mr-3 h-5 w-5 text-neutral-400" />
                    Privacy
                  </button>
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              {/* Profile section */}
              {activeSection === 'profile' && (
                <section id="profile" className="card overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-100">Profile</h2>
                    <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
                      Manage your personal information
                    </p>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <UserProfile />
                  </div>
                </section>
              )}

              {/* Appearance section */}
              {activeSection === 'appearance' && (
                <section id="appearance" className="card overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-100">Appearance</h2>
                    <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
                      Customize how Dashboard-Z looks
                    </p>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    {message && activeSection === 'appearance' && (
                      <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                        {message.text}
                      </div>
                    )}
                    <div className="space-y-6">
                      {/* Theme toggle */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Theme</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Choose between light and dark theme
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              theme === 'dark' ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'
                            }`}
                            onClick={toggleTheme}
                          >
                            <span className="sr-only">Toggle dark mode</span>
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <span className="ml-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {theme === 'dark' ? 'Dark' : 'Light'}
                          </span>
                        </div>
                      </div>

                      {/* Accent color */}
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Accent Color</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                          Choose your preferred accent color
                        </p>
                        <div className="flex space-x-3">
                          <button 
                            className={`h-8 w-8 rounded-full bg-blue-500 focus:outline-none ${accentColor === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                            onClick={() => handleAccentColorChange('blue')}
                          ></button>
                          <button 
                            className={`h-8 w-8 rounded-full bg-purple-500 focus:outline-none ${accentColor === 'purple' ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
                            onClick={() => handleAccentColorChange('purple')}
                          ></button>
                          <button 
                            className={`h-8 w-8 rounded-full bg-green-500 focus:outline-none ${accentColor === 'green' ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}
                            onClick={() => handleAccentColorChange('green')}
                          ></button>
                          <button 
                            className={`h-8 w-8 rounded-full bg-red-500 focus:outline-none ${accentColor === 'red' ? 'ring-2 ring-offset-2 ring-red-500' : ''}`}
                            onClick={() => handleAccentColorChange('red')}
                          ></button>
                          <button 
                            className={`h-8 w-8 rounded-full bg-yellow-500 focus:outline-none ${accentColor === 'yellow' ? 'ring-2 ring-offset-2 ring-yellow-500' : ''}`}
                            onClick={() => handleAccentColorChange('yellow')}
                          ></button>
                        </div>
                      </div>

                      {/* Font size */}
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Font Size</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                          Adjust the text size
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">A</span>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            value={fontSize}
                            onChange={handleFontSizeChange}
                            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700"
                          />
                          <span className="text-base text-neutral-500 dark:text-neutral-400">A</span>
                        </div>
                      </div>
                      
                      <div className="pt-5">
                        <button
                          type="button"
                          onClick={saveAppearanceSettings}
                          disabled={loading}
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                        >
                          {loading ? 'Saving...' : 'Save Appearance Settings'}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Notifications section */}
              {activeSection === 'notifications' && (
                <section id="notifications" className="card overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-100">Notifications</h2>
                    <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
                      Manage your notification preferences
                    </p>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    {message && activeSection === 'notifications' && (
                      <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
                        {message.text}
                      </div>
                    )}
                    <div className="space-y-4">
                      {/* Email notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Email Notifications</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Receive updates via email
                          </p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              emailNotifications ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'
                            }`}
                            onClick={() => setEmailNotifications(!emailNotifications)}
                          >
                            <span className="sr-only">Toggle email notifications</span>
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                emailNotifications ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Push notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Push Notifications</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Receive notifications in your browser
                          </p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              pushNotifications ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'
                            }`}
                            onClick={() => setPushNotifications(!pushNotifications)}
                          >
                            <span className="sr-only">Toggle push notifications</span>
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                pushNotifications ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Reminder notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Reminder Notifications</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Receive reminders for upcoming deadlines
                          </p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              reminderNotifications ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'
                            }`}
                            onClick={() => setReminderNotifications(!reminderNotifications)}
                          >
                            <span className="sr-only">Toggle reminder notifications</span>
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                reminderNotifications ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      
                      <div className="pt-5">
                        <button
                          type="button"
                          onClick={saveNotificationSettings}
                          disabled={loading}
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                        >
                          {loading ? 'Saving...' : 'Save Notification Settings'}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Security section */}
              {activeSection === 'security' && (
                <section id="security" className="card overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-100">Security</h2>
                    <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
                      Manage your account security
                    </p>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Change Password</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                          Update your password regularly for better security
                        </p>
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                          Change Password
                        </button>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Two-Factor Authentication</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                          Add an extra layer of security to your account
                        </p>
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Privacy section */}
              {activeSection === 'privacy' && (
                <section id="privacy" className="card overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-100">Privacy</h2>
                    <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
                      Manage your privacy settings
                    </p>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Data Usage</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                          Control how your data is used
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              id="analytics"
                              name="analytics"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="analytics" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                              Allow analytics
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="marketing"
                              name="marketing"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor="marketing" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                              Receive marketing emails
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Data Export</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                          Download a copy of your data
                        </p>
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                          Export Data
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}