package com.ranchao.innerspaceprojecttest1.server;

import com.alibaba.fastjson.JSON;
import com.ranchao.innerspaceprojecttest1.entity.User;
import com.ranchao.innerspaceprojecttest1.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UserService {
    @Autowired
    private UserMapper userMapper;

    public void testSelectList() {
        List<User> goodsList = userMapper.selectList(null);
        System.out.println(JSON.toJSONString(goodsList));
    }
}
