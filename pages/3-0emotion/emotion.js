const util = require('../../utils/util.js')
Page({
  data: {
    menu_add: "icon_emotions_menus",
    menu: [
      {
        icon: "/emotion_imgs/开心.png",
        name: "开心",
      },
      {
        icon: "/emotion_imgs/难过.png",
        name: "难过",
      },
      {
        icon: "/emotion_imgs/尴尬.png",
        name: "尴尬",
      },
      {
        icon:"/emotion_imgs/无聊.png",
        name:"无聊",
      },
      {
        icon:"/emotion_imgs/生气.png",
        name:"生气",
      },
      {
        icon: "/emotion_imgs/烦躁.png",
        name: "烦躁",
      },
      {
        icon:"/emotion_imgs/紧张.png",
        name:"紧张",
      },

      {
        icon: "/emotion_imgs/孤独.png",
        name: "孤独",
      },
      {
        icon:"/emotion_imgs/害怕.png",
        name:"害怕",
      },
      {
        icon: "/emotion_imgs/平静.png",
        name: "平静",
      },
      {
        icon: "/emotion_imgs/其他.png",
        name: "其他",
      },
      {
        icon: "/emotion_imgs/委屈.png",
        name: "委屈",
      },
    ],
    show_menu: false,
    curIndex: "",
    nowIcon:'',// 当前心情图标
    nowName:'',// 当前心情描述
  },
  
  // 展示菜单
  showMenu() {
    let { show_menu } = this.data;
    this.setData({
      show_menu: !show_menu,
      curIndex: "",
    });
  },
  // 选中点击的项目
  clickActive(e) {
    let { index } = e.currentTarget.dataset;
    if (this.data.curIndex === index || index === undefined) return false;
    let nowIcon = this.data.menu[index].icon;
    let nowName = this.data.menu[index].name;
    this.setData({
      curIndex: index,
      nowIcon:nowIcon,
      nowName:nowName,
    });
  },
  // 跳转我的日记页面
  NavigateToDairy : function(){
    wx.navigateTo({
      url: '/pages/dairy/dairy',
    })
  },
  getDateString(){
    // // 获取当前日期时间
    // const now = new Date();
    // // 获取日期信息
    // const day = now.getDay(); // 0-6，分别表示周日至周六
    // const date = now.getDate(); // 1-31，表示当前日期
    // const month = now.getMonth() + 1; // 0-11，需要加1才是实际月份
    // const year = now.getFullYear(); // 四位数的年份
    // // 获取时间信息
    // const hours = now.getHours(); // 0-23，表示当前小时数
    // const minutes = now.getMinutes(); // 0-59，表示当前分钟数
    // // 将日期时间转换为字符串格式
    // const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    // const weekDayString = weekDays[day]; // 根据星期数获取星期几的字符串
    // const dateString = `${year}.${month.toString().padStart(2, '0')}.${date.toString().padStart(2, '0')}`;
    // // 将年月日拼接成字符串格式，月份和日期不足两位数则在前面补0
    // const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    // // 将小时数和分钟数拼接成字符串格式，不足两位数则在前面补0
    // const dateTimeString = `${weekDayString} / ${dateString} ${timeString}`;
    return util.formatTime(new Date())
  },
  change2reason(){
    //传递日期字符串、心情Icon的路径和心情名称
    wx.navigateTo({
      url: '/pages/3-1emotion-reason/emotion-reason?Date='+this.getDateString()+'&emotionSrc='+this.data.nowIcon+'&emotion='+this.data.nowName+'&emotionId='+this.data.curIndex
    })
  },
  change2report(){
    wx.navigateTo({
      url: '/pages/3-3emotion-report/emotion-report'
    })
  }

});