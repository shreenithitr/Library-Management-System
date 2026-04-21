public class Book {
    private String bookId;
    private String title;
    private String author;
    private boolean isIssued;
    private String issuedTo;

    public Book(String bookId, String title, String author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.isIssued = false;
        this.issuedTo = "";
    }

    // Getters
    public String getBookId() { return bookId; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public boolean isIssued() { return isIssued; }
    public String getIssuedTo() { return issuedTo; }

    // Setters
    public void setIssued(boolean issued) { this.isIssued = issued; }
    public void setIssuedTo(String userId) { this.issuedTo = userId; }

    @Override
    public String toString() {
        return bookId + "," + title + "," + author + "," + isIssued + "," + issuedTo;
    }

    public static Book fromString(String line) {
        String[] parts = line.split(",", -1);
        Book b = new Book(parts[0], parts[1], parts[2]);
        b.setIssued(Boolean.parseBoolean(parts[3]));
        b.setIssuedTo(parts[4]);
        return b;
    }
}