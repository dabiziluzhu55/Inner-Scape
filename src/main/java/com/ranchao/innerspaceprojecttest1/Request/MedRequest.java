package com.ranchao.innerspaceprojecttest1.Request;


import com.ranchao.innerspaceprojecttest1.entity.Meditation;
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
    public ArrayList<MeditationRequest> getMedResource(String level0,String level1) {
        return meditationService.findMedResource(level0,level1);
    }
    @RequestMapping("/keepRecords")
    public int keepMeditationInfo(Meditation meditation){
        return meditationService.writeMeditation(meditation);
    }

    @RequestMapping("/sound")
    public ArrayList<ArrayList<MeditationRequest>> getSounds(String level0){
        return meditationService.findMedResource1(level0);
    }
}

