import Head from 'next/head';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { SunIcon, MoonIcon, UserCircleIcon, BellIcon, KeyIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);

  return (
    <>
      <Head>
        <title>Settings | Workflow Nexus</title>
        <meta name="description" content="Customize your Workflow Nexus experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Settings</h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Customize your Workflow Nexus experience
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="card p-4">
                <nav className="space-y-1">
                  <a href="#appearance" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100">
                    <SunIcon className="mr-3 h-5 w-5 text-primary-600 dark:text-primary-400" />
                    Appearance
                  </a>
                  <a href="#profile" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700">
                    <UserCircleIcon className="mr-3 h-5 w-5 text-neutral-400" />
                    Profile
                  </a>
                  <a href="#notifications" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700">
                    <BellIcon className="mr-3 h-5 w-5 text-neutral-400" />
                    Notifications
                  </a>
                  <a href="#security" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700">
                    <KeyIcon className="mr-3 h-5 w-5 text-neutral-400" />
                    Security
                  </a>
                  <a href="#privacy" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700">
                    <DocumentTextIcon className="mr-3 h-5 w-5 text-neutral-400" />
                    Privacy
                  </a>
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              {/* Appearance section */}
              <section id="appearance" className="card overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-neutral-200 dark:border-neutral-700">
                  <h2 className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-100">Appearance</h2>
                  <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
                    Customize how Workflow Nexus looks
                  </p>
                </div>
                <div className="px-4 py-5 sm:p-6">
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
                            darkMode ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'
                          }`}
                          onClick={() => setDarkMode(!darkMode)}
                        >
                          <span className="sr-only">Toggle dark mode</span>
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              darkMode ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <span className="ml-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          {darkMode ? 'Dark' : 'Light'}
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
                        <button className="h-8 w-8 rounded-full bg-blue-500 ring-2 ring-offset-2 ring-blue-500 focus:outline-none"></button>
                        <button className="h-8 w-8 rounded-full bg-purple-500 ring-offset-2 focus:outline-none"></button>
                        <button className="h-8 w-8 rounded-full bg-green-500 ring-offset-2 focus:outline-none"></button>
                        <button className="h-8 w-8 rounded-full bg-red-500 ring-offset-2 focus:outline-none"></button>
                        <button className="h-8 w-8 rounded-full bg-yellow-500 ring-offset-2 focus:outline-none"></button>
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
                          defaultValue="3"
                          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700"
                        />
                        <span className="text-base text-neutral-500 dark:text-neutral-400">A</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Notifications section */}
              <section id="notifications" className="card overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-neutral-200 dark:border-neutral-700">
                  <h2 className="text-lg font-medium leading-6 text-neutral-900 dark:text-neutral-100">Notifications</h2>
                  <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
                    Manage your notification preferences
                  </p>
                </div>
                <div className="px-4 py-5 sm:p-6">
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
                        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Meeting Reminders</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          Get reminded about upcoming meetings
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
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}