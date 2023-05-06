package com.example.innerscape_test4.repository;

import com.example.innerscape_test4.entity.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface DataRepository {
    /**根据微信号查询用户表*/
    public List<User> FindUser(String userID);
    /**将微信号、昵称、头像编号作为新用户插入用户表*/
    public void AddUser(String userID,String userName,int headshot);
    /**根据微信号修改用户的头像编号*/
    public void ChangeHeadshot(String userID,int headshot);
    /**根据微信号修改用户的昵称*/
    public void ChangeName(String userID,String userName);
    /**根据微信号、当天时间查询系统刷星表的刷新编号*/
    public List<String> FindRefreshHistoryToday0(String userID, String time);
    /**根据微信号、当时时间查询用户刷星表与相差半小时内记录之后半小时时刻的秒数差*/
    public List<Integer> FindRefreshHistoryInHalfHour1(String userID,String time);
    /**将刷新编号、操作用户微信号、当天时间、刷新得到的星星1编号、星星2编号、星星3编号、星星4编号、星星5编号、星星6编号作为新刷新记录插入系统刷星表*/
    public void AddHistory0(String refreshID,String userID,String time,String star1ID,String star2ID,String star3ID,String star4ID,String star5ID,String star6ID);
    /**根据刷新编号修改系统刷星表内刷新记录的星星1编号、星星2编号、星星3编号、星星4编号、星星5编号、星星6编号*/
    public void ChangeHistory0(String refreshID,String star1ID,String star2ID,String star3ID,String star4ID,String star5ID,String star6ID);
    /**将操作用户微信号、当时时间作为新刷新记录插入用户刷星表*/
    public void AddHistory1(String userID,String time);
    /**根据刷新编号查询系统刷星表内刷新记录*/
    public List<Refresh> GetRefresh(String refreshID);
    /**根据星星编号查询星表内星星的星星编号、星语内容、星主昵称*/
    public List<StarLittle> CatchStar(String starID);
    /**在星表内查询6个星主微信号不为此微信号、回复数量未满6、未被标记为删除的星星的星星编号*/
    public List<String> Select6Stars(String userID);
    /**根据微信号查询星表内一小时内放飞的星星数量*/
    public int FlyNum(String userID,String time);
    /**将星星编号、星主微信号、星主昵称、星语内容、放飞时间作为新星星插入星表*/
    public void AddStar(String starID,String userID,String userName,String starContent,String time);
    /**根据星星编号查询星表内星星的星语内容、星主昵称、回复数量*/
    public List<StarLittleReply> GetStarContent(String starID);
    /**根据刷新编号和回复编号吧对应星星设为已回复*/
    public void Reply(String refreshID,int open);
    /**根据星星编号和回复数量在星表中星星对应位置写入回复编号、回复内容、回复者名称并修改回复数量*/
    public void AddHostReply(String starID,String replyID,String replySay,String replyGuestName,int replyNum);
    /**将回复编号、回复星星编号、星语内容、星主昵称、回复内容、回复者微信号作为新回复插入星星回复表*/
    public void AddGuestReply(String replyID,String starID,String starContent,String starHostName,String replySay,String replyGuestID);
    /**根据用户微信号查找星表内未标记为删除的星星*/
    public List<Star> FindStar(String userID);
    /**根据用户微信号查找星星回复表内未被标记为删除的回复*/
    public List<StarReply> FindReply(String userID);
    /**根据回复编号把星星回复表内对应回复标记为已删除*/
    public void DeleteReply(String replyID);
    /**根据星星编号和回复编号，把星表内星星的对应回复标记为已删除*/
    public void DeleteStarReply(String starID,String replyID);
    /**根据星星编号在星表内查询星主微信号*/
    public List<String> GetStarHost(String starID);
    /**根据星星编号把星表内对应星星标记为已删除*/
    public void DeleteStar(String starID);
    /**根据微信号把用户表内对应用户的新消息数量加一*/
    public void NewInfoAdd1(String userID);
    /**根据微信号把用户表内对应用户的新消息数量归零*/
    public void NewInfoReturn0(String userID);
}
