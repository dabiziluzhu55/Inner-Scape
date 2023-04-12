package com.ranchao.innerspaceprojecttest1.entity;


import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;

import java.util.Date;

@Data
@TableName(value = "InnerMeditation")
public class Meditation {
    private String openId;
    private String type;
    private Date startTime;
    private Date endTime;

}
