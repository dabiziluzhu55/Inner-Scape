package com.example.innerscape_test4.service;

import com.example.innerscape_test4.entity.Star;
import com.example.innerscape_test4.entity.StarLittle;
import com.example.innerscape_test4.entity.StarReply;
import com.example.innerscape_test4.entity.User;

import java.util.List;

public interface DataService {
    public int UserExist(String userID);
    public int Register(String userID,String userName,int headshot);
    public List<User> Login(String userID);
    public int ChangeHeadshot(String userID,int headshot);
    public int ChangeName(String userID,String userName);
    public String Refresh0(String userID);
    public int Refresh1(String userID);
    public List<StarLittle> CatchRefreshStars(String refreshID);
    public String SelectStars(String userID);
    public String ReSelectStars(String userID);
    public int FlyStar(String userID,String starContent);
    public int ReplyStar(String starID,String userID,String replySay,String refreshID);
    public List<Star>ViewMyReply(String userID);
    public List<StarReply>ViewReplyToOthers(String userID);
    public int DeleteMyReply(String replyID);
    public int DeleteOtherReplyToMe(String starID,String replyID);
    public int StarLandfall(String starID,String userID);
    public int GetNewInfo(String userID);
}
