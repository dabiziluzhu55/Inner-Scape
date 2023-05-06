package com.ranchao.innerspaceprojecttest1.entityIO;

import lombok.Data;

import java.util.ArrayList;

@Data
public class MoodChartSend {
    ArrayList<Integer> dates;
    ArrayList<Integer> points;
    ArrayList<Integer> times;

    public MoodChartSend() {
        dates = new ArrayList<>();
        points = new ArrayList<>();
        times = new ArrayList<>();
    }

}
