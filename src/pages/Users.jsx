import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Mail, X } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

const UserManagement = () => {
  const { users, books, addUser } = useLibrary();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', email: '' });
  const [notification, setNotification] = useState('');

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name || !formData.email) {
      setNotification('Please fill all fields');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    if (users.find(u => u.id === formData.id)) {
      setNotification('User ID already exists');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    addUser(formData);
    setFormData({ id: '', name: '', email: '' });
    setShowModal(false);
    setNotification('Member added successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const getUserBooksCount = (userId) => {
    return books.filter(b => b.issuedTo === userId).length;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              Members
            </h1>
            <p className="text-gray-400">{users.length} members registered</p>
          </div>
          <motion.button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Add Member
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div
            className="glass p-6 text-center hover:scale-105 transition-transform duration-300"
            whileHover={{ y: -5 }}
          >
            <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-2">Total Members</p>
            <p className="text-3xl font-bold text-white">{users.length}</p>
          </motion.div>

          <motion.div
            className="glass p-6 text-center hover:scale-105 transition-transform duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="text-cyan-400 text-3xl font-bold mx-auto mb-2">
              {books.filter(b => b.issued).length}
            </div>
            <p className="text-gray-400 text-sm">Books Issued</p>
          </motion.div>

          <motion.div
            className="glass p-6 text-center hover:scale-105 transition-transform duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="text-cyan-400 text-3xl font-bold mx-auto mb-2">
              {users.length > 0 ? (books.filter(b => b.issued).length / users.length).toFixed(1) : 0}
            </div>
            <p className="text-gray-400 text-sm">Avg Books Per Member</p>
          </motion.div>
        </motion.div>

        {/* Users Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <AnimatePresence>
            {users.map((user, idx) => {
              const booksCount = getUserBooksCount(user.id);
              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass p-6 rounded-xl group hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300"
                >
                  {/* User Avatar */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{user.name}</h3>
                      <p className="text-sm text-cyan-400 font-medium">{user.id}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-2 mb-4 text-gray-300">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-sm">{user.email}</span>
                  </div>

                  {/* Books Info */}
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Books Issued</span>
                      <motion.span
                        className="text-2xl font-bold text-cyan-400"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {booksCount}
                      </motion.span>
                    </div>
                  </div>

                  {/* Books Detail */}
                  {booksCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2 pt-4 border-t border-white/10"
                    >
                      <p className="text-xs text-gray-400">Currently reading:</p>
                      {books
                        .filter(b => b.issuedTo === user.id)
                        .map((book) => (
                          <div
                            key={book.id}
                            className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded truncate"
                            title={book.title}
                          >
                            {book.title}
                          </div>
                        ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {users.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass p-12 text-center"
          >
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-400 text-lg">No members registered yet</p>
          </motion.div>
        )}

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 rounded-2xl overflow-hidden"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Members Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Books Issued</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {users.map((user, idx) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-cyan-400 font-medium">{user.id}</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <motion.span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            getUserBooksCount(user.id) > 0
                              ? 'bg-orange-500/20 text-orange-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {getUserBooksCount(user.id)}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="glass p-8 rounded-2xl max-w-md w-full mx-4"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Register New Member</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddUser} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Member ID"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full btn-primary mt-6"
                  >
                    Register Member
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 glass px-6 py-4 rounded-lg text-white font-medium"
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UserManagement;
