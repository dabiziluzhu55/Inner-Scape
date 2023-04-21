package com.example.innerscape_test4.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ReplyBigVO {
    @JsonProperty("replys")
    private List<ReplyToStarVO> replys=new ArrayList<>();

    public void addReplys(ReplyToStarVO reply) {
        this.replys.add(reply);
    }
}
