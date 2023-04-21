package com.example.innerscape_test4.controller;

import com.example.innerscape_test4.entity.Star;
import com.example.innerscape_test4.entity.StarLittle;
import com.example.innerscape_test4.entity.StarReply;
import com.example.innerscape_test4.service.impl.DataServiceImpl;
import com.example.innerscape_test4.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin
public class testController {
    @Autowired
    private DataServiceImpl dataService;

    @RequestMapping("/sayHello")
    public String SayHello(){
        return "Hello!";
    }

    @RequestMapping("/whoHello")
    public String WhoHello(String name){
        return name+",hello!";
    }

    @RequestMapping("/UserExist")
    public Code0VO UserExit(String userID){
        int exist=dataService.UserExist(userID);
        Code0VO code0=new Code0VO();
        code0.setCode(exist);
        return code0;
    }

    @RequestMapping("/Register")
    public Code0VO Register(String userID,String userName,int headshot){
        int add=dataService.Register(userID,userName,headshot);
        Code0VO code0=new Code0VO();
        code0.setCode(add);
        return code0;
    }

    @RequestMapping("/Refresh0")
    public Code_Star_TimeVO Refresh0(String userID){
        String refreshID=dataService.Refresh0(userID);
        if(Objects.equals(refreshID, ""))
            refreshID=dataService.SelectStars(userID);
        List<StarLittle>starLittleList=dataService.CatchRefreshStars(refreshID);
        Code_Star_TimeVO codeStarsTimeVO=new Code_Star_TimeVO();
        codeStarsTimeVO.setCode(0);
        codeStarsTimeVO.setRefreshID(refreshID);
        codeStarsTimeVO.setRemainTime(-1);
        for (StarLittle starLittle : starLittleList) {
            StarsVO starsVO = new StarsVO(starLittle);
            codeStarsTimeVO.addStars(starsVO);
        }
        return codeStarsTimeVO;
    }

    @RequestMapping("/Refresh1")
    public Code_Star_TimeVO Refresh1(String userID){
        int refresh1=dataService.Refresh1(userID);
        Code_Star_TimeVO codeStarsTimeVO=new Code_Star_TimeVO();
        if(refresh1<0){
            codeStarsTimeVO.setCode(0);
            String refreshID=dataService.ReSelectStars(userID);
            codeStarsTimeVO.setRefreshID(refreshID);
            List<StarLittle>starLittleList=dataService.CatchRefreshStars(refreshID);
            for (StarLittle starLittle : starLittleList) {
                StarsVO starsVO = new StarsVO(starLittle);
                codeStarsTimeVO.addStars(starsVO);
            }
        }
        else {
            codeStarsTimeVO.setCode(1);
            codeStarsTimeVO.setRefreshID("");
        }
        codeStarsTimeVO.setRemainTime(refresh1);
        return codeStarsTimeVO;
    }

    @RequestMapping("/FlyStar")
    public Code0VO FlyStar(String userID,String starContent) {
        int add=dataService.FlyStar(userID, starContent);
        Code0VO code0=new Code0VO();
        code0.setCode(add);
        return code0;
    }

    @RequestMapping("/ReplyStar")
    public Code0VO ReplyStar(String starID,String userID,String replySay,String refreshID) {
        int add=dataService.ReplyStar(starID,userID,replySay,refreshID);
        Code0VO code0=new Code0VO();
        code0.setCode(add);
        return code0;
    }

