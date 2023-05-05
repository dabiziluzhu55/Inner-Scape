package com.ranchao.innerspaceprojecttest1.controller;


import com.ranchao.innerspaceprojecttest1.entity.MeditationForReceive;
import com.ranchao.innerspaceprojecttest1.entitySend.MedCountReturn;
import com.ranchao.innerspaceprojecttest1.entitySend.MeditationRequest;
import com.ranchao.innerspaceprojecttest1.server.MeditationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping("/medRequest")
public class MedRequest {
    @Autowired
    MeditationService meditationService;

    @RequestMapping("/getResources")
    public ArrayList<MeditationRequest> getMedResource(String level0, String level1) {
        return meditationService.findMedResource(level0, level1);
    }

    @RequestMapping("/setRecords")
    public int keepMeditationInfo(MeditationForReceive meditation) {
        return meditationService.writeMeditation(meditation);
    }

    @RequestMapping("/sound")
    public ArrayList<ArrayList<MeditationRequest>> getSounds(String level0) {
        return meditationService.findMedResource1(level0);
    }

    @RequestMapping("/totalRecords")
    public MedCountReturn getRecodes(String openId) {
        System.out.println("success");
        return meditationService.meditationByOpenID(openId);
    }
}

