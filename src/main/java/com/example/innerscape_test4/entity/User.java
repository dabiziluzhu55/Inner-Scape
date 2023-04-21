package com.example.innerscape_test4.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String ID;
    private String name;
    private int headshot;
    private int thiks;

    public String getID() {
        return ID;
    }

    public String getName() {
        return name;
    }

    public int getHeadshot() {
        return headshot;
    }

    public int getThiks() {
        return thiks;
    }
}
