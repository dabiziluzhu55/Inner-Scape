// pages/temp/temp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration:"2:00"

  },
  hour2minite(hm){
    console.log(hm)
    var [hour, minute] = hm.split(':');
    var minuteInSecond = parseInt(hour) * 60 + parseInt(minute);
    return `${minuteInSecond}:00`;

  },
  minite2second(ms){
    var timeArray = ms.split(':');
    var minites = parseInt(timeArray[0], 10);
    var seconds = minites*60;
    return seconds;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.minite2second(this.data.duration))
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