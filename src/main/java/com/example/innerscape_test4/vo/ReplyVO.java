package com.example.innerscape_test4.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ReplyVO {
    @JsonProperty("replyID")
    private String replyID;
    @JsonProperty("replySay")
    private String replySay;
    @JsonProperty("replyGuestName")
    private String replyGuestName;

    public void setReplyID(String replyID) {
        this.replyID = replyID;
    }

    public void setReplySay(String replySay) {
        this.replySay = replySay;
    }

    public void setReplyGuestName(String replyGuestName) {
        this.replyGuestName = replyGuestName;
    }
}
