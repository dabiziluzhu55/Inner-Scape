package com.example.innerscape_test4.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Refresh {
    private String refreshID;
    private String userID;
    private Date time;
    private String star1ID;
    private int open1;
    private String star2ID;
    private int open2;
    private String star3ID;
    private int open3;
    private String star4ID;
    private int open4;
    private String star5ID;
    private int open5;
    private String star6ID;
    private int open6;

    public String getRefreshID() {
        return refreshID;
    }

    public String getUserID() {
        return userID;
    }

    public Date getTime() {
        return time;
    }

    public String getStar1ID() {
        return star1ID;
    }

    public int getOpen1() {
        return open1;
    }

    public String getStar2ID() {
        return star2ID;
    }

    public int getOpen2() {
        return open2;
    }

    public String getStar3ID() {
        return star3ID;
    }

    public int getOpen3() {
        return open3;
    }

    public String getStar4ID() {
        return star4ID;
    }

    public int getOpen4() {
        return open4;
    }

    public String getStar5ID() {
        return star5ID;
    }

    public int getOpen5() {
        return open5;
    }

    public String getStar6ID() {
        return star6ID;
    }

    public int getOpen6() {
        return open6;
    }
}
