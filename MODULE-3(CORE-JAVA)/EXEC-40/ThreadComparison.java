import java.time.Duration;
import java.time.Instant;

public class ThreadComparison {
    public static void main(String[] args) throws InterruptedException {
        Instant startVirtual = Instant.now();
        Thread[] virtualThreads = new Thread[100000];
        for (int i = 0; i < 100000; i++) {
            virtualThreads[i] = Thread.startVirtualThread(() -> System.out.println("Virtual thread"));
        }
        for (Thread t : virtualThreads) {
            t.join();
        }
        Instant endVirtual = Instant.now();
        System.out.println("Virtual Threads Time: " + Duration.between(startVirtual, endVirtual).toMillis() + " ms");

        Instant startPlatform = Instant.now();
        Thread[] platformThreads = new Thread[100000];
        for (int i = 0; i < 100000; i++) {
            platformThreads[i] = new Thread(() -> System.out.println("Platform thread"));
            platformThreads[i].start();
        }
        for (Thread t : platformThreads) {
            t.join();
        }
        Instant endPlatform = Instant.now();
        System.out.println("Platform Threads Time: " + Duration.between(startPlatform, endPlatform).toMillis() + " ms");
    }
}
