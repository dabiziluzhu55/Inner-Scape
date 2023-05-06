package com.example.innerscape_test4;

import com.example.innerscape_test4.entity.*;
import com.example.innerscape_test4.repository.DataRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

@SpringBootTest
class InnerScapeTest4ApplicationTests {

    @Autowired
    private DataRepository dataRepository;

    @Test
    void contextLoads1() {
        //测试登录注册
        List<User>user_test1=dataRepository.FindUser("test1");
        if(user_test1.isEmpty()) {
            dataRepository.AddUser("test1", "testUser1", 1);
            user_test1=dataRepository.FindUser("test1");
        }
        System.out.println(user_test1.get(0));
    }

    @Test
    void contextLoads2() {
        //测试修改头像和昵称
        List<User>user_test1=dataRepository.FindUser("test1");
        System.out.println(user_test1.get(0));
        dataRepository.ChangeHeadshot("test1",2);
        user_test1=dataRepository.FindUser("test1");
        System.out.println(user_test1.get(0));
        dataRepository.ChangeName("test1","testU1");
        user_test1=dataRepository.FindUser("test1");
        System.out.println(user_test1.get(0));
    }

    @Test
    void contextLoads3(){
        //测试放飞星星和星星相关查找
        Timestamp nowTime=new Timestamp(System.currentTimeMillis());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String nowTimeStr = dateFormat.format(nowTime);
        dataRepository.AddStar("testStar1","test1","testU1","测试1",nowTimeStr);
        List<StarLittle>starLittle_testStar1=dataRepository.CatchStar("testStar1");
        System.out.println(starLittle_testStar1.get(0));
        List<StarLittleReply>starLittleReply_testStar1=dataRepository.GetStarContent("testStar1");
        System.out.println(starLittleReply_testStar1.get(0));
        List<Star>star_testStar1=dataRepository.FindStar("test1");
        System.out.println(star_testStar1.get(0));
        List<String>string_testStar1=dataRepository.GetStarHost("testStar1");
        System.out.println(string_testStar1.get(0));
    }

    @Test
    void contextLoads4(){
        //测试他人查看星星和删除星星
        dataRepository.AddUser("test2", "testUser2", 3);
        List<String>string_no_test2=dataRepository.Select6Stars("test2");
        for(String snt2:string_no_test2)
            System.out.println(snt2);
        dataRepository.DeleteStar("testStar1");
        string_no_test2=dataRepository.Select6Stars("test2");
        for(String snt2:string_no_test2)
            System.out.println(snt2);
    }

    @Test
    void contextLoads5(){
        //测试系统刷新
        Timestamp nowTime=new Timestamp(System.currentTimeMillis());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String nowTimeStr = dateFormat.format(nowTime);
        List<String>string_test1sStar=dataRepository.FindRefreshHistoryToday0("test1",nowTimeStr);
        if(string_test1sStar.isEmpty()){
            dataRepository.AddHistory0("testRefresh1","test1",nowTimeStr,"testNullStar1","testNullStar2",
                    "testNullStar3","testNullStar4","testNullStar5","testNullStar6");
            string_test1sStar=dataRepository.FindRefreshHistoryToday0("test1",nowTimeStr);
        }
        System.out.println(string_test1sStar.get(0));
        List<Refresh>refresh_testRefresh1=dataRepository.GetRefresh("testRefresh1");
        System.out.println(refresh_testRefresh1.get(0));
    }

    @Test
    void contextLoads6(){
        //测试用户刷新
        Timestamp nowTime=new Timestamp(System.currentTimeMillis());
        DateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String nowTimeStr = datetimeFormat.format(nowTime);
        List<Integer>integer_test1sStar=dataRepository.FindRefreshHistoryInHalfHour1("test1",nowTimeStr);
        if(integer_test1sStar.isEmpty()){
            dataRepository.AddHistory1("test1",nowTimeStr);
            dataRepository.ChangeHistory0("testRefresh1","testNullStar7","testNullStar8",
                    "testNullStar9","testNullStar10","testNullStar11","testNullStar12");
            integer_test1sStar=dataRepository.FindRefreshHistoryInHalfHour1("test1",nowTimeStr);
        }
        System.out.println(integer_test1sStar.get(0));
        List<Refresh>refresh_testRefresh1=dataRepository.GetRefresh("testRefresh1");
        System.out.println(refresh_testRefresh1.get(0));
    }

