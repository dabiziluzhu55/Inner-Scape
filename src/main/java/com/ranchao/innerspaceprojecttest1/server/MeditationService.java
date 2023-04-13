package com.ranchao.innerspaceprojecttest1.server;

import com.ranchao.innerspaceprojecttest1.entity.MedResource;
import com.ranchao.innerspaceprojecttest1.entitySend.MeditationRequest;
import com.ranchao.innerspaceprojecttest1.mapper.MedResourceMapper;
import com.ranchao.innerspaceprojecttest1.mapper.MeditationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MeditationService {
    @Autowired
    MeditationMapper meditationMapper;
    @Autowired
    MedResourceMapper medResourceMapper;

    // 从数据库取数据，需要匹配level0，和level1，两个资源
    public ArrayList<MeditationRequest>  findMedResource(String level0, String level1) {
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


}
