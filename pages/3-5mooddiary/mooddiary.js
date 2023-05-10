// pages/mooddiary/mooddiary.js
Page({
  data: {
    //diaryList: []
    diaryList: [
      {
        id: 1,
        recordTime: '2023-05-07',
        diary: '开心',
        reason: '跟朋友一起看了一场电影',
        moodImageUrl: 'http://175.178.90.196:7778/photo/开心.png'
      },
      {
        id: 2,
        recordTime: '2023-05-06',
        diary: '平静',
        reason: '五一结束了',
        moodImageUrl: 'http://175.178.90.196:7778/photo/平静.png'
      },
      {
        id: 3,
        recordTime: '2023-05-05',
        diary: '难过',
        reason: '呜呜呜呜呜',
        moodImageUrl: 'http://175.178.90.196:7778/photo/难过.png'
      },
      {
        id: 4,
        recordTime: '2023-05-01',
        diary: '心动',
        reason: '跟朋友一起看了一场电影',
        moodImageUrl: 'http://175.178.90.196:7778/photo/心动.png'
      },
    ]
  },

  onLoad(options) {
    //this.fetchDiaryList();
  },
  fetchDiaryList: function() {
    const that = this;
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/setMood',
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