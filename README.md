# BiblioCore - Library Management System

A professional **Library Management System** with both Java backend and modern HTML5 frontend. Efficiently manage books, users, and transactions with persistent file storage and an animated web interface.

---

## 🗂️ Project Structure

```
BiblioCore/
├── Book.java              # Book entity (ID, title, author, availability status)
├── User.java              # User entity (ID, name, email)
├── Library.java           # Core business logic (add/remove books, issue/return)
├── FileHandler.java       # Persistent file storage (books.txt, users.txt)
├── Main.java              # CLI entry point
├── index.html             # Professional animated web frontend
├── books.txt              # Persistent book data
├── users.txt              # Persistent user data
└── README.md              # This file
```

---

## ✨ Features

**Backend (Java CLI)**
- Add & Remove Books — Manage library catalog
- Register Users — Track library members
- Issue & Return Books — Monitor borrowing status
- Search Functionality — Find books by ID, title, or author
- Persistent Storage — Auto-save to files
- Display Records — View all books and users

**Frontend (HTML5 Web)**
- Animated 3D Bookshelf — Interactive book visualization
- Real-time Statistics — Total, available, and issued books
- Book Catalog Table — Search, filter, and manage books
- Member Directory — View all registered users
- Management Panel — Add books, issue/return, register members
- Responsive Design — Works on desktop and mobile
- Toast Notifications — Real-time feedback
- Local Storage — Data persists in browser

---

## 🚀 Getting Started

### Prerequisites

- Java JDK 8 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Terminal / Command Prompt

### Installation & Running

**Backend (Java CLI):**
```bash
# Clone the repository
git clone https://github.com/shreenithitr/Library-Management-System.git

# Navigate to project directory
cd Library-Management-System

# Compile all Java files
javac *.java

# Run the program
java Main
```

**Frontend (Web Interface):**
```bash
# Simply open in browser
index.html
```

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

---

## 🖥️ Usage

### CLI Menu
```
========================================
     LIBRARY MANAGEMENT SYSTEM         
========================================

--- MENU ---
1. Add Book
2. View All Books
3. Search Book
4. Issue Book
5. Return Book
6. Register User
7. View All Users
0. Exit
Enter choice:
```

### Web Interface
- **Home** — Hero section with quick navigation
- **Our Collection** — Animated 3D bookshelf display
- **Statistics** — Real-time counters (Total, Available, Issued, Members)
- **Book Catalog** — Search, filter, and manage books
- **Library Members** — View all registered users
- **Management Panel** — Forms to add books, issue/return, register members

---

## 🧱 Class Overview

| Class | Purpose |
|-------|---------|
| **Book** | Entity class storing book details (ID, title, author, issued status) |
| **User** | Entity class storing user details (ID, name, email) |
| **Library** | Core logic for all operations (add/remove, issue/return, search) |
| **FileHandler** | Manages persistent storage (read/write to books.txt, users.txt) |
| **Main** | CLI entry point with menu-driven interface |

---

## 📁 Data Persistence

**Backend:**
- `books.txt` — Stores all books (CSV format)
- `users.txt` — Stores all users (CSV format)
- Auto-saves after every operation

**Frontend:**
- Uses browser `localStorage`
- Data persists across sessions
- Seed data loads on first visit

---

## 🎨 Technology Stack

**Backend:**
- Java 8+
- File I/O
- Object-Oriented Programming (OOP)

**Frontend:**
- HTML5
- CSS3 (Animations, Gradients, Flexbox)
- Vanilla JavaScript (ES6+)
- Canvas API (Particle effects)
- LocalStorage API

---

## 📊 Sample Data

**Books:**
- The Great Gatsby - F. Scott Fitzgerald
- To Kill a Mockingbird - Harper Lee
- 1984 - George Orwell
- Pride and Prejudice - Jane Austen
- The Hobbit - J.R.R. Tolkien
- And more...

**Users:**
- Alice Johnson (alice@mail.com)
- Bob Smith (bob@mail.com)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👤 Author

**Shreenithi T R**
- GitHub: [@shreenithitr](https://github.com/shreenithitr)
- Project: [Library Management System](https://github.com/shreenithitr/Library-Management-System)

---

## 🌟 Features Roadmap

- [ ] Database integration (MySQL/PostgreSQL)
- [ ] User authentication & roles
- [ ] Due date tracking for borrowed books
- [ ] Fine calculation system
- [ ] Email notifications
- [ ] Advanced reporting & analytics
- [ ] Mobile app (React Native)
- [ ] REST API backend

---

⭐ If you found this project helpful, please give it a star on GitHub!
