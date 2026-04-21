import java.io.*;
import java.util.*;

public class FileHandler {
    private static final String BOOKS_FILE = "books.txt";
    private static final String USERS_FILE = "users.txt";

    public static void saveBooks(List<Book> books) {
        try (PrintWriter pw = new PrintWriter(new FileWriter(BOOKS_FILE))) {
            for (Book b : books) pw.println(b.toString());
        } catch (IOException e) {
            System.out.println("Error saving books: " + e.getMessage());
        }
    }

    public static List<Book> loadBooks() {
        List<Book> books = new ArrayList<>();
        File file = new File(BOOKS_FILE);
        if (!file.exists()) return books;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null)
                if (!line.trim().isEmpty()) books.add(Book.fromString(line));
        } catch (IOException e) {
            System.out.println("Error loading books: " + e.getMessage());
        }
        return books;
    }

    public static void saveUsers(List<User> users) {
        try (PrintWriter pw = new PrintWriter(new FileWriter(USERS_FILE))) {
            for (User u : users) pw.println(u.toString());
        } catch (IOException e) {
            System.out.println("Error saving users: " + e.getMessage());
        }
    }

    public static List<User> loadUsers() {
        List<User> users = new ArrayList<>();
        File file = new File(USERS_FILE);
        if (!file.exists()) return users;
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null)
                if (!line.trim().isEmpty()) users.add(User.fromString(line));
        } catch (IOException e) {
            System.out.println("Error loading users: " + e.getMessage());
        }
        return users;
    }
}