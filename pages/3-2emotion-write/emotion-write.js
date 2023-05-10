// pages/motion-write/motion-write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length:0,
    emotion:'',
    emotionSrc:'',
    emotionId:'',
    reason:'',
    background:'http://175.178.90.196:7778/related/write-bg.jpg',
    scrollY: false,
    scrollViewHeight: 200,
    date:'',
    userID:''
  },
  length(e){
    let length=e.detail.value.length;
    this.setData({
      length:length
    })
  },
  toggleScrollView: function() {
    var scrollY = this.data.scrollY;
    var scrollViewHeight = this.data.scrollViewHeight;
  
    if (scrollY) {
      // 如果已经滚动，恢复到初始状态
      scrollViewHeight = 200;
    } else {
      // 如果未滚动，展开可滚动区域
      scrollViewHeight = 600;
    }
  
    this.setData({
      scrollY: !scrollY,
      scrollViewHeight: scrollViewHeight
    });
  },
  onLoad(options) {
    var UserId = wx.getStorageSync('UserId');
    console.log(UserId)
    this.setData({
      date:options.date,
      emotion:options.emotion,
      emotionSrc:options.emotionSrc,
      reason:options.reason,
      emotionId:options.emotionId,
      userID: UserId
    })
  },
  submitForm(e){
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/setMood',
      method: 'Get',
      data: {
        // openId:this.data.userID,
        openId:'test',
        moodNumber:this.data.emotionId,
        diary:e.detail.value.replyContent,
        reason:this.data.reason,
        recordTime:this.data.date
      },
      success(res) {
        console.log(res.data);
      },
      fail(error) {
        console.log(error);
      }
    })

	wx.showToast({
      title: '保存成功',
      icon: 'none',
      duration: 1500,
      success: function () {
       //弹窗后执行，可以省略
	   setTimeout(function () {
          wx.switchTab({
            url: '/pages/3-0emotion/emotion',
          })
	        },1500);
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