const util = require('../../utils/util.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: '', // 背景图片
    isPlay: true, 
    videoSrc: 'http://music.163.com/song/media/outer/url?id=1951069525.mp3', // 初始音乐链接
    name: '', // 初始音乐名
    currentTime: '0:00', // 当前歌曲播放进度
    duration: '0:00', // 当前歌曲总时长
    value:0.0,//歌曲播放进度数值表示
    maxValue:0.0,
    // 记录用户冥想时间
    startTime:'',
    endTime:'',
    type:''
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      videoSrc:options.musicUrl,
      name:options.name,
      src:options.src,
      type:options.type,
      startTime:util.formatTime(new Date())
    })
    // this.audioCtx = wx.createInnerAudioContext()
    this.audioCtx = app.globalData.musicPlayer;
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
              duration: this.timeFormat(audioCtx.duration)
          })
      },1000)
    })
    // 音频播放进度更新后执行
    audioCtx.onTimeUpdate(() => {
        this.setData({
            value: audioCtx.currentTime,
            maxValue: audioCtx.duration,
            currentTime: this.timeFormat(audioCtx.currentTime),
            duration: this.timeFormat(audioCtx.duration)
        })
    })
    audioCtx.play();
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
    this.audioCtx.src = this.data.videoSrc
    this.audioCtx.play()
    } else {
    this.audioCtx.pause()
    }
    this.setData({
        isPlay: !isPlay,
    })
  },
  pre15(){
    console.log(this.audioCtx.currentTime);
    if(this.audioCtx.currentTime>=15.00){
      this.audioCtx.seek(this.audioCtx.currentTime-15.00);
    }
  },
  next15(){
    console.log(this.audioCtx.currentTime);
    if((this.audioCtx.currentTime+15.00)<=this.audioCtx.duration){
      this.audioCtx.seek(this.audioCtx.currentTime+15.00);
      // 但是currentTime没有变
    }
  },
  toTime(e) {
    console.log(e.detail);
    let time = e.detail.value
    this.audioCtx.seek(time)
  },
  close(){
    var endTime=util.formatTime(new Date())
    console.log(endTime)
    // 向后端传递数据
    wx.request({
      url: 'http://175.178.90.196:7779/medRequest/setRecords',
      method: 'GET',
      data: {
        openId:'test',
        type:this.data.type,
        startTime:this.data.startTime,
        endTime:endTime
      },
      success(res) {
        console.log(res.data);
      },
      fail(error) {
        console.log(error);
      }
    })
    wx.navigateBack();
    //将当前的播放进度置为0
    this.audioCtx.seek(0);
    this.audioCtx.pause();//调用pause的话，再回来仍然保持播放进度呢
  },

})