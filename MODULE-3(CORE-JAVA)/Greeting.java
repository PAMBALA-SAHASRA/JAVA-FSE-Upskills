package com.greetings;

import com.utils.Utility;

public class Greeting {
    public static void main(String[] args) {
        String greeting = Utility.getGreeting("Alice");
        System.out.println(greeting);
    }
}
