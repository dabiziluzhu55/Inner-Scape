package com.example.innerscape_test4.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class NewInfoVO {
    @JsonProperty("newInfo")
    private int newInfo;

    public void setNewInfo(int newInfo) {
        this.newInfo = newInfo;
    }
}
