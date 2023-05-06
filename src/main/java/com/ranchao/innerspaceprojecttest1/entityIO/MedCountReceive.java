package com.ranchao.innerspaceprojecttest1.entityIO;

import lombok.Data;

@Data
public class MedCountReceive {
    int totalTime;
    int totalCount;
    int todayTime;

    MedCountReceive() {
    }

    public MedCountReceive(int totalCount, int todayTime, int totalTime) {
        this.totalCount = totalCount;
        this.todayTime = todayTime;
        this.totalTime = totalTime;
    }
}
