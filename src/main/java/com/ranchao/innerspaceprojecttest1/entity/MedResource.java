package com.ranchao.innerspaceprojecttest1.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "MedResource")
public class MedResource {
    private String level0;
    private String level1;
    private int id;
    private String imageUrl;

    private String musicUrl;
    private String content;
}
