package com.ranchao.innerspaceprojecttest1.entityIO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MoodDiarySend {
    private int id;
    private LocalDateTime recordTime;
    private String diary;
    private String reason;
    private String moodImageUrl;

    public MoodDiarySend() {
    }

    public MoodDiarySend(int id, LocalDateTime recordTime, String diary, String reason, String moodImageUrl) {
        this.id = id;
        this.recordTime = recordTime;
        this.diary = diary;
        this.reason = reason;
        this.moodImageUrl = moodImageUrl;
    }

    public MoodDiarySend(int id, String diary, String reason) {
        this.id = id;
        this.diary = diary;
        this.reason = reason;
    }
}
