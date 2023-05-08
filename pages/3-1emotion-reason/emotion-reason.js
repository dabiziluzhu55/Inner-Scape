// pages/motion-reason/motion-reason.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emotion:'',
    date:'',
    emotionSrc:'',
    emotionId:'',
    List1 : ["工作","假期","音乐","学习","恋爱","食物"],
    List2:["朋友","家庭","天气","运动","睡眠","未来","其他"],
    List3:["其他","阅读","家务","旅游","宠物","购物"],
    List4:["跳舞","游戏","户外运动","陌生人","影视"],
    curIndex:'',
    reason:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      emotion:options.emotion,
      date:options.Date,
      emotionSrc:options.emotionSrc,
      emotionId:options.emotionId
    })

  },
  clickActive(e){
    this.setData({
      curIndex:e.currentTarget.dataset.i1+e.currentTarget.dataset.i2,
      reason:e.currentTarget.dataset.name
    })
  },
  change2write(){
    wx.navigateTo({
      url: '/pages/3-2emotion-write/emotion-write?date='+this.data.date+'&emotion='+this.data.emotion+'&reason='+this.data.reason+'&emotionSrc='+this.data.emotionSrc+'&emotionId='+this.data.emotionId
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