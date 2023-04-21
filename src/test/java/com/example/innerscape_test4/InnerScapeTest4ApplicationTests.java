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
    void contextLoads() {
        List<User> u1= dataRepository.FindUser("QCD1");
        System.out.println(u1.isEmpty());
        List<User> u2= dataRepository.FindUser("QCD5");
        System.out.println(u2.isEmpty());
        dataRepository.AddUser("QCD5","测试用户5",2);
        List<User> u3= dataRepository.FindUser("QCD5");
        System.out.println(u3.isEmpty());
        List<User> u4= dataRepository.FindUser("QCD2");
        System.out.println(u4.get(0).getID());
        System.out.println(u4.get(0).getName());
        System.out.println(u4.get(0).getHeadshot());
        System.out.println(u4.get(0).getThiks());
    }

    @Test
    void contextLoads2() {
        Timestamp tsnow=new Timestamp(System.currentTimeMillis());
        DateFormat dateFormat0 = new SimpleDateFormat("yyyy-MM-dd");
        DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String strDate0 = dateFormat0.format(tsnow);
        String strDate1 = dateFormat1.format(tsnow);
        System.out.println(strDate0);
        System.out.println(strDate1);
        List<String>us0=dataRepository.FindRefreshHistoryToday0("QCD1",strDate0);
        if(us0.isEmpty()) {
            //dataRepository.AddHistory0("QCD1", strDate0);
            System.out.println("空的");
        }
        else {
            System.out.println("不空");
            for (String us : us0)
                System.out.println(us);
        }
        List<Integer>us1=dataRepository.FindRefreshHistoryInHalfHour1("QCD1",strDate1);
        if(us1.isEmpty()) {
            dataRepository.AddHistory1("QCD1", strDate1);
            System.out.println("空的");
        }
        else {
            System.out.println("不空");
            for (int us : us1)
                System.out.println(us);
        }
    }

    @Test
    void contextLoads3(){
        /*List<StarLittle>sl=dataRepository.Catch6Stars("QCD3");
        for(StarLittle s:sl){
            System.out.println(s.getStarID()+" "+s.getStarContent()+" "+s.getStarHostName());
        }*/
    }

    @Test
    void contextLoads4(){
        Timestamp tsnow=new Timestamp(System.currentTimeMillis());
        System.out.println(tsnow);
        DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
        String strDate = dateFormat.format(tsnow);
        System.out.println(strDate);
    }

    @Test
    void contextLoads5(){
        List<User>userList=dataRepository.FindUser("QCD1");
        if(!userList.isEmpty()) {
            String user000=userList.get(0).getName();
            Timestamp tsnow = new Timestamp(System.currentTimeMillis());
            System.out.println(tsnow);
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            String strDate = dateFormat.format(tsnow);
            dataRepository.AddStar("QCD1"+strDate,"QCD1",user000,"测试ing",strDate);
        }
    }

    @Test
    void contextLoads6(){
        List<StarLittleReply> starLittleReplies=dataRepository.GetStarContent("Q1");
        if(!starLittleReplies.isEmpty()){
            dataRepository.AddHostReply("Q1","R2","?!!!!","测试用户2",starLittleReplies.get(0).getReplyNum()+1);
            dataRepository.AddGuestReply("R2","Q1",starLittleReplies.get(0).getStarContent(),starLittleReplies.get(0).getStarHostName(),"?!!!!","QCD2");
        }
    }

    @Test
    void contextLoads7(){
        List<Star> stars=dataRepository.FindStar("QCD1");
        if(!stars.isEmpty()) {
            System.out.println(stars.get(0).getReplyNum());
            System.out.println(stars.get(0).getReply1GuestName());
            System.out.println(stars.get(0).getReply1ID());
            System.out.println(stars.get(0).getReply1Say());
            System.out.println(stars.get(0).getReply2GuestName());
            System.out.println(stars.get(0).getReply2ID());
            System.out.println(stars.get(0).getReply2Say());
            System.out.println(stars.get(0).getReply3GuestName());
            System.out.println(stars.get(0).getReply3ID());
            System.out.println(stars.get(0).getReply3Say());
        }
    }

    @Test
    void contextLoads8(){
        List<StarReply> starReplies=dataRepository.FindReply("QCD2");
        System.out.println(starReplies.get(0).getStarContent());
    }

}
