package com.example.innerscape_test4.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Code0VO {
    @JsonProperty("code")
    private int code;

    public void setCode(int code) {
        this.code = code;
    }
}
