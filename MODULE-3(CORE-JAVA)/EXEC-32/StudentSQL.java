import java.sql.*;

public class StudentSQL {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/your_database";
        String user = "root";
        String password = "your_password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            StudentDAO dao = new StudentDAO(conn);

            Student student1 = new Student(1, "Alice", 20);
            dao.insertStudent(student1);

            Student updatedStudent = new Student(1, "Alicia", 21);
            dao.updateStudent(updatedStudent);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
