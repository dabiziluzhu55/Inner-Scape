
Page({
  data: {
    starId: 0, // 回复的星星id
    length:0,
  },

  onLoad(options) {
    // 获取星星id
    this.setData({
    starId: options.id
    })
  },

  length(e){
    let length=e.detail.value.length;
    this.setData({
      length:length
    })
  },

  submitForm: function (e) {
    // 获取回复内容
    //url:http://175.178.90.196:7777/ReplyStar?starID=&userID=&replySay=
    let replyContent = e.detail.value.replyContent
    // 获取回复内容字数
    const replyLength = replyContent.length;

    // 判断回复内容是否超过 128 字
    if (replyLength > 128) {
    wx.showToast({
    title: '回复内容不能超过128字',
    icon: 'none'
    });
    return;
  }

    if (!replyContent) {
      wx.showToast({
        title: '请输入回复内容',
        icon: 'none'
      })
      return
    }
    // 记录回复信息并提交到后端
    let replyInfo = {
      starId: this.data.starId,
      replyContent: replyContent,
    }
    // 将replyInfo提交到后端
    // 提交成功后跳转回星星界面
    wx.navigateBack({
      delta: 2
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