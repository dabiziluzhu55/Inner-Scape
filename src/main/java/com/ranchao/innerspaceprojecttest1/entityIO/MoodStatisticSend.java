package com.ranchao.innerspaceprojecttest1.entityIO;


import lombok.Data;

@Data
public class MoodStatisticSend {
    private int moodsRecord;
    private int moodsGenerated;
    private String moodMost;

    public MoodStatisticSend() {
    }

    public MoodStatisticSend(int moodsRecord, int moodsGenerated, String moodMost) {
        this.moodsRecord = moodsRecord;
        this.moodsGenerated = moodsGenerated;
        this.moodMost = moodMost;
    }
}
