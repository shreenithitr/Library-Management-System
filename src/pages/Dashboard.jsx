import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, TrendingUp, Award } from 'lucide-react';
import StatCard from '../components/StatCard';
import { useLibrary } from '../context/LibraryContext';

const Dashboard = () => {
  const { stats } = useLibrary();

  const chartData = [
    { label: 'Total', value: stats.totalBooks, color: 'cyan' },
    { label: 'Available', value: stats.availableBooks, color: 'emerald' },
    { label: 'Issued', value: stats.issuedBooks, color: 'orange' },
    { label: 'Members', value: stats.totalUsers, color: 'purple' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">Welcome to BiblioCore - Your Digital Library Portal</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Books"
            value={stats.totalBooks}
            icon={BookOpen}
            color="cyan"
            delay={0}
          />
          <StatCard
            title="Available"
            value={stats.availableBooks}
            icon={TrendingUp}
            color="emerald"
            delay={0.1}
          />
          <StatCard
            title="Issued"
            value={stats.issuedBooks}
            icon={Award}
            color="orange"
            delay={0.2}
          />
          <StatCard
            title="Members"
            value={stats.totalUsers}
            icon={Users}
            color="purple"
            delay={0.3}
          />
        </div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-8">Library Statistics</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-6">Book Distribution</h3>
              <div className="space-y-4">
                {chartData.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-20 text-sm font-medium text-gray-400">{item.label}</div>
                    <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${
                          item.color === 'cyan' ? 'from-cyan-400 to-blue-500' :
                          item.color === 'emerald' ? 'from-emerald-400 to-teal-500' :
                          item.color === 'orange' ? 'from-orange-400 to-red-500' :
                          'from-purple-400 to-pink-500'
                        } rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / stats.totalBooks) * 100}%` }}
                        transition={{ duration: 1, delay: 0.6 + idx * 0.1 }}
                      />
                    </div>
                    <div className="w-12 text-right text-white font-semibold">{item.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pie Chart Animation */}
            <div className="flex items-center justify-center">
              <motion.div
                className="relative w-48 h-48"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#grad1)"
                    strokeWidth="8"
                    strokeDasharray={`${(stats.availableBooks / stats.totalBooks) * 282.7} 282.7`}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#grad2)"
                    strokeWidth="8"
                    strokeDasharray={`${(stats.issuedBooks / stats.totalBooks) * 282.7} 282.7`}
                    strokeDashoffset={-((stats.availableBooks / stats.totalBooks) * 282.7)}
                  />
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400">{stats.totalBooks}</div>
                    <div className="text-sm text-gray-400">Books</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-sm p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Availability Rate</p>
              <p className="text-2xl font-bold text-emerald-400">
                {stats.totalBooks > 0 ? Math.round((stats.availableBooks / stats.totalBooks) * 100) : 0}%
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Books Per Member</p>
              <p className="text-2xl font-bold text-cyan-400">
                {stats.totalUsers > 0 ? (stats.issuedBooks / stats.totalUsers).toFixed(1) : 0}
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Utilization</p>
              <p className="text-2xl font-bold text-purple-400">
                {stats.totalBooks > 0 ? Math.round((stats.issuedBooks / stats.totalBooks) * 100) : 0}%
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
