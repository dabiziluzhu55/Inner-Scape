package com.example.innerscape_test4.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StarLittle {
    private String starID;
    private String starContent;
    private String starHostName;
    private int open;

    public String getStarID() {
        return starID;
    }

    public String getStarContent() {
        return starContent;
    }

    public String getStarHostName() {
        return starHostName;
    }

    public int getOpen() {
        return open;
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

    public void setOpen(int open) {
        this.open = open;
    }
}
