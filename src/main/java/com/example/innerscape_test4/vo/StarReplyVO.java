package com.example.innerscape_test4.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class StarReplyVO {
    @JsonProperty("starID")
    private String starID;
    @JsonProperty("starContent")
    private String starContent;
    @JsonProperty("replys")
    private List<ReplyVO> replys=new ArrayList<>();

    public void setStarID(String starID) {
        this.starID = starID;
    }

    public void setStarContent(String starContent) {
        this.starContent = starContent;
    }

    public void addReplys(ReplyVO reply) {
        this.replys.add(reply);
    }
}
