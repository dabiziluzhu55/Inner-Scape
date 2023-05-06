package com.ranchao.innerspaceprojecttest1.controller;


import com.ranchao.innerspaceprojecttest1.entityIO.MoodReceive;
import com.ranchao.innerspaceprojecttest1.server.MoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
