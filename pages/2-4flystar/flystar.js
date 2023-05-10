Page({
  data: {
    length:0,
    starContent:'',
    userID:'',
  },
  onLoad(options) {
    // 获取用户id
    var UserId = wx.getStorageSync('UserId');
    this.setData({
      userID: UserId
    })
  },
  length(e){
    let length=e.detail.value.length;
    this.setData({
      length:length,
      starContent: e.detail.value
    })
  },
  submitForm:function(e){
    // 判断回复内容是否超过 128 字
    if (this.data.length > 128) {
      wx.showToast({
      title: '回复内容不能超过128字',
      icon: 'none'
      });
      return;
      }
      if (!e.detail.value.starContent) {
        wx.showToast({
          title: '请输入回复内容',
          icon: 'none'
        })
        return
      }
    var that=this;
    let starContent = e.detail.value.starContent;
    let userID = that.data.userID;
    wx.request({
      url: 'http://175.178.90.196:7777/FlyStar?userID=' + userID + '&starContent=' + starContent,
      method: 'GET',

      success: function (res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success:function(){
            setTimeout(function(){
              wx.navigateBack();
            },1500)
          }
        })
        // 提交成功后，清空留言框内容
        that.setData({
          length: 0,
          replyContent: ''
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  onReady() {

  },

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