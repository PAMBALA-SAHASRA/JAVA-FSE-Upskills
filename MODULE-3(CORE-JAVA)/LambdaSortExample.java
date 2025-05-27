import java.util.*;

public class LambdaSortExample {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("Banana", "Apple", "Mango", "Grapes", "Orange");
        Collections.sort(list, (s1, s2) -> s1.compareTo(s2));
        System.out.println(list);
    }
}
