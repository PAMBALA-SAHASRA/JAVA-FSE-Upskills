import java.sql.*;

public class MoneyTransfer {

    private static final String URL = "jdbc:mysql://localhost:3306/your_database";
    private static final String USER = "your_username";
    private static final String PASSWORD = "your_password";

    public static void main(String[] args) {
        transferMoney(1, 2, 200.00);
    }

    public static void transferMoney(int fromAccount, int toAccount, double amount) {
        Connection conn = null;
        PreparedStatement debitStmt = null;
        PreparedStatement creditStmt = null;

        try {
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            conn.setAutoCommit(false);

            debitStmt = conn.prepareStatement("UPDATE accounts SET balance = balance - ? WHERE account_id = ?");
            debitStmt.setDouble(1, amount);
            debitStmt.setInt(2, fromAccount);
            int debitResult = debitStmt.executeUpdate();

            creditStmt = conn.prepareStatement("UPDATE accounts SET balance = balance + ? WHERE account_id = ?");
            creditStmt.setDouble(1, amount);
            creditStmt.setInt(2, toAccount);
            int creditResult = creditStmt.executeUpdate();

            if (debitResult == 1 && creditResult == 1) {
                conn.commit();
                System.out.println("Transfer successful.");
            } else {
                conn.rollback();
                System.out.println("Transfer failed. Transaction rolled back.");
            }

        } catch (SQLException e) {
            try {
                if (conn != null)
                    conn.rollback();
                System.out.println("Exception occurred. Rolled back.");
                e.printStackTrace();
            } catch (SQLException rollbackEx) {
                rollbackEx.printStackTrace();
            }
        } finally {
            try {
                if (debitStmt != null)
                    debitStmt.close();
                if (creditStmt != null)
                    creditStmt.close();
                if (conn != null)
                    conn.setAutoCommit(true);
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
