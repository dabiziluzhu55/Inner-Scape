package com.ranchao.innerspaceprojecttest1.server;

import com.ranchao.innerspaceprojecttest1.entity.MedResource;
import com.ranchao.innerspaceprojecttest1.entity.Meditation;
import com.ranchao.innerspaceprojecttest1.entitySend.MeditationRequest;
import com.ranchao.innerspaceprojecttest1.mapper.MedResourceMapper;
import com.ranchao.innerspaceprojecttest1.mapper.MeditationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MeditationService {
    @Autowired
    MeditationMapper meditationMapper;
    @Autowired
    MedResourceMapper medResourceMapper;

    // 从数据库取数据，需要匹配level0，和level1，两个资源
    public ArrayList<MeditationRequest> findMedResource(String level0, String level1) {
        Map<String, Object> map = new HashMap<>();
        map.put("level0", level0);
        map.put("level1", level1);
        List<MedResource> resources = medResourceMapper.selectByMap(map);
        resources.forEach(System.out::println);

        ArrayList<MeditationRequest> meditationRequests = new ArrayList<>();
        for (MedResource resource : resources) {
            MeditationRequest meditationRequest = new MeditationRequest();
            meditationRequest.setId(resource.getId());
            meditationRequest.setImageUrl(resource.getImageUrl());
            meditationRequest.setMusicUrl(resource.getMusicUrl());
            meditationRequest.setContent(resource.getContent());
            meditationRequests.add(meditationRequest);
        }
        return meditationRequests;
    }

    public ArrayList<ArrayList<MeditationRequest>> findMedResource1(String level0) {
        ArrayList<ArrayList<MeditationRequest>> whiteNoiseRequests = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        map.put("level0", level0);
        List<MedResource> resources = medResourceMapper.selectByMap(map);
        System.out.println(resources);
        ArrayList<String> temps = choice(level0);
        for (String temp : temps) {
            ArrayList<MeditationRequest> whiteNoiseRequest = new ArrayList<>();
            for (MedResource medResource : resources) {
                if (Objects.equals(medResource.getLevel1(), temp)) {
                    MeditationRequest meditationRequest = new MeditationRequest();
                    meditationRequest.setContent(medResource.getContent());
                    meditationRequest.setId(medResource.getId());
                    meditationRequest.setImageUrl(medResource.getImageUrl());
                    meditationRequest.setMusicUrl(medResource.getMusicUrl());
                    whiteNoiseRequest.add(meditationRequest);
                }
            }
            whiteNoiseRequests.add(whiteNoiseRequest);
        }
        return whiteNoiseRequests;
    }


    public ArrayList<String> choice(String level0) {
        ArrayList<String> temps = new ArrayList<>();
        if (level0.equals("声音")) {
            temps.add("自然");
            temps.add("音乐");
            temps.add("生活");
            temps.add("ASMR");
        } else {
            temps.add("睡眠");
            temps.add("放松");
        }
        return temps;
    }

    public int writeMeditation(Meditation meditation) {
        return meditationMapper.insert(meditation);
    }

    public int meditationInfo(String openId) {
        Map<String, Object> map = new HashMap<>();
        map.put("open_id", openId);
        List<MedResource> resources = medResourceMapper.selectByMap(map);
        resources.forEach(System.out::println);
        return 0;
    }
}
