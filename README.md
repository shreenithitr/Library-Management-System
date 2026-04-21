# 📚 Library Management System

A console-based **Library Management System** built in Java to efficiently manage books, users, and transactions using a clean command-line interface with persistent file storage.

---

## 🗂️ Project Structure

LIBRARY-MANAGEMENT-SYSTEM/
│
├── Book.java           # Book entity class (title, author, ISBN, availability)
├── User.java           # User entity class (ID, name, borrowed books)
├── Library.java        # Core logic — manages books, users, borrowing/returning
├── FileHandler.java    # Handles persistent read/write of data to files
├── Main.java           # Entry point — CLI menu and user interaction

---

## ✨ Features

- 📖 Add & Remove Books — Manage the library catalog  
- 👤 Register Users — Add and track members  
- 🔄 Borrow & Return Books — Track issued books  
- 📋 Display All Books / Users — View complete records  
- 💾 Persistent Storage — Data is saved and loaded using file handling  
- 🔍 Search Functionality — Quickly find books and users  

---

## 🚀 Getting Started

### Prerequisites

- Java JDK 8 or higher  
- Terminal / Command Prompt  

### Installation & Running

# Clone the repository
git clone https://github.com/shreenithitr/library-management-system.git

# Navigate into the project directory
cd library-management-system

# Compile all Java files
javac *.java

# Run the program
java Main

---

## 🖥️ Usage

========== LIBRARY MANAGEMENT SYSTEM ==========
1. Add Book  
2. Remove Book  
3. Add User  
4. Borrow Book  
5. Return Book  
6. Display All Books  
7. Display All Users  
0. Exit  
================================================  
Enter your choice:

---

## 🧱 Class Overview

Book → Stores book details (title, author, ISBN, availability)  
User → Stores user details (ID, name, borrowed books)  
Library → Handles core operations (add/remove, borrow/return)  
FileHandler → Manages file read/write for persistence  
Main → Runs CLI menu and user interaction  

---

## 📁 Data Persistence

All data is stored locally using file handling.  
Records are automatically saved and reloaded when the application restarts.

---

## 🛠️ Built With

- Java  
- File I/O  
- Object-Oriented Programming (OOP)  

---

## 🤝 Contributing

1. Fork the project  
2. Create a feature branch: git checkout -b feature/your-feature  
3. Commit your changes: git commit -m "Add feature"  
4. Push to the branch: git push origin feature/your-feature  
5. Open a Pull Request  

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

Shreenithi T R  
GitHub: https://github.com/shreenithitr  

---

⭐ If you found this project helpful, please give it a star on GitHub!
