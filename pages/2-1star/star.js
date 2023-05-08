
Page({
  data: {
    loading: true,
    stars:[],
    userID:0,
  },
  onLoad: function (options) {
    wx.request({
      url: 'http://175.178.90.196:7777/Refresh0?userID=lulu44',
      success: (res) => {
        console.log("请求成功",res.data.stars)
        if (res.statusCode === 200) {
          this.setData({
            stars: res.data.stars.map(star => ({
              starID: star.starID,
              starContent: star.starContent,
              starHost: star.starHost,
            })),
          });
        }
      },
    });
  },
  onStarTap: function (event) {
    const starID = event.currentTarget.dataset.starid;
    const star = this.data.stars.find(item => item.starID === starID);
    console.log(star)
    wx.navigateTo({
      url:'/pages/2-2starlog/starlog?star='+JSON.stringify(star)
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