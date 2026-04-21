import java.util.*;

public class Library {
    private List<Book> books;
    private List<User> users;

    public Library() {
        books = FileHandler.loadBooks();
        users = FileHandler.loadUsers();
    }

    // ── Book Operations ──────────────────────────────────────

    public void addBook(String id, String title, String author) {
        if (findBook(id) != null) {
            System.out.println("Book ID already exists.");
            return;
        }
        books.add(new Book(id, title, author));
        FileHandler.saveBooks(books);
        System.out.println("Book added successfully.");
    }

    public void displayAllBooks() {
        if (books.isEmpty()) { System.out.println("No books available."); return; }
        System.out.println("\n--- All Books ---");
        System.out.printf("%-8s %-30s %-20s %-10s%n", "ID", "Title", "Author", "Status");
        System.out.println("-".repeat(70));
        for (Book b : books) {
            String status = b.isIssued() ? "Issued (" + b.getIssuedTo() + ")" : "Available";
            System.out.printf("%-8s %-30s %-20s %-10s%n",
                b.getBookId(), b.getTitle(), b.getAuthor(), status);
        }
    }

    public void searchBook(String keyword) {
        System.out.println("\n--- Search Results ---");
        boolean found = false;
        for (Book b : books) {
            if (b.getTitle().equalsIgnoreCase(keyword) ||
                b.getBookId().equalsIgnoreCase(keyword) ||
                b.getAuthor().equalsIgnoreCase(keyword)) {
                System.out.println("ID: " + b.getBookId());
                System.out.println("Title: " + b.getTitle());
                System.out.println("Author: " + b.getAuthor());
                System.out.println("Status: " + (b.isIssued() ? "Issued to " + b.getIssuedTo() : "Available"));
                found = true;
            }
        }
        if (!found) System.out.println("No book found for: " + keyword);
    }

    public void issueBook(String bookId, String userId) {
        Book book = findBook(bookId);
        User user = findUser(userId);

        if (book == null) { System.out.println("Book not found."); return; }
        if (user == null) { System.out.println("User not found."); return; }
        if (book.isIssued()) { System.out.println("Book already issued to " + book.getIssuedTo()); return; }

        book.setIssued(true);
        book.setIssuedTo(userId);
        FileHandler.saveBooks(books);
        System.out.println("Book \"" + book.getTitle() + "\" issued to " + user.getName());
    }

    public void returnBook(String bookId) {
        Book book = findBook(bookId);
        if (book == null) { System.out.println("Book not found."); return; }
        if (!book.isIssued()) { System.out.println("Book was not issued."); return; }

        book.setIssued(false);
        book.setIssuedTo("");
        FileHandler.saveBooks(books);
        System.out.println("Book \"" + book.getTitle() + "\" returned successfully.");
    }

    // ── User Operations ──────────────────────────────────────

    public void addUser(String id, String name, String email) {
        if (findUser(id) != null) { System.out.println("User ID already exists."); return; }
        users.add(new User(id, name, email));
        FileHandler.saveUsers(users);
        System.out.println("User registered successfully.");
    }

    public void displayAllUsers() {
        if (users.isEmpty()) { System.out.println("No users registered."); return; }
        System.out.println("\n--- Registered Users ---");
        System.out.printf("%-8s %-20s %-25s%n", "ID", "Name", "Email");
        System.out.println("-".repeat(55));
        for (User u : users)
            System.out.printf("%-8s %-20s %-25s%n", u.getUserId(), u.getName(), u.getEmail());
    }

    // ── Helpers ──────────────────────────────────────────────

    private Book findBook(String id) {
        for (Book b : books) if (b.getBookId().equalsIgnoreCase(id)) return b;
        return null;
    }

    private User findUser(String id) {
        for (User u : users) if (u.getUserId().equalsIgnoreCase(id)) return u;
        return null;
    }
}