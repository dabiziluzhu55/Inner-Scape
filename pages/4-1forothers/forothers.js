// pages/forothers/forothers.js
Page({
  data: {
    starContent : "",// 信件内容
    comments :[],// 评论内容
    starID : '',// 信件标识
    replyID : '',// 回复标识
    starHostName : '',// 发件人
  },

  // 加载数据
  onLoad : function (options) {
    let starContent = options.starContent;
    let starID = options.starID;
    let replyID = options.replyID;
    let replySay = options.replySay;
    let starHostName = options.starHostName;
    let comments =[];
    comments.push({description : replySay, nickname :'我的'});
    this.setData({
      starContent : starContent,
      starID : starID,
      replyID : replyID,
      starHostName : starHostName,
      comments : comments,
    })
  },

  // 删除给别人的回复
  DeleteMyReply : function(replyID){
    console.log('replyID',replyID);
    wx.request({
      url: 'http://175.178.90.196:7777/DeleteMyReply?replyID='+replyID,
      success : (res)=>{
        if(res.data.code === 0){
          console.log('删除给别人的回复成功');
        }else{
          console.log('删除给别人的回复失败');
        }
      }
    })
  },

  // 长按删除
  LongPressed : function (e) {
    wx.showActionSheet({
      itemList: ['删除'],
      success: (res) => {
        if (res.tapIndex == 0) {
          // 获取点击的item的index
          var index = e.currentTarget.dataset.index;
          let replyID = this.data.replyID;
          // UI删除
          this.data.comments.splice(index, 1);
          this.setData({
            comments: this.data.comments
          });
          // 数据库层删除
          this.DeleteMyReply(replyID);
        } 
      },
      fail: (res) => {
        console.log(res.errMsg);
      }
    })
  },
})