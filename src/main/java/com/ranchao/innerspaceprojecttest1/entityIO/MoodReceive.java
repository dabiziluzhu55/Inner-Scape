package com.ranchao.innerspaceprojecttest1.entityIO;


import lombok.Data;

@Data
public class MoodReceive {
    String openId;
    int moodNumber;
    String diary;
    String reason;
    String recordTime;

    public MoodReceive(String openId, int moodNumber, String diary, String reason, String recordTime) {
        this.openId = openId;
        this.moodNumber = moodNumber;
        this.diary = diary;
        this.reason = reason;
        this.recordTime = recordTime;
    }

    public MoodReceive() {
    }
}
