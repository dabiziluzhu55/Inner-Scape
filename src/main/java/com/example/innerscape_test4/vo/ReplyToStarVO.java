package com.example.innerscape_test4.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ReplyToStarVO {
    @JsonProperty("replyID")
    private String replyID;
    @JsonProperty("replySay")
    private String replySay;
    @JsonProperty("starID")
    private String starID;
    @JsonProperty("starContent")
    private String starContent;
    @JsonProperty("starHostName")
    private String starHostName;

    public void setReplyID(String replyID) {
        this.replyID = replyID;
    }

    public void setReplySay(String replySay) {
        this.replySay = replySay;
    }

    public void setStarID(String starID) {
        this.starID = starID;
    }

    public void setStarContent(String starContent) {
        this.starContent = starContent;
    }

    public void setStarHostName(String starHostName) {
        this.starHostName = starHostName;
    }
}
