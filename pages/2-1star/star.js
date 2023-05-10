// pages/star/star.js
Page({
  data: {
    loading: true,
    stars:[],
    userID: '', // 用来存储用户唯一的openID
    remainTime:0,
    canRefresh: true,
    remainMinutes:0,
    remainSeconds:0,
    refreshID:0,
  },
  refreshStars: function () {
    wx.request({
      url: 'http://175.178.90.196:7777/Refresh0?userID=' + this.data.userID,
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            stars: res.data.stars.map(star => ({
              starID: star.starID,
              starContent: star.starContent,
              starHost: star.starHost,
            })),
            //refreshCountdown: res.data.remainTime,
            refreshID:res.data.refreshID
          });
        }
      },
    });
  },
  //tick
  refreshCountdownTick: function () {
    if (this.data.remainTime > 0) {
      this.setData({
        remainTime: this.data.remainTime - 1,
      });
      setTimeout(() => {
        this.refreshCountdownTick();
      }, 1000);
    } else {
      this.setData({
        canRefresh: true,
      });
    }
  },

  //开始刷新倒计时
  startRefreshCountdown: function (remainTime) {
    this.setData({
      canRefresh: false,
      remainTime: remainTime,
    });
    this.refreshCountdownTick();
  },

  //刷新星星按钮响应
  onRefreshTap: function () {
    if (this.data.canRefresh) {
      this.refreshStars();
      wx.showModal({
        title: '提示',
        content: `刷新成功！`,
        showCancel: false,
      });
      wx.request({
        url: 'http://175.178.90.196:7777/Refresh1?userID=' + this.data.userID,
        success: (res) => {
          var temp = res.data.remainTime
          if (res.statusCode === 200) {
            this.setData({
              remainTime: temp,
            },function(){
              this.startRefreshCountdown(this.data.remainTime);
            });
          }
        },
      });
    } else {
      this.setData({
        remainMinutes: Math.floor(this.data.remainTime / 60),
        remainSeconds: this.data.remainTime % 60,
      });
      wx.showModal({
        title: '提示',
        content: `您还需要等待 ${(this.data.remainMinutes)} 分 ${(this.data.remainSeconds)} 秒才能刷新星星哦！`,
        showCancel: false,
      });
    }
  },
  onLoad: function (options) {
     // 获取用户id
     var UserId = wx.getStorageSync('UserId');
     this.setData({
       userID: UserId
     })
    this.refreshStars();
  },
  onStarTap: function (event) {
    const starID = event.currentTarget.dataset.starid;
    const star = this.data.stars.find(item => item.starID === starID);
    wx.navigateTo({
      url:'/pages/2-2starlog/starlog?star='+JSON.stringify(star)+'&refreshID='+this.data.refreshID
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setInitialRenderingCache({
      loadingHint: '正在加载' })
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