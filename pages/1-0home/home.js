const app = getApp();
Page({
  data: {
    tabs: ['冥想', '声音', '呼吸'],
    secTabs1:['睡眠','情绪平复','效率','日常','接纳','成长'],
    secTabs2:['自然','音乐','生活','ASMR'],
    tabIndex: 0,
    secIndex1:0,//冥想的二级标签
    secIndex2:0,//声音的二级标签
    "item": [],//item也要得到所有的内容
    "item1":[],
    isPlay:true,
    isShow:false,//是否显示底下最小化栏
    playProgress:'',
    duration:'',
    cur:{
      imageUrl:'http://175.178.90.196:7778/sound/nature/0forest/2.jpg',
      content:'测试',
      musicUrl:'http://175.178.90.196:7778/sound/nature/0forest/1.mp3',
    },
    imgUrls:["http://175.178.90.196:7778/sceneryjpg/one.jpg","http://175.178.90.196:7778/sceneryjpg/two.jpg","http://175.178.90.196:7778/sceneryjpg/three.jpg","http://175.178.90.196:7778/sceneryjpg/four.jpg","http://175.178.90.196:7778/sceneryjpg/five.jpg","http://175.178.90.196:7778/sceneryjpg/six.jpg","http://175.178.90.196:7778/sceneryjpg/seven.jpg","http://175.178.90.196:7778/sceneryjpg/eight.jpg","http://175.178.90.196:7778/sceneryjpg/nine.jpg","http://175.178.90.196:7778/sceneryjpg/ten.jpg","http://175.178.90.196:7778/sceneryjpg/el.jpg","http://175.178.90.196:7778/sceneryjpg/tw.jpg",],
    teachImgUrls : ["http://175.178.90.196:7778/teach/huxione.jpg","http://175.178.90.196:7778/teach/huxitwo.jpg","http://175.178.90.196:7778/teach/huxithree.jpg","http://175.178.90.196:7778/teach/huxifour.jpg","http://175.178.90.196:7778/teach/huxifive.jpg","http://175.178.90.196:7778/teach/huxisix.jpg","http://175.178.90.196:7778/teach/huxiseven.jpg","http://175.178.90.196:7778/teach/huxieight.jpg"],
  },
  onLoad(options){
    this.get_meditate('冥想');
    this.get_sound('声音');
    this.audioCtx = app.globalData.musicPlayer;
    this.observer = wx.createIntersectionObserver(this);
  },
  onPageScroll(e){
    console.log(e)
    if(e.scrollTop>=0&&e.scrollTop<360){
      this.setData({
        secIndex2:0
      })
    }
    if(e.scrollTop>=360){
      this.setData({
        secIndex2:1
      })
    }
  },

  onShow(){
    if(this.data.isShow==true){
      this.initialAudio()
    }
    console.log(this.timeFormat(this.audioCtx.currentTime)+'/'+this.data.duration)
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
            playProgress:this.timeFormat(this.audioCtx.currentTime)+'/'+this.data.duration
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
        playProgress:this.timeFormat(this.audioCtx.currentTime)+'/'+this.data.duration
      })
      //如果播放进度到了规定时间
      if(this.data.value>=this.minite2second(this.data.duration)){
        this.setData({
          isPlay:false
        })
        audioCtx.pause();
      }
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
  minite2second(ms){
    var timeArray = ms.split(':');
    var minites = parseInt(timeArray[0], 10);
    var seconds = minites*60;
    return seconds;
  },
  get_meditate(level0){
    wx.request({
      url: 'http://175.178.90.196:7779/medRequest/sound',
      data: {
        level0: level0,
      },
      success:(res)=>{ 
        this.setData({
          item:res.data
        })
      }
    })
  },
  get_sound(level0){
    wx.request({
      url: 'http://175.178.90.196:7779/medRequest/sound',
      data: {
        level0: level0
      },
      success:(res)=>{ 
        this.setData({
          item1:res.data,
        })
      }
    })
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

  // 处理点击tab
  onTabClick(e) {
    let id = e.currentTarget.id;
    this.setData({
      tabIndex: id,
    })
  },
  // 处理点击冥想二级tab
  onSecTabClick1(e) {
    let id = e.currentTarget.id;
    this.setData({
      secIndex1: id,
    })
  },
  // 处理点击声音二级tab
  onSecTabClick2(e) {
    let id = e.currentTarget.id;
    this.setData({
      secIndex2: id,
    })
    if(id==0){
      
    }
  },

  change2music(e){
    wx.navigateTo({
      url: '/pages/1-1meditation/meditation?musicUrl='+e.currentTarget.dataset.url+'&name='+e.currentTarget.dataset.name+'&src='+e.currentTarget.dataset.src+'&type='+this.data.secTabs1[this.data.secIndex1],
    })
  },
  change2sound(e){
    wx.navigateTo({
      url: '/pages/1-2sound/sound?music='+e.currentTarget.dataset.music+'&name='+e.currentTarget.dataset.name+'&image='+e.currentTarget.dataset.image,
    })
  },
  closeMusic(){
    this.setData({
      isShow:false
    }),
    this.audioCtx.seek(0);
    this.audioCtx.pause();//调用pause的话，再回来仍然保持播放进度呢
  },
  // 平静页面跳转
pingjEvent : function () {
  var teachContents = [{text : "1、鼻子吸气4秒，胸部不动，腹部隆起。"},{text : "2、鼻子呼气4秒，胸部不动，腹部回落。"},{text : "3、重复以上两步。"}];

  wx.navigateTo({
  url: '/pages/1-3breathe/breathe?timeDisplay='+4+'&animationStart='+1+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+this.data.teachImgUrls[0]+'&name='+'平静'+'&audioSrc='+'/pages/1-3breathe/play.mp3'
});
},

// 放空页面跳转
fangkEvent : function () {
  var teachContents = [{text : "1、鼻子吸气4秒，胸部不动，腹部隆起。"},{text : "2、屏息7秒。"},{text : "3、鼻子呼气8秒，胸部不动，腹部回落。"},{text:"4、重复以上三步。"}];

  wx.navigateTo({
    url: '/pages/1-3breathe/breathe?timeDisplay='+4+'&animationStart='+2+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+this.data.teachImgUrls[1]+'&name='+'放空', 
   });
},

// 活力页面跳转
huolEvent : function () {
  var teachContents = [{text : "1、鼻子吸气3秒，胸部不动，腹部凹进。"},{text : "2、屏息3秒。"},{text : "3、鼻子呼气3秒，胸部不动，腹部隆起。"},{text:"4、重复以上三步。"}];

  wx.navigateTo({
    url: '/pages/1-3breathe/breathe?timeDisplay='+3+'&animationStart='+3+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+this.data.teachImgUrls[2]+'&name='+'活力', 
   });
},

// 醒脑页面跳转
xingnEvent : function () {
  var teachContents = [{text : "1、鼻子吸气4秒，胸部不动，腹部凹进。"},{text : "2、鼻子呼气4秒，胸部不动，腹部隆起。"},{text : "3、重复以上两步。"}];

  wx.navigateTo({
    url: '/pages/1-3breathe/breathe?timeDisplay='+4+'&animationStart='+4+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+this.data.teachImgUrls[3]+'&name='+'醒脑', 
   });
},

// 放松页面跳转
fangsEvent : function () {
  var teachContents = [{text : "1、鼻子吸气3秒，胸部不动，腹部隆起。"},{text : "2、鼻子呼气6秒，胸部不动，腹部回落。"},{text : "3、重复以上两步。"}];

  wx.navigateTo({
    url: '/pages/1-3breathe/breathe?timeDisplay='+3+'&animationStart='+5+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+this.data.teachImgUrls[4]+'&name='+'放松', 
   });
},

// 充能页面跳转
chongnEvent : function () {
  var teachContents = [{text : "1、鼻子轻轻吸气2s，胸部不动，腹部凹进。"},{text : "2、屏息2秒。"},{text : "3、鼻子继续吸气2s，胸部不动，腹部凹进。"},{text : "4、屏息2秒。"},{text : "5、鼻子呼气4s，胸部不动，腹部隆起。"},{text : "6、重复以上五步。"}];

  wx.navigateTo({
    url: '/pages/1-3breathe/breathe?timeDisplay='+2+'&animationStart='+6+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+this.data.teachImgUrls[5]+'&name='+'充能', 
   });
},

// 专注页面跳转
zhuanzEvent : function () {
  var teachContents = [{text : "1、鼻子吸气4秒，胸部不动，腹部隆起。"},{text : "2、屏息4秒。"},{text : "3、鼻子呼气4秒，胸部不动，腹部回落。"},{text : "4、重复以上三步。"}];

  wx.navigateTo({
    url: '/pages/1-3breathe/breathe?timeDisplay='+4+'&animationStart='+7+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+this.data.teachImgUrls[6]+'&name='+'专注', 
   });
},

// 重启页面跳转
chongqEvent : function () {
  var teachContents = [{text : "1、鼻子吸气2s，胸部隆起肋骨随之向外、向上扩张；同时腹部向内收。"},{text : "2、屏息8秒。"},{text : "3、嘴巴呼气4秒，胸部回落，肋骨随之向内、向下回落；腹部放松。"},{text : "4、屏息2秒。"},{text : "5、重复以上四步。"}];

  wx.navigateTo({
    url: '/pages/1-3breathe/breathe?timeDisplay='+2+'&animationStart='+8+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+this.data.teachImgUrls[7]+'&name='+'重启', 
   });
},

// 舒缓页面跳转
shuhEvent : function () {
  var teachContents = [{text : "1、鼻子吸气4秒，胸部不动，腹部隆起。"},{text : "2、鼻子呼气4秒，胸部不动，腹部回落。"},{text : "3、重复以上两步。"}];

  wx.navigateTo({
  url: '/pages/1-3breathe/breathe?timeDisplay='+4+'&animationStart='+1+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+this.data.teachImgUrls[0]+'&name='+'舒缓', 
});
},

// 激活页面跳转
jihEvent : function () {
  var teachContents = [{text : "1、鼻子吸气4秒，胸部不动，腹部隆起。"},{text : "2、鼻子呼气4秒，胸部不动，腹部回落。"},{text : "3、重复以上两步。"}];

  wx.navigateTo({
  url: '/pages/1-3breathe/breathe?timeDisplay='+4+'&animationStart='+1+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+this.data.teachImgUrls[0]+'&name='+'激活', 
});
},


})

