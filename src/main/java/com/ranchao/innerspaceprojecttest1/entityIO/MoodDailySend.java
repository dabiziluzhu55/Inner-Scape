package com.ranchao.innerspaceprojecttest1.entityIO;


import lombok.Data;

@Data
public class MoodDailySend {
    private String day;
    private double point;

    public MoodDailySend() {
    }

    public MoodDailySend(String day, double point) {
        this.day = day;
        this.point = point;
    }
}
