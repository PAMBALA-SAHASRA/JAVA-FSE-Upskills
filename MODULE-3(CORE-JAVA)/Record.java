import java.util.List;
import java.util.stream.Collectors;

public class Record {
    public static record Person(String name, int age) {
    }

    public static void main(String[] args) {
        Person p1 = new Person("Alice", 30);
        Person p2 = new Person("Bob", 25);
        Person p3 = new Person("Charlie", 35);

        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);

        List<Person> people = List.of(p1, p2, p3);

        List<Person> filtered = people.stream()
                .filter(person -> person.age() > 28)
                .collect(Collectors.toList());

        filtered.forEach(System.out::println);
    }
}
