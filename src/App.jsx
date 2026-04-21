import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import IssueReturn from './pages/IssueReturn';
import Users from './pages/Users';
import { LibraryProvider } from './context/LibraryContext';
import './index.css';

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const pages = {
    dashboard: Dashboard,
    books: Books,
    issue: IssueReturn,
    users: Users,
  };

  const CurrentPage = pages[activePage];

  return (
    <LibraryProvider>
      <div className="min-h-screen overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Navbar */}
        <Navbar setActivePage={setActivePage} />

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <CurrentPage key={activePage} />
        </AnimatePresence>
      </div>
    </LibraryProvider>
  );
};

export default App;
