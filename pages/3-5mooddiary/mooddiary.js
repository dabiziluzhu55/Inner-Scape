// pages/mooddiary/mooddiary.js
Page({
  data: {
    diaryList: []
  },

  onLoad(options) {
    this.fetchDiaryList();
  },

  fetchDiaryList: function() {
    const that = this;
    var userId=wx.getStorageSync('UserId')
    console.log(userId)
    wx.request({
      // url: 'http://175.178.90.196:7779/moodRequest/moodDiary?openId='+ userId,
      url: 'http://175.178.90.196:7779/moodRequest/moodDiary?openId=test',
      method: 'GET',
      success: function(res) {
        that.setData({
          diaryList: res.data
        });
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },

  navigateToDiary: function(event){
    const id = event.currentTarget.dataset.id;
    const diaryList = this.data.diaryList.find(item => item.id === id);
    console.log(diaryList)
    wx.navigateTo({
      url:'/pages/3-7mooddetail/3-7mooddetail?diaryList='+JSON.stringify(diaryList)
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