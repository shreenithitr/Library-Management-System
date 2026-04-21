import java.util.Scanner;

public class Main {
    static Scanner sc = new Scanner(System.in);
    static Library library = new Library();

    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("     LIBRARY MANAGEMENT SYSTEM         ");
        System.out.println("========================================");

        while (true) {
            printMenu();
            String choice = sc.nextLine().trim();
            switch (choice) {
                case "1" -> addBook();
                case "2" -> library.displayAllBooks();
                case "3" -> searchBook();
                case "4" -> issueBook();
                case "5" -> returnBook();
                case "6" -> addUser();
                case "7" -> library.displayAllUsers();
                case "0" -> { System.out.println("Exiting... Goodbye!"); return; }
                default  -> System.out.println("Invalid choice. Try again.");
            }
        }
    }

    static void printMenu() {
        System.out.println("\n--- MENU ---");
        System.out.println("1. Add Book");
        System.out.println("2. View All Books");
        System.out.println("3. Search Book");
        System.out.println("4. Issue Book");
        System.out.println("5. Return Book");
        System.out.println("6. Register User");
        System.out.println("7. View All Users");
        System.out.println("0. Exit");
        System.out.print("Enter choice: ");
    }

    static void addBook() {
        System.out.print("Book ID: "); String id = sc.nextLine().trim();
        System.out.print("Title: ");   String title = sc.nextLine().trim();
        System.out.print("Author: ");  String author = sc.nextLine().trim();
        if (id.isEmpty() || title.isEmpty() || author.isEmpty()) {
            System.out.println("All fields are required."); return;
        }
        library.addBook(id, title, author);
    }

    static void searchBook() {
        System.out.print("Enter Book ID, Title, or Author: ");
        library.searchBook(sc.nextLine().trim());
    }

    static void issueBook() {
        System.out.print("Book ID: "); String bid = sc.nextLine().trim();
        System.out.print("User ID: "); String uid = sc.nextLine().trim();
        library.issueBook(bid, uid);
    }

    static void returnBook() {
        System.out.print("Book ID to return: ");
        library.returnBook(sc.nextLine().trim());
    }

    static void addUser() {
        System.out.print("User ID: "); String id = sc.nextLine().trim();
        System.out.print("Name: ");    String name = sc.nextLine().trim();
        System.out.print("Email: ");   String email = sc.nextLine().trim();
        if (id.isEmpty() || name.isEmpty() || email.isEmpty()) {
            System.out.println("All fields are required."); return;
        }
        library.addUser(id, name, email);
    }
}