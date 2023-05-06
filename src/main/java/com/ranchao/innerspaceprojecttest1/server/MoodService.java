package com.ranchao.innerspaceprojecttest1.server;

import com.ranchao.innerspaceprojecttest1.details.Mood;
import com.ranchao.innerspaceprojecttest1.entity.DailyMood;
import com.ranchao.innerspaceprojecttest1.entityIO.MoodChartSend;
import com.ranchao.innerspaceprojecttest1.entityIO.MoodReceive;
import com.ranchao.innerspaceprojecttest1.mapper.MoodMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

@Service
public class MoodService {
    ArrayList<Mood> moodArrayList;

    ArrayList<DailyMood> dailyMoods;

    @Autowired
    MoodMapper moodMapper;

    MoodService() throws ParseException {
        moodArrayList = new ArrayList<>();
        readFileMood();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime currentTime_1 = LocalDateTime.parse("2023-04-26 11:50:53", formatter);
        LocalDateTime currentTime_2 = LocalDateTime.parse("2023-04-22 11:50:53", formatter);
        LocalDateTime currentTime_3 = LocalDateTime.parse("2023-04-21 11:50:53", formatter);
        LocalDateTime currentTime_4 = LocalDateTime.parse("2023-04-11 11:50:53", formatter);

        dailyMoods = new ArrayList<>();
//        dailyMoods.add(new DailyMood("1234", 3, "diary1", currentTime_1));
//        dailyMoods.add(new DailyMood("1234", 8, "diary2", currentTime_2));
//        dailyMoods.add(new DailyMood("1234", 11, "diary3", currentTime_3));
//        dailyMoods.add(new DailyMood("1234", 7, "diary4", currentTime_4));
    }


    public void readFileMood() {
        String fileName = "config.txt";
        String line = "";
        String splitBy = " ";

        try {
            Resource resource = new ClassPathResource(fileName);
            BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));
            while ((line = br.readLine()) != null)   //读取一行内容
            {
                String[] result = line.split(splitBy);  //使用空格将该行内容分割为多个字符串
                System.out.println("编号: " + result[0]
                        + " 名称: " + result[1]
                        + " 分数: " + result[2]);
                Mood mood = new Mood();
                mood.setNumber(Integer.parseInt(result[1]));
                mood.setName(result[0]);
                mood.setPoint(Integer.parseInt(result[2]));
                moodArrayList.add(mood);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void getLastSevenDaysInfo() {
        // 获取当前日期
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.parse("2023-04-26 11:50:53", formatter);

        // 获取所有的记录

        //
        ArrayList<ArrayList<DailyMood>> lastWeek = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            lastWeek.add(new ArrayList<DailyMood>());
        }
        for (DailyMood mood : dailyMoods) {
            if (isWithinLast7Days(now, mood.getRecordTime())) {
                for (int i = 0; i < 7; i++) {
                    if (isWithinTheseDays(now, mood.getRecordTime(), i + 1, i)) {
                        lastWeek.get(6 - i).add(mood);
                    }
                }
            }
        }
        MoodChartSend moodChartSend = new MoodChartSend();
        // 我想的是需要3个数据
        // 第一个是过去7天的 日期中的 “几号”
        for (int i = 0; i < 7; i++) {
            moodChartSend.getDates().add(now.minusDays(i + 1).getDayOfMonth());
        }
        // 过去7天，每天的心情记录次数  直方图
        for (int i = 0; i < 7; i++) {
            moodChartSend.getTimes().add(lastWeek.get(i).size());
        }
        // 过去7天，每天的分数和   曲线图
        for (int i = 0; i < 7; i++) {
            int curr = 0;
            ArrayList<DailyMood> temp = lastWeek.get(i);
            for (DailyMood dailyMood : temp) {
                curr += moodArrayList.get(dailyMood.getMoodNumber()).getPoint();
            }
            moodChartSend.getPoints().add(curr);
        }
    }


    public boolean isWithinLast7Days(LocalDateTime now, LocalDateTime dateTime) {
        LocalDateTime lastWeek = now.minusDays(7);
        return dateTime.isAfter(lastWeek) && dateTime.isBefore(now);
    }

    public boolean isWithinTheseDays(LocalDateTime now, LocalDateTime dateTime, int before, int later) {
        LocalDateTime beforeDay = now.minusDays(before);
        LocalDateTime laterDay = now.minusDays(later);
        return dateTime.isAfter(beforeDay) && dateTime.isBefore(laterDay);
    }

    public int setMoodService(MoodReceive moodReceive) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.parse(moodReceive.getRecordTime(), formatter);
        return moodMapper.insert(new DailyMood(moodReceive.getOpenId(), moodReceive.getMoodNumber(), moodReceive.getDiary(), moodReceive.getReason(),now));
    }


}
