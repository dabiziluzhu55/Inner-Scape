// 第一个图的计时器
function startTimer_one(btn) {
  console.log("startTimer_one");
  var btn = btn;
  var timeDisplay = btn.data.timeDisplay;
  var xiDisplay = "吸气";
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
      if (timeDisplay >= 4) {
        btn.data.waveDirection = 1;
        xiDisplay = "吸气";
      }
    }
    // 更新页面中的波浪圈内部数字和吸气/呼气显示
    btn.setData({
      timeDisplay: timeDisplay,
      xiDisplay: xiDisplay
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
        timeDisplay: 4,
        waveDirection: 1,
        state: false, // 切换动画状态
      });
    }
  }, 1000);
};

// 第二个图的计时器
function startTimer_two(btn) {
  console.log("startTimer_two");
  var btn = btn;
  var timeDisplay = btn.data.timeDisplay;
  var xiDisplay = "吸气";
  var playing = true;
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
        btn.data.waveDirection = 0;
        xiDisplay = "屏息";
        timeDisplay = 7;// 设置屏息时间
        playing = false;
      }
    } else if(btn.data.waveDirection === -1){
      // 波浪圈变小，数字逐渐增大
      timeDisplay = timeDisplay + 1;
      if (timeDisplay >= 8) {
        btn.data.waveDirection = 1;
        xiDisplay = "吸气";
        timeDisplay = 4;
      }
    } else{
      // 屏息状态
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = -1;
        xiDisplay = "呼气";
        playing = true;
      }
    }
    // 更新页面中的波浪圈内部数字和吸气/呼气显示
    btn.setData({
      timeDisplay: timeDisplay,
      xiDisplay: xiDisplay,
      playing : playing,
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
        timeDisplay: 4,
        waveDirection: 1,
        state: false, // 切换动画状态
      });
    }
  }, 1000);
};

// 第三张图的定时器
function startTimer_three(btn) {
  var btn = btn;
  var timeDisplay = btn.data.timeDisplay;
  var xiDisplay = "吸气";
  var playing = true;
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
        btn.data.waveDirection = 0;
        xiDisplay = "屏息";
        timeDisplay = 3;// 设置屏息时间
        playing = false;
      }
    } else if(btn.data.waveDirection === -1){
      // 波浪圈变小，数字逐渐增大
      timeDisplay = timeDisplay + 1;
      if (timeDisplay >= 3) {
        btn.data.waveDirection = 1;
        xiDisplay = "吸气";
        timeDisplay = 3;// 设置吸气时间
      }
    } else{
      // 屏息状态
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = -1;
        xiDisplay = "呼气";
        playing = true;
      }
    }
    // 更新页面中的波浪圈内部数字和吸气/呼气显示
    btn.setData({
      timeDisplay: timeDisplay,
      xiDisplay: xiDisplay,
      playing : playing,
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
        timeDisplay: 3,
        waveDirection: 1,
        state: false, // 切换动画状态
      });
    }
  }, 1000);
}

function startTimer_four(btn) {
  var btn = btn;
  var timeDisplay = btn.data.timeDisplay;
  var xiDisplay = "吸气";
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
      if (timeDisplay >= 4) {
        btn.data.waveDirection = 1;
        xiDisplay = "吸气";
      }
    }
    // 更新页面中的波浪圈内部数字和吸气/呼气显示
    btn.setData({
      timeDisplay: timeDisplay,
      xiDisplay: xiDisplay
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
        timeDisplay: 4,
        waveDirection: 1,
        state: false, // 切换动画状态
      });
    }
  }, 1000);
}

// 第五张图的定时器
function startTimer_five(btn) {
  var btn = btn;
  var timeDisplay = btn.data.timeDisplay;
  var xiDisplay = "吸气";
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
      // 波浪圈变大，
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = -1;
        xiDisplay = "呼气";
      }
    } else {
      // 波浪圈变小，
      timeDisplay = timeDisplay + 1;
      if (timeDisplay >= 6) {
        btn.data.waveDirection = 1;
        xiDisplay = "吸气";
        timeDisplay = 3;
      }
    }
    // 更新页面中的波浪圈内部数字和吸气/呼气显示
    btn.setData({
      timeDisplay: timeDisplay,
      xiDisplay: xiDisplay
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
        timeDisplay: 3,
        waveDirection: 1,
        state: false, // 切换动画状态
      });
    }
  }, 1000);
}

