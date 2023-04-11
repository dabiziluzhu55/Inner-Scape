package com.ranchao.innerspaceprojecttest1.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Date;

@Data
@TableName("meditation")
public class Meditation {
    private String ID;
    private Date startTime;
    private Date endTime;
    private int lastTime;

}
