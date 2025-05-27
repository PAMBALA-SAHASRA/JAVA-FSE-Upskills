import java.lang.reflect.Method;
import java.lang.reflect.Parameter;

public class ReflectionExample {
    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("java.util.ArrayList");

        Method[] methods = cls.getDeclaredMethods();

        for (Method method : methods) {
            System.out.print(method.getName() + "(");
            Parameter[] params = method.getParameters();
            for (int i = 0; i < params.length; i++) {
                System.out.print(params[i].getType().getSimpleName());
                if (i < params.length - 1)
                    System.out.print(", ");
            }
            System.out.println(")");
        }

        Object instance = cls.getDeclaredConstructor().newInstance();
        Method addMethod = cls.getDeclaredMethod("add", Object.class);
        addMethod.invoke(instance, "Hello");
        Method sizeMethod = cls.getDeclaredMethod("size");
        Object size = sizeMethod.invoke(instance);
        System.out.println("Size: " + size);
    }
}
