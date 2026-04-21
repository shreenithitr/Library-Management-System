import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X } from 'lucide-react';
import BookCard from '../components/BookCard';
import { useLibrary } from '../context/LibraryContext';

const Books = () => {
  const { books, addBook, returnBook } = useLibrary();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: '', title: '', author: '' });
  const [notification, setNotification] = useState('');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'available') return matchesSearch && !book.issued;
    if (filter === 'issued') return matchesSearch && book.issued;
    return matchesSearch;
  });

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.title || !formData.author) {
      setNotification('Please fill all fields');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    if (books.find(b => b.id === formData.id)) {
      setNotification('Book ID already exists');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    addBook(formData);
    setFormData({ id: '', title: '', author: '' });
    setShowModal(false);
    setNotification('Book added successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleReturnBook = (bookId) => {
    returnBook(bookId);
    setNotification('Book returned successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

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
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              Books Collection
            </h1>
            <p className="text-gray-400">{filteredBooks.length} books found</p>
          </div>
          <motion.button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Add Book
          </motion.button>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title, author, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {['all', 'available', 'issued'].map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Books Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        >
          <AnimatePresence>
            {filteredBooks.map((book, idx) => (
              <BookCard
                key={book.id}
                book={book}
                onReturn={handleReturnBook}
                delay={idx * 0.05}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass p-12 text-center"
          >
            <p className="text-gray-400 text-lg">No books found</p>
          </motion.div>
        )}

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
                  <h2 className="text-2xl font-bold text-white">Add New Book</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddBook} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Book ID"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full btn-primary mt-6"
                  >
                    Add Book
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

export default Books;
