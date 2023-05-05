package com.ranchao.innerspaceprojecttest1.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DailyMood {
    String openID;
    int moodNumber;
    String diary;
    String reason;
    LocalDateTime recordTime;

    public DailyMood(String openID, int moodNumber, String diary, LocalDateTime recordTime) {
        this.openID = openID;
        this.moodNumber = moodNumber;
        this.diary = diary;
        this.recordTime = recordTime;
    }

    public DailyMood(){}
}
