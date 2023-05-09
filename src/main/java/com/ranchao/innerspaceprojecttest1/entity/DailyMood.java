package com.ranchao.innerspaceprojecttest1.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName(value = "dailyMood")
public class DailyMood {
    @TableField(value = "open_id")
    private String openId;
    @TableField(value = "mood_number")
    private int moodNumber;
    @TableField(value = "diary")
    private String diary;
    @TableField(value = "reason")
    private String reason;
    @TableField(value = "record_time")
    private LocalDateTime recordTime;

    public DailyMood(String openId, int moodNumber, String diary, String reason, LocalDateTime recordTime) {
        this.openId = openId;
        this.moodNumber = moodNumber;
        this.diary = diary;
        this.reason = reason;
        this.recordTime = recordTime;
    }

    public DailyMood() {
    }

    public DailyMood(DailyMood t){
        this.openId = t.getOpenId();
        this.moodNumber = t.getMoodNumber();
        this.diary = t.getDiary();
        this.reason = t.getReason();
        this.recordTime = t.getRecordTime();
    }
}
