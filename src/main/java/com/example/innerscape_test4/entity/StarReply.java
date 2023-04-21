package com.example.innerscape_test4.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StarReply {
    private String replyID;
    private String starID;
    private String starContent;
    private String starHostName;
    private String replySay;
    private String replyGuestID;

    public String getReplyID() {
        return replyID;
    }

    public String getStarID() {
        return starID;
    }

    public String getStarContent() {
        return starContent;
    }

    public String getStarHostName() {
        return starHostName;
    }

    public String getReplySay() {
        return replySay;
    }

    public String getReplyGuestID() {
        return replyGuestID;
    }
}
