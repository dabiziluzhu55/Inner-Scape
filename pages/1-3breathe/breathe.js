// index.js
// 获取应用实例
const app = getApp()
const utils = require('../utils/startTimer.js')
Page({
  data: {
    timerId:'',
    timeLeft:179,
    waveDirection:1,
    timer: "3:00",
    timeDisplay: 0,
    timeRecord : 0,
    animationStart : 0,// 确定当前动画
    teachContents:[],// 教程内容
    name:'',// 当前页面名称
    teachImg:'',
    xiDisplay: "",
    startBtnText:"开始",
    voiceText:"关闭声音",
    voiceIconSrc: "/image/close.png", // 
    waveAnimation: {},
    waveAnimationPlayState: "paused",
    teachModalHidden : false,// 初始状态下 modal 是隐藏的
    modalHidden: false, // 初始状态下 modal 是隐藏的
    selectedOption : '',
    options: [
      { text: '1分钟', checked: false },
      { text: '6分钟', checked: false },
      { text: '9分钟', checked: false },
      { text: '12分钟', checked: false },
      { text: '15分钟', checked: false },
      { text: '18分钟', checked: false },
      { text: '30分钟', checked: false },
      { text: '60分钟', checked: false },
    ],
    selectedIndex: -1,
    state : true,// 动画状态
    playing : false,// 动画是否播放
    audioSrc: '', // 音频资源的路径
    isPlaying: false, // 音频是否正在播放(不必要)
    isMuted: false, // 音频是否已静音(不必要)
  },

onLoad : function (options) {
    var teachContent = JSON.parse(options.teachContents);
    this.setData({
      timeDisplay : options.timeDisplay,
      timeRecord : options.timeDisplay,
      animationStart : options.animationStart,
      teachContents : teachContent,
      teachImg : options.teachImg,
      name : options.name,
      audioSrc : options.audioSrc,
    });
},

// 退出
exitBtnEvent : function () {
  console.log("exit from the page");
  // 在当前页面的事件处理函数中调用
  wx.navigateBack({
  url: '/pages/catalog/catalog' 
});
},

// 教程
teachBtnEvent : function () {
  this.setData({
    teachModalHidden : true,
  })
},

// 取消教程按钮
cancelTeachBtnEvent : function(){
  this.setData({
    teachModalHidden : false,
  })
},

// 开始按钮
startBtnEvent:function(){
    var btn = this;
    var btnText = btn.data.startBtnText;
    if (btnText === "暂停") {
      clearTimeout(btn.data.timerId);
      this.audioPause();// 暂停音频
      btn.setData({
        startBtnText: "开始",
        playing : false,
      });
    } else {
      var chosen = this.data.animationStart;
      this.audioPlay();// 开始则播放音频
      switch(chosen){
        case '1' : 
          console.log("case 1");
          utils.startTimer_one(btn);
          break;
        case '2' :
          console.log("case 2");
          utils.startTimer_two(btn);
          break;
        case '3' :
          console.log("case 3");
          utils.startTimer_three(btn);
          break;
        case '4' :
          console.log("case 4");
          utils.startTimer_four(btn);
          break;
        case '5' :
          console.log("case 5");
          utils.startTimer_five(btn);
          break;
        case '6' :
          console.log("case 6");
          utils.startTimer_six(btn);
          break;
        case '7' :
          console.log("case 7");
          utils.startTimer_seven(btn);
          break;
        case '8' :
          console.log("case 8");
          utils.startTimer_eight(btn);
          break;
      }
      btn.setData({
        startBtnText: "暂停",
        state : true,
        playing : true,
      });
    }
},

// 补零函数
padZero : function(num) {
  return num < 10 ? "0" + num : num;
},

  // 声音按钮
  voiceBtnEvent:function () {
    // 点击声音选择按钮时触发的事件处理函数
    var voiceIconSrc = this.data.voiceIconSrc;
    var voiceText = this.data.voiceText;
    // 切换声音图标和文字
    if (voiceIconSrc.includes('/image/close.png')) {
      voiceIconSrc = '/image/start.png';
      voiceText = '打开声音';
    } else {
      voiceIconSrc = '/image/close.png';
      voiceText = '关闭声音';
    }
    // 打开声音或关闭声音
    if (this.innerAudioContext) {
      if (this.innerAudioContext.volume === 0) {
        this.innerAudioContext.volume = 1; // 恢复声音
        this.setData({
          isMuted: false
        });
      } else {
        this.innerAudioContext.volume = 0; // 静音
        this.setData({
          isMuted: true
        });
      }
    }
    // 更新数据
    this.setData({
      voiceIconSrc: voiceIconSrc,
      voiceText: voiceText
    });
  },

  // timeBtn
  timeBtnEvent:function () {
    if(this.data.startBtnText === '暂停'){
      wx.showToast({
        title: '请暂停后操作哦~',
        icon: 'none'
      });
    }
    else{
    this.setData({
      modalHidden: true, // 使用 setData 方法更新数据，将 modalHidden 设为 false，从而显示 modal
    });
  }
  },

  // cancelBtn
  cancelBtnEvent : function () {
    this.setData({
      modalHidden: false, 
    });
  },

  // options
  onOptionClick: function (e) {
    const index = e.currentTarget.dataset.index;
    const options = this.data.options;
    if (index !== this.data.selectedIndex) {
      if (this.data.selectedIndex !== -1) {
        options[this.data.selectedIndex].checked = false;
      }
      options[index].checked = true;
      this.setData({
        options: options,
        selectedIndex: index,
      });
    }
  },

  // 点击确认按钮时根据获取选中项的文字信息调整时间
  onConfirmBtnClick: function () {
    // 获得index
    const selectedIndex = this.data.selectedIndex;
      if (selectedIndex !== -1) {
        // 获得index下的文字信息
        const selectedOption = this.data.options[selectedIndex].text;
        
        let timeLeft = 0;
        let timer = '';
        if(selectedOption === "1分钟"){
          timeLeft = 59;
          timer = '1:00';
        }else if(selectedOption === "6分钟"){
          timeLeft = 359;
          timer = '6:00';
        }else if(selectedOption === "9分钟"){
          timeLeft = 539;
          timer = '9:00';
        }else if(selectedOption === "12分钟"){
          timeLeft = 719;
          timer = '12:00';
        }else if(selectedOption === "15分钟"){
          timeLeft = 899;
          timer = '15:00';
        }else if(selectedOption === "18分钟"){
          timeLeft = 1079;
          timer = '18:00';
        }else if(selectedOption === "30分钟"){
          timeLeft = 1799;
          timer = '30:00';
        }else if(selectedOption === "60分钟"){
          timeLeft = 3599;
          timer = '60:00';
        }
        this.setData({
          timeLeft : timeLeft,
          timer : timer,
          modalHidden: false, 
          xiDisplay: " ",
          timeDisplay: this.data.timeRecord,
          waveDirection: 1,
          state : false,// 切换动画状态
        })
      } else {
        wx.showToast({
          title: '请先选择一个选项',
          icon: 'none'
        });
      }
  },

  // 音频播放暂停函数
  // 播放音频
  audioPlay: function() {
    if (this.innerAudioContext) {
      // 如果之前已经创建了 InnerAudioContext 实例，则直接继续播放
      this.innerAudioContext.play();
    }
    else{
    // 创建 InnerAudioContext 实例
    this.innerAudioContext = wx.createInnerAudioContext();
    // 设置音频资源的路径
    this.innerAudioContext.src = this.data.audioSrc;
    // 循环
    this.innerAudioContext.loop = true;
    // 设置音量，不静音
    this.innerAudioContext.volume = 1; 
    // 播放音频
    this.innerAudioContext.play();
  }
  // 更新播放状态
  this.setData({
    isPlaying: true
  });
  },
  
  // 暂停音频
  audioPause: function() {
    if (this.innerAudioContext) {
      this.innerAudioContext.pause();
      // 更新播放状态
      this.setData({
        isPlaying: false
      });
    }
  },
})