// 第六张图的定时器
// 启动计时器
function startTimer_six(btn) {
  var btn = btn;
  var timeDisplay = btn.data.timeDisplay;
  var xiDisplay = "吸气";
  var playing = true;
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
      // 波浪圈变大，第一次吸气阶段
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = 0;// 第一次屏息 下一次为吸气
        xiDisplay = "屏息";
        timeDisplay = 2;// 设置屏息时间
        playing = false;
      }
    } else if(btn.data.waveDirection === -1){
      // 波浪圈变小，
      timeDisplay = timeDisplay + 1;
      if (timeDisplay >= 4) {
        btn.data.waveDirection = 1;
        xiDisplay = "吸气";
        timeDisplay = 2;
      }
    } else if(btn.data.waveDirection === 0){
      // 第一次屏息状态  下一阶段为吸气
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = 3;
        xiDisplay = "吸气";
        playing = true;
        timeDisplay = 2;// 第二段吸气时间
      }
    }else if(btn.data.waveDirection === 2){
      // 第二阶段屏息 下一阶段是呼气
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = -1;
        xiDisplay = "呼气";
        playing = true;
      }
    }else{
      // 第二次吸气阶段
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = 2;// 第二次屏息 下一次为呼气
        xiDisplay = "屏息";
        timeDisplay = 2;// 设置屏息时间
        playing = false;
      }
    }
    // 更新页面中的波浪圈内部数字和吸气/呼气显示
    btn.setData({
      timeDisplay: timeDisplay,
      xiDisplay: xiDisplay,
      playing : playing,
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
}

// 启动计时器
function startTimer_seven(btn) {
  var btn = btn;
  var timeDisplay = btn.data.timeDisplay;
  var xiDisplay = "吸气";
  var playing = true;
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
        btn.data.waveDirection = 0;
        xiDisplay = "屏息";
        timeDisplay = 4;// 设置屏息时间
        playing = false;
      }
    } else if(btn.data.waveDirection === -1){
      // 波浪圈变小，数字逐渐增大
      timeDisplay = timeDisplay + 1;
      if (timeDisplay >= 4) {
        btn.data.waveDirection = 1;
        xiDisplay = "吸气";
        timeDisplay = 4;
      }
    } else{
      // 屏息状态
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = -1;
        xiDisplay = "呼气";
        playing = true;
      }
    }
    // 更新页面中的波浪圈内部数字和吸气/呼气显示
    btn.setData({
      timeDisplay: timeDisplay,
      xiDisplay: xiDisplay,
      playing : playing,
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
        timeDisplay: 4,
        waveDirection: 1,
        state: false, // 切换动画状态
      });
    }
  }, 1000);
}

function startTimer_eight(btn) {
  var btn = btn;
  var timeDisplay = btn.data.timeDisplay;
  var xiDisplay = "吸气";
  var playing = true;
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
      // 波浪圈变大，吸气阶段
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = 0;// 第一次屏息
        xiDisplay = "屏息";
        timeDisplay = 8;// 设置屏息时间
        playing = false;
      }
    } else if(btn.data.waveDirection === -1){
      // 波浪圈变小，
      timeDisplay = timeDisplay + 1;
      if (timeDisplay >= 4) {
        btn.data.waveDirection = 2;
        xiDisplay = "屏息";
        timeDisplay = 2;
        playing = false;
      }
    } else if(btn.data.waveDirection === 0){
      // 第一次屏息状态  下一阶段为呼气
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = -1;
        xiDisplay = "呼气";
        playing = true;
      }
    }else if(btn.data.waveDirection === 2){
      // 第二阶段屏息 下一阶段是吸气
      timeDisplay = timeDisplay - 1;
      if (timeDisplay <= 0) {
        btn.data.waveDirection = 1;
        xiDisplay = "吸气";
        playing = true;
        timeDisplay = 2;
      }
    }
    // 更新页面中的波浪圈内部数字和吸气/呼气显示
    btn.setData({
      timeDisplay: timeDisplay,
      xiDisplay: xiDisplay,
      playing : playing,
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
}

module.exports = {
  startTimer_one : startTimer_one,
  startTimer_two : startTimer_two,
  startTimer_three : startTimer_three,
  startTimer_four : startTimer_four,
  startTimer_five : startTimer_five,
  startTimer_six : startTimer_six,
  startTimer_seven : startTimer_seven,
  startTimer_eight : startTimer_eight,
}