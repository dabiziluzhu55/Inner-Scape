//const { PostProcess } = require("XrFrame/xrFrameSystem");

// pages/starreply/starreply.js
Page({
  data: {
    starID: 0, // 回复的星星id
    length:0,//回复内容的长度
    replySay:'',//回复内容
    UserId: '', // 用来存储用户唯一的openID
    refreshID:'',
  },

  onLoad(options) {
    // 获取用户id
    var UserId = wx.getStorageSync('UserId');
    // 获取星星id
    this.setData({
    starID: options.starID,
    UserId: UserId,
    refreshID: options.refreshID
    })
    console.log(this.data.starID)
    console.log(this.data.UserId)
  },

  length(e){
    let length=e.detail.value.length;
    let reply=e.detail.value.replyContent;
    this.setData({
      length:length,
      replySay:reply
    })
  },

  submitForm: function (e) {
    //console.log("你好")
    // 判断回复内容是否超过 128 字
    if (this.data.length > 128) {
    wx.showToast({
    title: '回复内容不能超过128字',
    icon: 'none'
    });
    return;
    }
    if (!e.detail.value.replyContent) {
      wx.showToast({
        title: '请输入回复内容',
        icon: 'none'
      })
      return
    }
    var that=this;
    let userID = that.data.UserId;
    let starID = that.data.starID;
    let refreshID = that.data.refreshID;
    console.log(userID);
    console.log(starID);
    console.log(e.detail.value.replyContent);
    console.log(refreshID);
    if (!starID) {
      console.error('starID 未正确设置');
      return;
    }
   // 将replyInfo提交到后端
    wx.request({
      url: 'http://175.178.90.196:7777/ReplyStar?starID=' + starID + '&userID=' + userID + '&replySay=' + e.detail.value.replyContent + '&refreshID=' + refreshID,
      method:'GET',
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        // 提交成功后，清空留言框内容
        that.setData({
          length: 0,
          replyContent: ''
        })
        // 提交成功后跳转回六颗星星界面
        wx.navigateBack({
        delta: 2
        })
      },
      fail: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})