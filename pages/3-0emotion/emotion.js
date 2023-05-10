const util = require('../../utils/util.js')

Page({
  data: {
    menu_add: "icon_emotions_menus",
    menu: [],
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
    if(this.data.nowName!=''){
      wx.navigateTo({
        url: '/pages/3-1emotion-reason/emotion-reason?Date='+this.getDateString()+'&emotionSrc='+this.data.nowIcon+'&emotion='+this.data.nowName+'&emotionId='+this.data.curIndex
      })
    }
    else{
      wx.showToast({
        title: '请选择心情',
        icon: 'none',
        duration: 1500,}
      )
    }
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