package com.example.innerscape_test4.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Star0VO {
    @JsonProperty("stars")
    private List<StarReplyVO> stars=new ArrayList<>();

    public void addStars(StarReplyVO starReply) {
        this.stars.add(starReply);
    }
}
