public class TypeCastingExample {
    public static void main(String[] args) {
        double decimalValue = 9.75;
        System.out.println("Original double value: " + decimalValue);
        int intValue = (int) decimalValue;
        System.out.println("After casting to int: " + intValue);
        int wholeNumber = 5;
        System.out.println("Original int value: " + wholeNumber);
        double doubleFromInt = (double) wholeNumber;
        System.out.println("After casting to double: " + doubleFromInt);
    }
}
