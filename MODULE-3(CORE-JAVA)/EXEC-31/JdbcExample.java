import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JdbcExample {

    public static void main(String[] args) {

        String jdbcUrl = "jdbc:mysql://localhost:3306/school";
        String username = "root";
        String password = "your_password";

        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            connection = DriverManager.getConnection(jdbcUrl, username, password);

            statement = connection.createStatement();

            String sql = "SELECT id, name, age, email FROM students";
            resultSet = statement.executeQuery(sql);

            System.out.println("ID\tName\tAge\tEmail");
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                int age = resultSet.getInt("age");
                String email = resultSet.getString("email");

                System.out.println(id + "\t" + name + "\t" + age + "\t" + email);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {

            try {
                if (resultSet != null)
                    resultSet.close();
                if (statement != null)
                    statement.close();
                if (connection != null)
                    connection.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}
