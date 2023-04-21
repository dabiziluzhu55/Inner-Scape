package com.example.innerscape_test4.vo;

import com.example.innerscape_test4.entity.StarLittle;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class StarsVO {
    @JsonProperty("starID")
    private String starID;
    @JsonProperty("starContent")
    private String starContent;
    @JsonProperty("starHost")
    private String starHost;
    @JsonProperty("open")
    private int open;

    public StarsVO(StarLittle starLittle) {
        this.starID = starLittle.getStarID();
        this.starContent = starLittle.getStarContent();
        this.starHost = starLittle.getStarHostName();
        this.open=starLittle.getOpen();
    }
}
