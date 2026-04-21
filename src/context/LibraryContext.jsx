import React, { createContext, useState, useContext, useEffect } from 'react';

const LibraryContext = createContext();

const INITIAL_BOOKS = [
  { id: 'B001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', issued: false, issuedTo: '' },
  { id: 'B002', title: 'To Kill a Mockingbird', author: 'Harper Lee', issued: false, issuedTo: '' },
  { id: 'B003', title: '1984', author: 'George Orwell', issued: true, issuedTo: 'U001' },
  { id: 'B004', title: 'Pride and Prejudice', author: 'Jane Austen', issued: false, issuedTo: '' },
  { id: 'B005', title: 'The Catcher in the Rye', author: 'J.D. Salinger', issued: false, issuedTo: '' },
  { id: 'B006', title: 'Brave New World', author: 'Aldous Huxley', issued: true, issuedTo: 'U002' },
  { id: 'B007', title: 'The Hobbit', author: 'J.R.R. Tolkien', issued: false, issuedTo: '' },
  { id: 'B008', title: 'Harry Potter', author: 'J.K. Rowling', issued: false, issuedTo: '' },
];

const INITIAL_USERS = [
  { id: 'U001', name: 'Alice Johnson', email: 'alice@mail.com' },
  { id: 'U002', name: 'Bob Smith', email: 'bob@mail.com' },
];

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [users, setUsers] = useState(INITIAL_USERS);

  useEffect(() => {
    const savedBooks = localStorage.getItem('lms_books');
    const savedUsers = localStorage.getItem('lms_users');
    if (savedBooks) setBooks(JSON.parse(savedBooks));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem('lms_books', JSON.stringify(books));
    localStorage.setItem('lms_users', JSON.stringify(users));
  };

  const addBook = (book) => {
    const newBook = { ...book, issued: false, issuedTo: '' };
    setBooks([...books, newBook]);
    saveToLocalStorage();
  };

  const issueBook = (bookId, userId) => {
    setBooks(books.map(b => 
      b.id === bookId ? { ...b, issued: true, issuedTo: userId } : b
    ));
    saveToLocalStorage();
  };

  const returnBook = (bookId) => {
    setBooks(books.map(b => 
      b.id === bookId ? { ...b, issued: false, issuedTo: '' } : b
    ));
    saveToLocalStorage();
  };

  const addUser = (user) => {
    setUsers([...users, user]);
    saveToLocalStorage();
  };

  const deleteBook = (bookId) => {
    setBooks(books.filter(b => b.id !== bookId));
    saveToLocalStorage();
  };

  const stats = {
    totalBooks: books.length,
    availableBooks: books.filter(b => !b.issued).length,
    issuedBooks: books.filter(b => b.issued).length,
    totalUsers: users.length,
  };

  return (
    <LibraryContext.Provider value={{
      books,
      users,
      stats,
      addBook,
      issueBook,
      returnBook,
      addUser,
      deleteBook,
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within LibraryProvider');
  }
  return context;
};
