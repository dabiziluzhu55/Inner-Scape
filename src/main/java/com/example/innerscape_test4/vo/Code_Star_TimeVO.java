package com.example.innerscape_test4.vo;

import com.example.innerscape_test4.entity.StarLittle;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Code_Star_TimeVO {
    @JsonProperty("code")
    private int code;
    @JsonProperty("refreshID")
    private String refreshID;
    @JsonProperty("stars")
    private List<StarsVO>stars=new ArrayList<>();
    @JsonProperty("remainTime")
    private int remainTime;

    public void setCode(int code) {
        this.code = code;
    }

    public void setRefreshID(String refreshID) {
        this.refreshID = refreshID;
    }

    public void addStars(StarsVO star) {
        this.stars.add(star);
    }

    public void setRemainTime(int remainTime) {
        this.remainTime = remainTime;
    }
}
