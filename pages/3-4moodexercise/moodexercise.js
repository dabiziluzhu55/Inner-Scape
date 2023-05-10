// pages/moodexercise/moodexercise.js
Page({
  data: {
    tests: [
      {
        id: 1,
        image: 'http://175.178.90.196:7778/photo/test1.png',
        title: 'MBTI人格测试',
        url: 'https://www.apesk.com/mbti/dati28N.asp',
        description:'最适合你的工作是什么?'
      },
      {
        id: 2,
        image: 'http://175.178.90.196:7778/photo/test2.png',
        title: '睡眠质量测评',
        url: 'https://www.apesk.com/xinliceshi/start_m/?1321.html',
        description:'天天数羊？'
      },
      {
        id: 3,
        image: 'http://175.178.90.196:7778/photo/test3.png',
        title: '压力释放手册',
        url: 'https://www.apesk.com/xinliceshi/start_m/?1355.html',
        description:'你的压力从何而来？'
      },
      {
        id: 4,
        image: 'http://175.178.90.196:7778/photo/test4.png',
        title: '情绪稳定性评估',
        url: 'https://www.apesk.com/xinliceshi/start_m/?1380.html',
        description:'你的情绪管理能力强吗？'
      },
      {
        id: 5,
        image: 'http://175.178.90.196:7778/photo/test5.png',
        title: '亲密指数测试',
        url: 'https://www.apesk.com/xinliceshi/start_m/?1404.html',
        description:'依恋会影响你的爱情吗？'
      },
    ]
  },
  navigateToTest: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/3-6webview/webview?url=`+ encodeURIComponent(url)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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