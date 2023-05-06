package com.example.innerscape_test4.service.impl;

import com.example.innerscape_test4.entity.*;
import com.example.innerscape_test4.repository.DataRepository;
import com.example.innerscape_test4.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class DataServiceImpl implements DataService {
    Map<String,StarLittle>redeemStars=new HashMap<>();
    public DataServiceImpl(){
        StarLittle st0=new StarLittle();
        st0.setStarID("redeem0");
        st0.setStarContent("美丽的花虽然会凋谢，可是盛开的时刻值得欣赏。要在美好的时候创造出美好的东西，人生才会充满意义。");
        st0.setStarHostName("theLoveFromSystem");//待修改
        redeemStars.put("redeem0",st0);
        StarLittle st1=new StarLittle();
        st1.setStarID("redeem1");
        st1.setStarContent("人生最大的喜悦是每个人都说你做不到，你却完成它了！");
        st1.setStarHostName("theLoveFromSystem");//待修改
        redeemStars.put("redeem1",st1);
        StarLittle st2=new StarLittle();
        st2.setStarID("redeem2");
        st2.setStarContent("失败的是事，绝不应是人。");
        st2.setStarHostName("theLoveFromSystem");//待修改
        redeemStars.put("redeem2",st2);
        StarLittle st3=new StarLittle();
        st3.setStarID("redeem3");
        st3.setStarContent("须交有道之人,莫结无义之友。饮清静之茶，莫贪花色之酒。开方便之门，闲是非之口。");
        st3.setStarHostName("theLoveFromSystem");//待修改
        redeemStars.put("redeem3",st3);
        StarLittle st4=new StarLittle();
        st4.setStarID("redeem4");
        st4.setStarContent("人为善，福虽未至，祸已远离；人为恶，祸虽未至，福已远离。");
        st4.setStarHostName("theLoveFromSystem");//待修改
        redeemStars.put("redeem4",st4);
        StarLittle st5=new StarLittle();
        st5.setStarID("redeem5");
        st5.setStarContent("不妄求，则心安，不妄做，则身安。");
        st5.setStarHostName("theLoveFromSystem");//待修改
        redeemStars.put("redeem5",st5);
    }

    @Autowired
    private DataRepository dataRepository;

    @Override
    public int UserExist(String userID){
        List<User> users=dataRepository.FindUser(userID);
        if(!users.isEmpty())
            return 1;//已注册
        else
            return 0;//未注册
    }

    @Override
    public int Register(String userID,String userName,int headshot){
        try{
            dataRepository.AddUser(userID,userName,headshot);
            return 0;
        }
        catch (Exception e){
            return 1;
        }
    }

    @Override
    public List<User> Login(String userID){
        return dataRepository.FindUser(userID);
    }

    @Override
    public int ChangeHeadshot(String userID,int headshot){
        try{
            dataRepository.ChangeHeadshot(userID,headshot);
            return 0;
        }
        catch (Exception e){
            return 1;
        }
    }

    @Override
    public int ChangeName(String userID,String userName){
        try{
            dataRepository.ChangeName(userID,userName);
            return 0;
        }
        catch (Exception e){
            return 1;
        }
    }

    @Override
    public String Refresh0(String userID){
        Timestamp nowTime=new Timestamp(System.currentTimeMillis());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String nowTimeStr = dateFormat.format(nowTime);
        List<String>history=dataRepository.FindRefreshHistoryToday0(userID,nowTimeStr);
        if(history.isEmpty())
            return "";
        else
            return history.get(0);
    }

    @Override
    public int Refresh1(String userID){
        Timestamp nowTime=new Timestamp(System.currentTimeMillis());
        DateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String nowTimeStr = datetimeFormat.format(nowTime);
        List<Integer>history=dataRepository.FindRefreshHistoryInHalfHour1(userID,nowTimeStr);
        if(history.isEmpty()){
            dataRepository.AddHistory1(userID,nowTimeStr);
            return -1;
        }
        else
            return history.get(0);
    }

    public List<StarLittle> CatchRefreshStars(String refreshID){
        List<Refresh>refreshes=dataRepository.GetRefresh(refreshID);
        List<StarLittle> starLittles=new ArrayList<>();
        if(!refreshes.isEmpty()){
            if(refreshes.get(0).getStar1ID()!=null){
                if(redeemStars.containsKey(refreshes.get(0).getStar1ID())){
                    starLittles.add(redeemStars.get(refreshes.get(0).getStar1ID()));
                }
                else {
                    List<StarLittle> starLittle = dataRepository.CatchStar(refreshes.get(0).getStar1ID());
                    if (!starLittle.isEmpty()) {
                        starLittles.add(starLittle.get(0));
                    }
                }
                starLittles.get(0).setOpen(refreshes.get(0).getOpen1());
            }
            if(refreshes.get(0).getStar2ID()!=null){
                if(redeemStars.containsKey(refreshes.get(0).getStar2ID())){
                    starLittles.add(redeemStars.get(refreshes.get(0).getStar2ID()));
                }
                else {
                    List<StarLittle> starLittle = dataRepository.CatchStar(refreshes.get(0).getStar2ID());
                    if (!starLittle.isEmpty()) {
                        starLittles.add(starLittle.get(0));
                    }
                }
                starLittles.get(1).setOpen(refreshes.get(0).getOpen2());
            }
            if(refreshes.get(0).getStar3ID()!=null){
                if(redeemStars.containsKey(refreshes.get(0).getStar3ID())){
                    starLittles.add(redeemStars.get(refreshes.get(0).getStar3ID()));
                }
                else {
                    List<StarLittle> starLittle = dataRepository.CatchStar(refreshes.get(0).getStar3ID());
                    if (!starLittle.isEmpty()) {
                        starLittles.add(starLittle.get(0));
                    }
                }
                starLittles.get(2).setOpen(refreshes.get(0).getOpen3());
            }
            if(refreshes.get(0).getStar4ID()!=null){
                if(redeemStars.containsKey(refreshes.get(0).getStar4ID())){
                    starLittles.add(redeemStars.get(refreshes.get(0).getStar4ID()));
                }
                else {
                    List<StarLittle> starLittle = dataRepository.CatchStar(refreshes.get(0).getStar4ID());
                    if (!starLittle.isEmpty()) {
                        starLittles.add(starLittle.get(0));
                    }
                }
                starLittles.get(3).setOpen(refreshes.get(0).getOpen4());
            }
            if(refreshes.get(0).getStar5ID()!=null){
                if(redeemStars.containsKey(refreshes.get(0).getStar5ID())){
                    starLittles.add(redeemStars.get(refreshes.get(0).getStar5ID()));
                }
                else {
                    List<StarLittle> starLittle = dataRepository.CatchStar(refreshes.get(0).getStar5ID());
                    if (!starLittle.isEmpty()) {
                        starLittles.add(starLittle.get(0));
                    }
                }
                starLittles.get(4).setOpen(refreshes.get(0).getOpen5());
            }
            if(refreshes.get(0).getStar6ID()!=null){
                if(redeemStars.containsKey(refreshes.get(0).getStar6ID())){
                    starLittles.add(redeemStars.get(refreshes.get(0).getStar6ID()));
                }
                else {
                    List<StarLittle> starLittle = dataRepository.CatchStar(refreshes.get(0).getStar6ID());
                    if (!starLittle.isEmpty()) {
                        starLittles.add(starLittle.get(0));
                    }
                }
                starLittles.get(5).setOpen(refreshes.get(0).getOpen6());
            }
        }
        return starLittles;
    }

    @Override
    public String SelectStars(String userID){
        List<String> stars=dataRepository.Select6Stars(userID);
        List<Integer>redeemIDs=new ArrayList<>();
        for(int redeemStarNum=6-stars.size();redeemStarNum>0;redeemStarNum--){
            Random random=new Random();
            int rsID= random.nextInt(6);
            while(true){
                boolean again=false;
                for(int rID:redeemIDs)
                    if(rID==rsID){
                        again=true;
                        break;
                    }
                if(!again)
                    break;
                else
                    rsID= random.nextInt(6);
            }
            redeemIDs.add(0,rsID);
        }
        while(!redeemIDs.isEmpty()){
            Random random=new Random();
            int select=random.nextInt(stars.size()+1);
            stars.add(select,"redeem"+redeemIDs.get(0));
            redeemIDs.remove(0);
        }
        Timestamp nowTime=new Timestamp(System.currentTimeMillis());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String nowTimeStr = dateFormat.format(nowTime);
        String refreshID="RF_"+userID+"_"+nowTimeStr;
        dataRepository.AddHistory0(refreshID,userID,nowTimeStr,stars.get(0),stars.get(1),stars.get(2),stars.get(3),stars.get(4),stars.get(5));
        return refreshID;
    }

    @Override
    public String ReSelectStars(String userID){
        List<String> stars=dataRepository.Select6Stars(userID);
        List<Integer>redeemIDs=new ArrayList<>();
        for(int redeemStarNum=6-stars.size();redeemStarNum>0;redeemStarNum--){
            Random random=new Random();
            int rsID= random.nextInt(6);
            while(true){
                boolean again=false;
                for(int rID:redeemIDs)
                    if(rID==rsID){
                        again=true;
                        break;
                    }
                if(!again)
                    break;
                else
                    rsID= random.nextInt(6);
            }
            redeemIDs.add(0,rsID);
        }
        while(!redeemIDs.isEmpty()){
            Random random=new Random();
            int select=random.nextInt(stars.size()+1);
            stars.add(select,"redeem"+redeemIDs.get(0));
            redeemIDs.remove(0);
        }

        Timestamp nowTime=new Timestamp(System.currentTimeMillis());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String nowTimeStr = dateFormat.format(nowTime);
        List<String> refreshIDs=dataRepository.FindRefreshHistoryToday0(userID,nowTimeStr);
        if(refreshIDs.isEmpty())
            return "";
        String refreshID=refreshIDs.get(0);
        dataRepository.ChangeHistory0(refreshID,stars.get(0),stars.get(1),stars.get(2),stars.get(3),stars.get(4),stars.get(5));
        return refreshID;
    }

    @Override
    public int FlyStar(String userID,String starContent){
        try{
            List<User> users=dataRepository.FindUser(userID);
            if(users.isEmpty())
                return 1;
            String userName=users.get(0).getName();
            Timestamp nowTime=new Timestamp(System.currentTimeMillis());
            DateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String nowTimeStr = datetimeFormat.format(nowTime);
            String starID="S"+userID+nowTimeStr;
            if(dataRepository.FlyNum(userID,nowTimeStr)>=6)
                return 1;
            dataRepository.AddStar(starID,userID,userName,starContent,nowTimeStr);
            return 0;
        }
        catch (Exception e){
            return 1;
        }
    }

    @Override
    public int ReplyStar(String starID,String userID,String replySay,String refreshID){
        List<User> users=dataRepository.FindUser(userID);
        List<StarLittleReply> starLittleReplies=dataRepository.GetStarContent(starID);
        List<Refresh>refreshes=dataRepository.GetRefresh(refreshID);
        if(!users.isEmpty()&&!starLittleReplies.isEmpty()&&starLittleReplies.get(0).getReplyNum()<6&&!refreshes.isEmpty()){
            int open=0;
            if(Objects.equals(refreshes.get(0).getStar1ID(), starID)){
                if(refreshes.get(0).getOpen1()==1)
                    return 1;
                else
                    open=1;
            }
            else if(Objects.equals(refreshes.get(0).getStar2ID(), starID)){
                if(refreshes.get(0).getOpen2()==1)
                    return 1;
                else
                    open=2;
            }
            else if(Objects.equals(refreshes.get(0).getStar3ID(), starID)){
                if(refreshes.get(0).getOpen3()==1)
                    return 1;
                else
                    open=3;
            }
            else if(Objects.equals(refreshes.get(0).getStar4ID(), starID)){
                if(refreshes.get(0).getOpen4()==1)
                    return 1;
                else
                    open=4;
            }
            else if(Objects.equals(refreshes.get(0).getStar5ID(), starID)){
                if(refreshes.get(0).getOpen5()==1)
                    return 1;
                else
                    open=5;
            }
            else if(Objects.equals(refreshes.get(0).getStar6ID(), starID)){
                if(refreshes.get(0).getOpen6()==1)
                    return 1;
                else
                    open=6;
            }
            else
                return 1;
            String replyID="R"+userID+"To"+starID+starLittleReplies.get(0).getReplyNum();
            try{
                if(!redeemStars.containsKey(starID)) {
                    dataRepository.AddHostReply(starID, replyID, replySay, users.get(0).getName(), starLittleReplies.get(0).getReplyNum() + 1);
                    dataRepository.NewInfoAdd1(dataRepository.GetStarHost(starID).get(0));
                }
                dataRepository.AddGuestReply(replyID,starID,starLittleReplies.get(0).getStarContent(),starLittleReplies.get(0).getStarHostName(),replySay,userID);
                dataRepository.Reply(refreshID,open);
                return 0;
            }
            catch (Exception e){
                return 1;
            }
        }
        else
            return 1;
    }

    @Override
    public List<Star>ViewMyReply(String userID){
        dataRepository.NewInfoReturn0(userID);
        return dataRepository.FindStar(userID);
    }

    @Override
    public List<StarReply>ViewReplyToOthers(String userID){
        return dataRepository.FindReply(userID);
    }

    @Override
    public int DeleteMyReply(String replyID){
        try{
            dataRepository.DeleteReply(replyID);
            return 0;
        }
        catch (Exception e){
            return 1;
        }
    }

    @Override
    public int DeleteOtherReplyToMe(String starID,String replyID){
        try{
            dataRepository.DeleteStarReply(starID,replyID);
            return 0;
        }
        catch (Exception e){
            return 1;
        }
    }

    @Override
    public int StarLandfall(String starID,String userID){
        if(Objects.equals(dataRepository.GetStarHost(starID), userID)){
            try{
                dataRepository.DeleteStar(starID);
                return 0;
            }
            catch (Exception e){
                return 1;
            }
        }
        else
            return 1;
    }

    @Override
    public int GetNewInfo(String userID){
        List<User> users=dataRepository.FindUser(userID);
        if(users.isEmpty())
            return 0;
        else
            return users.get(0).getNewInfo();
    }
}
