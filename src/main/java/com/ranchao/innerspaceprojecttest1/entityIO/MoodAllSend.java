package com.ranchao.innerspaceprojecttest1.entityIO;


import lombok.Data;

@Data
public class MoodAllSend {
    private String name;
    private String url;

    public MoodAllSend() {
    }

    public MoodAllSend(String name, String url) {
        this.name = name;
        this.url = url;
    }
}
