package com.ranchao.innerspaceprojecttest1.entityIO;


import lombok.Data;

@Data
public class MoodReasonSend {

    private String text;
    private int count;

    public MoodReasonSend() {
    }

    public MoodReasonSend(String text, int count) {
        this.text = text;
        this.count = count;
    }
}
