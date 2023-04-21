package com.example.innerscape_test4.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TestVO {
    @JsonProperty("could")
    private boolean could;

    public void setCould(boolean could) {
        this.could = could;
    }
}
