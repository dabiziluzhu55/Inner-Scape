package com.example.innerscape_test4.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Star {
    private String starID;
    private String starContent;
    private String starHostID;
    private String starHostName;
    private Timestamp flyTime;
    private int replyNum;
    private String reply1ID;
    private String reply1Say;
    private String reply1GuestName;
    private String reply2ID;
    private String reply2Say;
    private String reply2GuestName;
    private String reply3ID;
    private String reply3Say;
    private String reply3GuestName;
    private String reply4ID;
    private String reply4Say;
    private String reply4GuestName;
    private String reply5ID;
    private String reply5Say;
    private String reply5GuestName;
    private String reply6ID;
    private String reply6Say;
    private String reply6GuestName;
    private int deleted;

    public String getStarID() {
        return starID;
    }

    public String getStarContent() {
        return starContent;
    }

    public String getStarHostID() {
        return starHostID;
    }

    public String getStarHostName() {
        return starHostName;
    }

    public Timestamp getFlyTime() {
        return flyTime;
    }

    public int getReplyNum() {
        return replyNum;
    }

    public String getReply1ID() {
        return reply1ID;
    }

    public String getReply1Say() {
        return reply1Say;
    }

    public String getReply1GuestName() {
        return reply1GuestName;
    }

    public String getReply2ID() {
        return reply2ID;
    }

    public String getReply2Say() {
        return reply2Say;
    }

    public String getReply2GuestName() {
        return reply2GuestName;
    }

    public String getReply3ID() {
        return reply3ID;
    }

    public String getReply3Say() {
        return reply3Say;
    }

    public String getReply3GuestName() {
        return reply3GuestName;
    }

    public String getReply4ID() {
        return reply4ID;
    }

    public String getReply4Say() {
        return reply4Say;
    }

    public String getReply4GuestName() {
        return reply4GuestName;
    }

    public String getReply5ID() {
        return reply5ID;
    }

    public String getReply5Say() {
        return reply5Say;
    }

    public String getReply5GuestName() {
        return reply5GuestName;
    }

    public String getReply6ID() {
        return reply6ID;
    }

    public String getReply6Say() {
        return reply6Say;
    }

    public String getReply6GuestName() {
        return reply6GuestName;
    }

    public int getDeleted() {
        return deleted;
    }
}
