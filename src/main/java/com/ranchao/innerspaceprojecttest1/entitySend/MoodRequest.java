package com.ranchao.innerspaceprojecttest1.entitySend;

import lombok.Data;

import java.util.ArrayList;

@Data
public class MoodRequest {
    ArrayList<Integer> dates;
    ArrayList<Integer> points;
    ArrayList<Integer> times;

    public MoodRequest() {
        dates = new ArrayList<>();
        points = new ArrayList<>();
        times = new ArrayList<>();
    }

}