    @RequestMapping("/ViewMyReply")
    public Star0VO ViewMyReply(String userID){
        List<Star> stars=dataService.ViewMyReply(userID);
        Star0VO star0VO=new Star0VO();
        for(Star star:stars){
            StarReplyVO starReplyVO=new StarReplyVO();
            starReplyVO.setStarID(star.getStarID());
            starReplyVO.setStarContent(star.getStarContent());
            if(star.getReplyNum()>0&& !Objects.equals(star.getReply1ID(), "thisContentIsDeleted")){
                ReplyVO replyVO=new ReplyVO();
                replyVO.setReplyID(star.getReply1ID());
                replyVO.setReplySay(star.getReply1Say());
                replyVO.setReplyGuestName(star.getReply1GuestName());
                starReplyVO.addReplys(replyVO);
            }
            if(star.getReplyNum()>1&& !Objects.equals(star.getReply2ID(), "thisContentIsDeleted")){
                ReplyVO replyVO=new ReplyVO();
                replyVO.setReplyID(star.getReply2ID());
                replyVO.setReplySay(star.getReply2Say());
                replyVO.setReplyGuestName(star.getReply2GuestName());
                starReplyVO.addReplys(replyVO);
            }
            if(star.getReplyNum()>2&& !Objects.equals(star.getReply3ID(), "thisContentIsDeleted")){
                ReplyVO replyVO=new ReplyVO();
                replyVO.setReplyID(star.getReply3ID());
                replyVO.setReplySay(star.getReply3Say());
                replyVO.setReplyGuestName(star.getReply3GuestName());
                starReplyVO.addReplys(replyVO);
            }
            if(star.getReplyNum()>3&& !Objects.equals(star.getReply4ID(), "thisContentIsDeleted")){
                ReplyVO replyVO=new ReplyVO();
                replyVO.setReplyID(star.getReply4ID());
                replyVO.setReplySay(star.getReply4Say());
                replyVO.setReplyGuestName(star.getReply4GuestName());
                starReplyVO.addReplys(replyVO);
            }
            if(star.getReplyNum()>4&& !Objects.equals(star.getReply5ID(), "thisContentIsDeleted")){
                ReplyVO replyVO=new ReplyVO();
                replyVO.setReplyID(star.getReply5ID());
                replyVO.setReplySay(star.getReply5Say());
                replyVO.setReplyGuestName(star.getReply5GuestName());
                starReplyVO.addReplys(replyVO);
            }
            if(star.getReplyNum()>5&& !Objects.equals(star.getReply6ID(), "thisContentIsDeleted")){
                ReplyVO replyVO=new ReplyVO();
                replyVO.setReplyID(star.getReply6ID());
                replyVO.setReplySay(star.getReply6Say());
                replyVO.setReplyGuestName(star.getReply6GuestName());
                starReplyVO.addReplys(replyVO);
            }
            star0VO.addStars(starReplyVO);
        }
        return star0VO;
    }

    @RequestMapping("/ViewReplyToOthers")
    public ReplyBigVO ViewReplyToOthers(String userID){
        List<StarReply> starReplies=dataService.ViewReplyToOthers(userID);
        ReplyBigVO replyBigVO=new ReplyBigVO();
        for(StarReply starReply:starReplies) {
            ReplyToStarVO replyToStarVO = new ReplyToStarVO();
            replyToStarVO.setReplyID(starReply.getReplyID());
            replyToStarVO.setReplySay(starReply.getReplySay());
            replyToStarVO.setStarID(starReply.getStarID());
            replyToStarVO.setStarContent(starReply.getStarContent());
            replyToStarVO.setStarHostName(starReply.getStarHostName());
            replyBigVO.addReplys(replyToStarVO);
        }
        return replyBigVO;
    }

    @RequestMapping("/DeleteMyReply")
    public Code0VO DeleteMyReply(String replyID) {
        int delete=dataService.DeleteMyReply(replyID);
        Code0VO code0=new Code0VO();
        code0.setCode(delete);
        return code0;
    }

    @RequestMapping("/DeleteOtherReplyToMe")
    public Code0VO DeleteOtherReplyToMe(String starID,String replyID) {
        int delete=dataService.DeleteOtherReplyToMe(starID, replyID);
        Code0VO code0=new Code0VO();
        code0.setCode(delete);
        return code0;
    }

    @RequestMapping("/StarLandfall")
    public Code0VO StarLandfall(String starID,String userID) {
        int delete=dataService.StarLandfall(starID, userID);
        Code0VO code0=new Code0VO();
        code0.setCode(delete);
        return code0;
    }
}
