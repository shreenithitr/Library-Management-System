import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

const IssueReturn = () => {
  const { books, users, issueBook, returnBook } = useLibrary();
  const [activeTab, setActiveTab] = useState('issue');
  const [issueForm, setIssueForm] = useState({ bookId: '', userId: '' });
  const [returnForm, setReturnForm] = useState({ bookId: '' });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleIssueBook = (e) => {
    e.preventDefault();
    if (!issueForm.bookId || !issueForm.userId) {
      showNotification('Please fill all fields', 'error');
      return;
    }

    const book = books.find(b => b.id === issueForm.bookId);
    const user = users.find(u => u.id === issueForm.userId);

    if (!book) {
      showNotification('Book not found', 'error');
      return;
    }

    if (!user) {
      showNotification('User not found', 'error');
      return;
    }

    if (book.issued) {
      showNotification(`Already issued to ${book.issuedTo}`, 'error');
      return;
    }

    issueBook(issueForm.bookId, issueForm.userId);
    setIssueForm({ bookId: '', userId: '' });
    showNotification(`"${book.title}" successfully issued to ${user.name}`);
  };

  const handleReturnBook = (e) => {
    e.preventDefault();
    if (!returnForm.bookId) {
      showNotification('Please enter Book ID', 'error');
      return;
    }

    const book = books.find(b => b.id === returnForm.bookId);

    if (!book) {
      showNotification('Book not found', 'error');
      return;
    }

    if (!book.issued) {
      showNotification('Book is not currently issued', 'error');
      return;
    }

    returnBook(returnForm.bookId);
    setReturnForm({ bookId: '' });
    showNotification(`"${book.title}" successfully returned`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Issue & Return Books
          </h1>
          <p className="text-gray-400">Manage book lending and returns</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 mb-8"
        >
          {[
            { id: 'issue', label: 'Issue Book' },
            { id: 'return', label: 'Return Book' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'glass text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Forms */}
        <AnimatePresence mode="wait">
          {activeTab === 'issue' ? (
            <motion.div
              key="issue"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Issue a Book to Member</h2>

                <form onSubmit={handleIssueBook} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Book ID</label>
                      <select
                        value={issueForm.bookId}
                        onChange={(e) => setIssueForm({ ...issueForm, bookId: e.target.value })}
                        className="w-full glass-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                      >
                        <option value="">Select a book</option>
                        {books.filter(b => !b.issued).map((book) => (
                          <option key={book.id} value={book.id}>
                            {book.title} ({book.id})
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-2">Only available books shown</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Member ID</label>
                      <select
                        value={issueForm.userId}
                        onChange={(e) => setIssueForm({ ...issueForm, userId: e.target.value })}
                        className="w-full glass-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                      >
                        <option value="">Select a member</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} ({user.id})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {issueForm.bookId && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-sm p-4 border-l-4 border-cyan-400"
                    >
                      <p className="text-sm text-gray-300">
                        Book: <span className="text-cyan-400 font-semibold">
                          {books.find(b => b.id === issueForm.bookId)?.title}
                        </span>
                      </p>
                      <p className="text-sm text-gray-300">
                        Author: <span className="text-cyan-400 font-semibold">
                          {books.find(b => b.id === issueForm.bookId)?.author}
                        </span>
                      </p>
                    </motion.div>
                  )}

                  {issueForm.userId && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-sm p-4 border-l-4 border-blue-400"
                    >
                      <p className="text-sm text-gray-300">
                        Member: <span className="text-blue-400 font-semibold">
                          {users.find(u => u.id === issueForm.userId)?.name}
                        </span>
                      </p>
                      <p className="text-sm text-gray-300">
                        Email: <span className="text-blue-400 font-semibold">
                          {users.find(u => u.id === issueForm.userId)?.email}
                        </span>
                      </p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={20} />
                    Issue Book
                  </motion.button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="return"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Return a Book</h2>

                <form onSubmit={handleReturnBook} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Book ID</label>
                    <select
                      value={returnForm.bookId}
                      onChange={(e) => setReturnForm({ bookId: e.target.value })}
                      className="w-full glass-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    >
                      <option value="">Select a book</option>
                      {books.filter(b => b.issued).map((book) => (
                        <option key={book.id} value={book.id}>
                          {book.title} ({book.id}) - Issued to {book.issuedTo}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2">Only issued books shown</p>
                  </div>

                  {returnForm.bookId && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-sm p-4 border-l-4 border-emerald-400"
                    >
                      <p className="text-sm text-gray-300">
                        Book: <span className="text-emerald-400 font-semibold">
                          {books.find(b => b.id === returnForm.bookId)?.title}
                        </span>
                      </p>
                      <p className="text-sm text-gray-300">
                        Currently issued to: <span className="text-emerald-400 font-semibold">
                          {books.find(b => b.id === returnForm.bookId)?.issuedTo}
                        </span>
                      </p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Check size={20} />
                    Return Book
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-8 rounded-2xl mt-12"
        >
          <h3 className="text-xl font-bold text-white mb-6">Issued Books</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {books.filter(b => b.issued).map((book, idx) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-sm p-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-white font-semibold">{book.title}</p>
                  <p className="text-sm text-gray-400">Issued to: {book.issuedTo}</p>
                </div>
                <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">
                  Issued
                </span>
              </motion.div>
            ))}
            {books.filter(b => b.issued).length === 0 && (
              <p className="text-gray-400 text-center py-8">No issued books</p>
            )}
          </div>
        </motion.div>

        {/* Notification */}
        <AnimatePresence>
          {notification.show && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed bottom-8 right-8 glass px-6 py-4 rounded-lg text-white font-medium flex items-center gap-2 ${
                notification.type === 'error' ? 'border-l-4 border-red-500' : 'border-l-4 border-emerald-500'
              }`}
            >
              {notification.type === 'success' && <Check size={20} className="text-emerald-400" />}
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default IssueReturn;
