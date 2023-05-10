// pages/write/write.js
Page({
  data: {
    starContent : '', // 信件内容
    comments : [], // 评论数据
    starID : 0,// 评论所属信件
  },

  // 获取传递信息
  onLoad : function (options) {
    let starContent = options.starContent;
    let starID = options.starID;
    // 解码
    let encodedReplys = options.replys;
    let decodedReplysString = decodeURIComponent(encodedReplys);
    let replys = JSON.parse(decodedReplysString);
    var comments = [];
    // console.log("starContent",starContent);
    // console.log("comments",comments);
    for(let i = 0;i < replys.length;i++){
      let replyID = replys[i].replyID; // 回复编号
      let replySay = replys[i].replySay; // 回复内容
      let replyGuestName = replys[i].replyGuestName; // 回复人微信号
      comments.push({nickname : replyGuestName,description : replySay, replyID : replyID});
    }
    this.setData({
      starContent : starContent,
      comments : comments,
      starID : starID,
    })
  },

  // 数据库层删除别人给自己的回复
  DeleteOtherReplyToMe : function (starID,replyID) {
    wx.request({
      url: 'http://175.178.90.196:7777/DeleteOtherReplyToMe?starID='+starID+'&replyID='+replyID,
      success : (res)=>{
        if(res.data.code === 0){
          console.log("删除回复成功！",res.data.code);
        }
      }
    })
  },

  // 长按删除
  LongPressed : function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['删除'],
      success: (res) => {
        if (res.tapIndex == 0) {
          // 获取点击的item的index
          var index = e.currentTarget.dataset.index;
          // 数据库层面删除
          let starID = that.data.starID;
          let replyID = that.data.comments[index].replyID;
          that.DeleteOtherReplyToMe(starID,replyID);
          // UI层面删除
          this.data.comments.splice(index, 1);
          this.setData({
            comments: this.data.comments
          });
        } 
      },
      fail: (res) => {
        console.log(res.errMsg);
      }
    })
  },
  
})