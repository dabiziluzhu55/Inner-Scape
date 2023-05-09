package com.ranchao.innerspaceprojecttest1.server;

import com.ranchao.innerspaceprojecttest1.details.Mood;
import com.ranchao.innerspaceprojecttest1.entity.DailyMood;
import com.ranchao.innerspaceprojecttest1.entityIO.*;
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
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.*;

@Service
public class MoodService {
    ArrayList<Mood> moodArrayList;

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
                        + " 分数: " + result[2]
                        + " url: " + result[3]);
                Mood mood = new Mood();
                mood.setNumber(Integer.parseInt(result[1]));
                mood.setName(result[0]);
                mood.setPoint(Integer.parseInt(result[2]));
                mood.setUrl(result[3]);
                moodArrayList.add(mood);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    public void getLastSevenDaysInfo() {
//        // 获取当前日期
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        LocalDateTime now = LocalDateTime.parse("2023-04-26 11:50:53", formatter);
//
//        // 获取所有的记录
//
//        //
//        ArrayList<ArrayList<DailyMood>> lastWeek = new ArrayList<>();
//        for (int i = 0; i < 7; i++) {
//            lastWeek.add(new ArrayList<DailyMood>());
//        }
//        for (DailyMood mood : dailyMoods) {
//            if (isWithinLast7Days(now, mood.getRecordTime())) {
//                for (int i = 0; i < 7; i++) {
//                    if (isWithinTheseDays(now, mood.getRecordTime(), i + 1, i)) {
//                        lastWeek.get(6 - i).add(mood);
//                    }
//                }
//            }
//        }
//        MoodChartSend moodChartSend = new MoodChartSend();
//        // 我想的是需要3个数据
//        // 第一个是过去7天的 日期中的 “几号”
//        for (int i = 0; i < 7; i++) {
//            moodChartSend.getDates().add(now.minusDays(i + 1).getDayOfMonth());
//        }
//        // 过去7天，每天的心情记录次数  直方图
//        for (int i = 0; i < 7; i++) {
//            moodChartSend.getTimes().add(lastWeek.get(i).size());
//        }
//        // 过去7天，每天的分数和   曲线图
//        for (int i = 0; i < 7; i++) {
//            int curr = 0;
//            ArrayList<DailyMood> temp = lastWeek.get(i);
//            for (DailyMood dailyMood : temp) {
//                curr += moodArrayList.get(dailyMood.getMoodNumber()).getPoint();
//            }
//            moodChartSend.getPoints().add(curr);
//        }
//    }

    public int setMoodService(MoodReceive moodReceive) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.parse(moodReceive.getRecordTime(), formatter);
        return moodMapper.insert(new DailyMood(moodReceive.getOpenId(), moodReceive.getMoodNumber(), moodReceive.getDiary(), moodReceive.getReason(), now));
    }

    //
    ArrayList<DailyMood> validWeekMood(String openId) {
        Map<String, Object> map = new HashMap<>();
        map.put("open_id", openId);
        List<DailyMood> totalMoods = moodMapper.selectByMap(map);
        LocalDateTime now = LocalDateTime.now();
        ArrayList<DailyMood> returnMood = new ArrayList<>();
        // 当前zhou
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int currentWeek = now.get(weekFields.weekOfWeekBasedYear());
        for (DailyMood temp : totalMoods) {
            LocalDateTime tempTime = temp.getRecordTime();
            if (tempTime.get(weekFields.weekOfWeekBasedYear()) == currentWeek)
                returnMood.add(new DailyMood((temp)));
        }

        return returnMood;
    }

    ArrayList<DailyMood> validMonthMood(String openId, int month) {
        Map<String, Object> map = new HashMap<>();
        map.put("open_id", openId);
        List<DailyMood> totalMoods = moodMapper.selectByMap(map);
        LocalDateTime now = LocalDateTime.now();
        ArrayList<DailyMood> returnMood = new ArrayList<>();
        // 当前月份
        int currentYear = now.getYear();
        for (DailyMood temp : totalMoods) {
            LocalDateTime tempTime = temp.getRecordTime();
            if (tempTime.getYear() == currentYear && tempTime.getMonthValue() == month)
                returnMood.add(new DailyMood((temp)));
        }
        return returnMood;
    }

    ArrayList<Integer> countData(String openId, int type, int month) {
        ArrayList<DailyMood> validMoods = new ArrayList<>();
        if (type == 1)
            validMoods = validMonthMood(openId, month);
        if (type == 2)
            validMoods = validWeekMood(openId);
        ArrayList<Integer> countMood = new ArrayList<Integer>(moodArrayList.size());
        for (int i = 0; i < moodArrayList.size(); i++) {
            countMood.add(0);
        }
        for (DailyMood dailyMood : validMoods) {
            int index = dailyMood.getMoodNumber();
            int num = countMood.get(index) + 1;
            countMood.set(index, num);
        }
        return countMood;
    }

    ArrayList<MoodReasonSend> reasonHandle(ArrayList<MoodReasonSend> curr, String reason) {
        int flag = 0;
        for (MoodReasonSend temp : curr) {
            if (temp.getText().equals(reason)) {
                flag = 1;
                temp.setCount(temp.getCount() + 1);
                break;
            }
        }
        if (flag == 0) {
            curr.add(new MoodReasonSend(reason, 1));
        }
        return curr;
    }

    //心情分布 30/7
    public ArrayList<MoodDistributionSend> distributionSend(String openId, int type, int month) {
        ArrayList<MoodDistributionSend> moodDistributionSends = new ArrayList<>();
        ArrayList<Integer> countMood = countData(openId, type, month);
        for (int i = 0; i < countMood.size(); i++) {
            int count = countMood.get(i);
            if (count != 0) {
                Mood mood = moodArrayList.get(i);
                moodDistributionSends.add(new MoodDistributionSend(mood.getUrl(), mood.getName(), count));
            }
        }
        return moodDistributionSends;
    }

    // 心情原因 30/7
    public ArrayList<MoodReasonSend> reasonSend(String openId, int type, int month) {
        ArrayList<DailyMood> validMoods = new ArrayList<>();
        if (type == 1)
            validMoods = validMonthMood(openId, month);
        if (type == 2)
            validMoods = validWeekMood(openId);

        ArrayList<MoodReasonSend> reasonList = new ArrayList<>();
        for (DailyMood dailyMood : validMoods) {
            reasonList = reasonHandle(reasonList, dailyMood.getReason());
        }
        return reasonList;
    }

    // 记录心情的次数，产生心情种数，产生最多的心情：
    public MoodStatisticSend statisticSend(String openId, int type, int month) {
        ArrayList<Integer> countMood = countData(openId, type, month);
        int mostMood = 0, totalMood = 0, kindMood = 0;
        for (int i = 0; i < countMood.size(); i++) {
            int curr = countMood.get(i);
            if (curr != 0) {
                kindMood += 1;
                totalMood += curr;
                if (mostMood == 0) {
                    mostMood = curr;
                } else {
                    if (countMood.get(mostMood) < curr)
                        mostMood = i;
                }
            }
        }
        return new MoodStatisticSend(totalMood, kindMood, moodArrayList.get(mostMood).getName());
    }

    public MoodPercentSend percentSend(String openId, int type,int month) {
        ArrayList<Integer> countMood = countData(openId, type,month);
        ArrayList<Double> template = new ArrayList<>(3);
        for (int i = 0; i < 3; i++) {
            template.add(0.0);
        }
        double total = 0;
        for (int i = 0; i < countMood.size(); i++) {
            int index = moodArrayList.get(i).getPoint();
            double oriNum = template.get(index);
            template.set(index, oriNum + countMood.get(i));
            total += countMood.get(i);
        }
        if (total == 0)
            return new MoodPercentSend(0, 0, 0);
        return new MoodPercentSend(template.get(0) / total, template.get(1) / total, template.get(2) / total);
    }

    public ArrayList<MoodDailySend> dailySend(String openId, int type,int month) {
        int today = 1;
        ArrayList<DailyMood> validMoods = new ArrayList<>();
        if (type == 1)
            validMoods = validMonthMood(openId, month);
        if (type == 2)
            validMoods = validWeekMood(openId);

        ArrayList<MoodDailySend> moodDailySends = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime baseTime = now.withDayOfMonth(1).with(LocalTime.MIN);
        for (int i = 0; i < 31; i++) {
            ArrayList<DailyMood> todayMood = new ArrayList<>();
            for (DailyMood dailyMood : validMoods) {
                LocalDateTime time = dailyMood.getRecordTime();
                LocalDateTime before = baseTime.plusDays(i);
                LocalDateTime end = baseTime.plusDays(i + 1);
                if (time.isBefore(end) && time.isAfter(before))
                    todayMood.add(dailyMood);
            }
            if (todayMood.size() != 0) {
                double total = 0;
                for (DailyMood dailyMood : todayMood) {
                    total += moodArrayList.get(dailyMood.getMoodNumber()).getPoint();
                }
                moodDailySends.add(new MoodDailySend("" + today, total / todayMood.size()));
                today += 1;
            }
        }
        return moodDailySends;
    }
}