    @Test
    void contextLoads7(){
        //测试获取一小时内放飞星星数量
        DateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Timestamp nowTime1=new Timestamp(System.currentTimeMillis());
        String nowTimeStr1 = datetimeFormat.format(nowTime1);
        dataRepository.AddStar("testStar2","test1","testU1","测试2",nowTimeStr1);
        Timestamp nowTime2=new Timestamp(System.currentTimeMillis());
        String nowTimeStr2 = datetimeFormat.format(nowTime2);
        dataRepository.AddStar("testStar3","test1","testU1","测试3",nowTimeStr2);
        Timestamp nowTime3=new Timestamp(System.currentTimeMillis());
        String nowTimeStr3 = datetimeFormat.format(nowTime3);
        dataRepository.AddStar("testStar4","test1","testU1","测试4",nowTimeStr3);
        Timestamp nowTime4=new Timestamp(System.currentTimeMillis());
        String nowTimeStr4 = datetimeFormat.format(nowTime4);
        int flyNum=dataRepository.FlyNum("test1",nowTimeStr4);
        System.out.println(flyNum);
    }

    @Test
    void contextLoads8(){
        //测试回复与查看回复
        Timestamp nowTime=new Timestamp(System.currentTimeMillis());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String nowTimeStr = dateFormat.format(nowTime);
        dataRepository.AddHistory0("testRefresh2","test2",nowTimeStr,"testStar1","testStar2",
                "testStar3","testStar4","testNullStar13","testNullStar14");
        List<Refresh>refresh_test2sStar=dataRepository.GetRefresh("testRefresh2");
        System.out.println(refresh_test2sStar.get(0));
        dataRepository.AddHostReply("testStar2","testRefresh2","测试回复1","testUser2",1);
        dataRepository.AddGuestReply("testRefresh2","testStar2","测试2",
                "testU1","测试回复1","test2");
        dataRepository.Reply("testRefresh2",2);
        refresh_test2sStar=dataRepository.GetRefresh("testRefresh2");
        System.out.println(refresh_test2sStar.get(0));
        List<Star>star_test1=dataRepository.FindStar("test1");
        for(Star st1:star_test1)
            System.out.println(st1);
        List<StarReply>starReply_test2=dataRepository.FindReply("test2");
        for(StarReply srt2:starReply_test2)
            System.out.println(srt2);
    }

    @Test
    void contextLoads9(){
        //测试新消息更新
        dataRepository.NewInfoAdd1("test1");
        dataRepository.NewInfoAdd1("test1");
        List<User>user_test1=dataRepository.FindUser("test1");
        System.out.println(user_test1.get(0));
        dataRepository.NewInfoReturn0("test1");
        user_test1=dataRepository.FindUser("test1");
        System.out.println(user_test1.get(0));
    }

    @Test
    void contextLoads10(){
        //测试删除回复
        List<StarReply>starReply_test2=dataRepository.FindReply("test2");
        for(StarReply srt2:starReply_test2)
            System.out.println(srt2);
        dataRepository.DeleteReply("testRefresh2");
        starReply_test2=dataRepository.FindReply("test2");
        for(StarReply srt2:starReply_test2)
            System.out.println(srt2);
        List<Star>star_test1=dataRepository.FindStar("test1");
        for(Star st1:star_test1)
            System.out.println(st1);
        dataRepository.DeleteStarReply("testStar2","testRefresh2");
        star_test1=dataRepository.FindStar("test1");
        for(Star st1:star_test1)
            System.out.println(st1);
    }

}
