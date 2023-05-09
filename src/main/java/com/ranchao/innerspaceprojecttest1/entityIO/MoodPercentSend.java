package com.ranchao.innerspaceprojecttest1.entityIO;

import lombok.Data;

@Data
public class MoodPercentSend {
    private double positive;
    private double negative;
    private double normal;

    public MoodPercentSend() {
    }

    public MoodPercentSend(double negative, double normal, double positive) {
        this.positive = positive;
        this.negative = negative;
        this.normal = normal;
    }
}
