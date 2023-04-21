package com.example.innerscape_test4.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StarLittleReply {
    private String starContent;
    private String starHostName;
    private int replyNum;

    public String getStarContent() {
        return starContent;
    }

    public String getStarHostName() {
        return starHostName;
    }

    public int getReplyNum() {
        return replyNum;
    }
}
