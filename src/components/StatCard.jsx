import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color = 'cyan', delay = 0 }) => {
  const colorMap = {
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    emerald: 'from-emerald-500 to-teal-500',
    orange: 'from-orange-500 to-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="stat-card group"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
        <div className={`p-3 bg-gradient-to-br ${colorMap[color]} rounded-lg text-white shadow-lg`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-2">
        {value}
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: delay + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default StatCard;
