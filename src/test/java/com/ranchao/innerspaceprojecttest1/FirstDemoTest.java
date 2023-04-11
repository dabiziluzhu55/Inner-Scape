package com.ranchao.innerspaceprojecttest1;

import com.alibaba.fastjson.JSON;
import com.ranchao.innerspaceprojecttest1.entity.User;
import com.ranchao.innerspaceprojecttest1.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
public class FirstDemoTest {
    @Autowired
    private UserMapper goodsMapper;

    @Test
    public void testSelectList() {
        List<User> goodsList = goodsMapper.selectList(null);

        System.out.println(JSON.toJSONString(goodsList));
    }
}