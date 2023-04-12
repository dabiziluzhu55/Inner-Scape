package com.ranchao.innerspaceprojecttest1.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.context.annotation.Primary;

@Data
@TableName(value = "InnerUser")
public class User {
    private String openId;
    private String nickName;
    private int photoNum;
}
