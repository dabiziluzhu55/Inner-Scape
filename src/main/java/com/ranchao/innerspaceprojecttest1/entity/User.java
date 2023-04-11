package com.ranchao.innerspaceprojecttest1.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("user")
public class User {
    private String id;
    private String name;
    private int age;
}
