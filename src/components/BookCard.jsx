import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BookCard = ({ book, onReturn, delay = 0 }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 10;
    const y = (e.clientX - rect.left - rect.width / 2) / 10;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const colors = [
    'from-red-600 to-red-800',
    'from-blue-600 to-blue-800',
    'from-green-600 to-green-800',
    'from-purple-600 to-purple-800',
    'from-orange-600 to-orange-800',
    'from-indigo-600 to-indigo-800',
    'from-amber-600 to-amber-800',
    'from-teal-600 to-teal-800',
  ];

  const color = colors[book.id.charCodeAt(1) % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      whileHover={{ scale: 1.05 }}
      className="book-card cursor-pointer h-full"
    >
      <div className={`bg-gradient-to-br ${color} rounded-xl p-6 h-full flex flex-col justify-between shadow-xl`}>
        <div>
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-white/80 text-sm mb-4">
            by {book.author}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/70 text-xs font-medium">ID: {book.id}</span>
            <motion.span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                book.issued
                  ? 'bg-red-500/30 text-red-300'
                  : 'bg-emerald-500/30 text-emerald-300'
              }`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {book.issued ? 'Issued' : 'Available'}
            </motion.span>
          </div>

          {book.issued && (
            <motion.button
              onClick={() => onReturn(book.id)}
              className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg font-medium transition-all text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return Book
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
