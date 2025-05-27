public class PatternMatchingSwitch {
    public static void checkObjectType(Object obj) {
        String result = switch (obj) {
            case Integer i -> "Integer: " + i;
            case String s -> "String: " + s;
            case Double d -> "Double: " + d;
            case null -> "Null value";
            default -> "Unknown type";
        };
        System.out.println(result);
    }

    public static void main(String[] args) {
        checkObjectType(10);
        checkObjectType("hello");
        checkObjectType(3.14);
        checkObjectType(true);
        checkObjectType(null);
    }
}
