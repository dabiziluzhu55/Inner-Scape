package com.example.innerscape_test4.repository;

import com.example.innerscape_test4.entity.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DataRepository {
    public List<User> FindUser(String userID);
    public void AddUser(String userID,String userName,int headshot);

    public List<String> FindRefreshHistoryToday0(String userID, String time);
    public List<Integer> FindRefreshHistoryInHalfHour1(String userID,String time);
    public void AddHistory0(String refreshID,String userID,String time,String star1ID,String star2ID,String star3ID,String star4ID,String star5ID,String star6ID);
    public void ChangeHistory0(String refreshID,String star1ID,String star2ID,String star3ID,String star4ID,String star5ID,String star6ID);
    public void AddHistory1(String userID,String time);
    public List<Refresh> GetRefresh(String refreshID);
    public List<StarLittle> CatchStar(String starID);
    public List<String> Select6Stars(String userID);
    public int FlyNum(String userID,String time);
    public void AddStar(String starID,String userID,String userName,String starContent,String time);
    public List<StarLittleReply> GetStarContent(String starID);

    public void Reply(String refreshID,int open);
    public void AddHostReply(String starID,String replyID,String replySay,String replyGuestName,int replyNum);
    public void AddGuestReply(String replyID,String starID,String starContent,String starHostName,String replySay,String replyGuestID);

    public List<Star> FindStar(String userID);
    public List<StarReply> FindReply(String userID);
    public void DeleteReply(String replyID);
    public void DeleteStarReply(String starID,String replyID);
    public String GetStarHost(String starID);
    public void DeleteStar(String starID);
}
