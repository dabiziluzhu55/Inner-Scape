package com.ranchao.innerspaceprojecttest1.entitySend;

import lombok.Data;

@Data
public class MedCountReturn {
    int totalTime;
    int totalCount;
    int todayTime;

    MedCountReturn() {
    }

    public MedCountReturn(int totalCount, int todayTime, int totalTime) {
        this.totalCount = totalCount;
        this.todayTime = todayTime;
        this.totalTime = totalTime;
    }
}
