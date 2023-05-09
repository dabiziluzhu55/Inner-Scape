// pages/starlog/starlog.js
Page({
  data: {
    loading: true,
    showHug: false,
    starContent:'',
    starHost:'',
    starID:'',
    star:'',
    UserId: '', // 用来存储用户唯一的openID
    refreshID:'',
  },

  showImage: function () {
    this.setData({
      showHug: true
    })
  },

  //给到星星ID给到页面3 回复星星内容
  giveReply:function () {
    var starID=this.data.starID;
    wx.navigateTo({
      url:'/pages/2-3starreply/starreply?starID='+ starID +'&refreshID=' + this.data.refreshID
    })
  },

  onLoad(options) {
    const star = options.star;
    const refreshID = options.refreshID;
    if (!star) {
      console.error('star 参数未定义'); // 显示错误信息
      return; // 如果 star 未定义，直接返回
    }
    const star1=JSON.parse(star);
    this.setData({
      star: star1,
      starContent: star1.starContent,
      starHost: star1.starHost,
      starID: star1.starID,
      refreshID:refreshID,
    });
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