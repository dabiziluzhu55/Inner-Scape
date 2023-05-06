package com.ranchao.innerspaceprojecttest1.details;

import lombok.Data;

@Data
public class Mood {
    String name;
    int number;
    int point;

    public Mood(String name, int number, int point) {
        this.name = name;
        this.number = number;
        this.point = point;
    }
    public Mood(){}
}