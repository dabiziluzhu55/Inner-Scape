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
  onLoad(){
    this.InitialData();
  },
  InitialData(){
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/allMood',
      success:(res)=>{ 
        console.log(res.data)
        this.setData({
          menu:res.data
        })
      }
    })

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
    let nowIcon = this.data.menu[index].url;
    let nowName = this.data.menu[index].name;
    this.setData({
      curIndex: index,
      nowIcon:nowIcon,
      nowName:nowName,
    });
  },
  // 跳转我的日记页面
  NavigateToDairy(){
    wx.navigateTo({
      url: '/pages/3-5mooddiary/mooddiary',
    })
  },
  getDateString(){
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
  },
  change2exercise(){
    wx.navigateTo({
      url: '/pages/3-4moodexercise/moodexercise'
    })
  }

});