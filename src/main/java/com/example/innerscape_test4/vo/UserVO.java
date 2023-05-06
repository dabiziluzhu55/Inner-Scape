package com.example.innerscape_test4.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserVO {
    @JsonProperty("code")
    private int code;
    @JsonProperty("userName")
    private String userName;
    @JsonProperty("headshot")
    private int headshot;

    public void setCode(int code) {
        this.code = code;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setHeadshot(int headshot) {
        this.headshot = headshot;
    }
}
