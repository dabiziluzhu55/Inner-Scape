// pages/sound/sound.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:"清雷骤雨",
    setTime:"/image/setTime.png",
    background:"/image/background.jpg",

    isPlay:true,
    videoSrc: '',
    currentTime: '0:00',
    duration: '15:00', 
    value:0.0,
    maxValue:0.0,
    userSetTime:'0:15',

    show:false,
    minHour: 0,
    maxHour: 6,
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 1 === 0);
      }
      return options;
    },
  },
  
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  return(){
    wx.navigateBack();
  },  
  onInput(event) {
    //通过小时分钟计算成分钟
    var time=this.hour2minite(event.detail)
    this.setData({
      duration: time,
    });
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

  onLoad(options) {
    console.log(options)
    this.setData({
      videoSrc:options.music,
      title:options.name,
    })
    this.audioCtx = wx.createInnerAudioContext()
    this.initialAudio()
  },
  // 初始化音频
  initialAudio() {
    let audioCtx = this.audioCtx
    audioCtx.src = this.data.videoSrc // 初始歌曲
    // 获取音乐时长，当前进度
    audioCtx.onCanplay(() => {
      audioCtx.duration
      audioCtx.currentTime
      setTimeout(() => {
          this.setData({
              value: audioCtx.currentTime,
              maxValue: audioCtx.duration,
              currentTime: this.timeFormat(audioCtx.currentTime),
              // duration: this.timeFormat(audioCtx.duration)
          })
      },1000)
    })
    // 无限循环
    audioCtx.onEnded(()=>{
      this.audioCtx.play();
    })
    
    // 音频播放进度更新后执行
    audioCtx.onTimeUpdate(() => {
        this.setData({
            value: audioCtx.currentTime,
            maxValue: audioCtx.duration,
            currentTime: this.timeFormat(audioCtx.currentTime),
            // duration: this.timeFormat(audioCtx.duration)
        })
        //如果播放进度到了规定时间
        if(this.data.value>=this.minite2second(this.data.duration)){
          this.setData({
            isPlay:false
          })
          audioCtx.pause();
        }
    })
    this.audioCtx.play();
  },
  timeFormat(e) {
    let time = Math.floor(e)
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    const result = `${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`
    return result
  },
  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  },
  isPlay() {
    let isPlay = this.data.isPlay
    if(!isPlay) {
      // this.audioCtx.src = this.data.videoSrc
      this.audioCtx.play()
    } 
    else {
      this.audioCtx.pause()
    }
    this.setData({
        isPlay: !isPlay,
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