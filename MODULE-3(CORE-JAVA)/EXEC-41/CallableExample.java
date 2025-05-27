import java.util.concurrent.*;
import java.util.*;

public class CallableExample {
    public static void main(String[] args) throws InterruptedException, ExecutionException {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        List<Callable<String>> callables = Arrays.asList(
                () -> "Task 1 result",
                () -> "Task 2 result",
                () -> "Task 3 result");

        List<Future<String>> futures = new ArrayList<>();
        for (Callable<String> task : callables) {
            futures.add(executor.submit(task));
        }

        for (Future<String> future : futures) {
            System.out.println(future.get());
        }

        executor.shutdown();
    }
}
