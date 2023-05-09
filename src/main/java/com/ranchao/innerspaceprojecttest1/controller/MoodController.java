package com.ranchao.innerspaceprojecttest1.controller;


import com.ranchao.innerspaceprojecttest1.entityIO.*;
import com.ranchao.innerspaceprojecttest1.server.MoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping("/moodRequest")
public class MoodController {
    @Autowired
    MoodService moodService;

    @RequestMapping("/setMood")
    public int setMood(MoodReceive moodReceive) {
        return moodService.setMoodService(moodReceive);
    }

    @RequestMapping("/monthDistribution")
    public ArrayList<MoodDistributionSend> getMonthDistribution(String openId, int month) {
        return moodService.distributionSend(openId, 1, month);
    }

    @RequestMapping("/weekDistribution")
    public ArrayList<MoodDistributionSend> getWeekDistribution(String openId) {
        return moodService.distributionSend(openId, 2, 0);
    }

    @RequestMapping("/monthReason")
    public ArrayList<MoodReasonSend> getMonthReason(String openId, int month) {
        return moodService.reasonSend(openId, 1, month);
    }

    @RequestMapping("/weekReason")
    public ArrayList<MoodReasonSend> getWeekReason(String openId) {
        return moodService.reasonSend(openId, 2, 0);
    }

    @RequestMapping("/monthStatistic")
    public MoodStatisticSend getStatistic(String openId, int month) {
        return moodService.statisticSend(openId, 1, month);
    }

    @RequestMapping("/monthPercent")
    public MoodPercentSend getPercent(String openId, int month) {
        return moodService.percentSend(openId, 1, month);
    }

    @RequestMapping("/monthData")
    public ArrayList<MoodDailySend> getDailyMood(String openId, int month) {
        return moodService.dailySend(openId, 1, month);
    }

}
