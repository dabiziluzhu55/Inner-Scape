package com.ranchao.innerspaceprojecttest1.entityIO;


import lombok.Data;

@Data
public class MoodDistributionSend {
    private String url;
    private String name;
    private int count;

    public MoodDistributionSend(String url, String name, int count) {
        this.url = url;
        this.name = name;
        this.count = count;
    }

    public MoodDistributionSend() {
    }
}
