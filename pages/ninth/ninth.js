
Page({
  data: {
    timerId:'',
    timeLeft:179,
    waveDirection:1,
    timer: "3:00",
    timeDisplay: 2,
    xiDisplay: "",
    startBtnText:"开始",
    voiceText:"关闭声音",
    voiceIconSrc: "/pages/images/close.jpg", // 
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
    timeIndex : 1,// 秒数索引
    totolSec : 2,// 记录每轮的吸气/呼气时间
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
      btn.setData({
        startBtnText: "开始",
        playing : false,
      });
    } else {
      btn.startTimer();
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
// 启动计时器
startTimer: function() {
  var btn = this;
  var timeDisplay = this.data.timeDisplay;
  var xiDisplay = "吸气";
  var totalSec = this.data.totolSec;
  var timeIndex = this.data.timeIndex;
  btn.data.timerId = setInterval(function() {
    var timeLeft = btn.data.timeLeft;
    // 更新总时间显示
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    var timer = btn.padZero(minutes) + ":" + btn.padZero(seconds);

    // 更新页面中的计时器显示
    btn.setData({
      timer: timer
    });

    // 更新波浪圈内部数字和吸气/呼气显示
    if (btn.data.waveDirection === 1) {
      // 波浪圈变大，数字逐渐减小
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = -1;
        xiDisplay = "呼气";
      }
    } else {
      // 波浪圈变小，数字逐渐增大
      timeDisplay = timeDisplay + 1;
      if (timeDisplay >= totalSec) {
        btn.data.waveDirection = 1;
        xiDisplay = "吸气";
        if(totalSec == 7){
          totalSec = 2;
          timeDisplay = totalSec;
          timeIndex = 1;
        }
        totalSec += 1;
        timeDisplay = totalSec;
        timeIndex += 1;
      }
    }
    // 更新页面中的波浪圈内部数字和吸气/呼气显示
    btn.setData({
      timeDisplay: timeDisplay,
      xiDisplay: xiDisplay,
      totalSec : totalSec,
      timeIndex : timeIndex
    });

    // 更新总时间剩余秒数
    btn.setData({
      timeLeft: btn.data.timeLeft - 1,
    });

    if (btn.data.timeLeft < 0) {
      // 总时间用完，停止定时器
      clearInterval(btn.data.timerId);
      // 重置时间
      btn.setData({
        timer: "3:00",
        timeLeft: 180,
        startBtnText: "开始",
        xiDisplay: " ",
        timeDisplay: 2,
        waveDirection: 1,
        state: false, // 切换动画状态
      });
    }
  }, 1000);
},


  // 声音按钮
  voiceBtnEvent:function () {
    // 点击声音选择按钮时触发的事件处理函数
    var voiceIconSrc = this.data.voiceIconSrc;
    var voiceText = this.data.voiceText;
    // 切换声音图标和文字
    if (voiceIconSrc.includes('/pages/images/close.jpg')) {
      voiceIconSrc = '/pages/images/start.jpg';
      voiceText = '打开声音';
    } else {
      voiceIconSrc = '/pages/images/close.jpg';
      voiceText = '关闭声音';
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
          timeDisplay: 2,
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

  
})


