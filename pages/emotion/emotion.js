Page({
  data: {
    menu_add: "icon_emotions_menus",
    menu: [
      {
        icon: "icon_happy",
        name: "开心",
      },
      {
        icon: "icon_excited",
        name: "兴奋",
      },
      {
        icon: "icon_disappointed",
        name: "失望",
      },
      {
        icon: "icon_angry",
        name: "生气",
      },
      {
        icon: "icon_embarrassed",
        name: "尴尬",
      },
      {
        icon: "icon_sad",
        name: "难过",
      },
      {
        icon: "icon_grievance",
        name: "委屈",
      },
      {
        icon: "icon_lonely",
        name: "孤独",
      },
      {
        icon: "icon_dysphoria",
        name: "烦躁",
      },
      {
        icon: "icon_nervous",
        name: "紧张",
      },
      {
        icon: "icon_calm",
        name: "平静",
      },
      {
        icon: "icon_bored",
        name: "无聊",
      },
      {
        icon: "icon_helpless",
        name: "无奈",
      },
      {
        icon: "icon_mourning",
        name: "丧",
      },
      {
        icon: "icon_other",
        name: "其他",
      },
    ],
    show_menu: false,
    currIndex: "",
    nowIcon:'',// 当前心情图标
    nowName:'',// 当前心情描述
  },
  // 展示菜单
  showMenu() {
    let { show_menu } = this.data;
    this.setData({
      show_menu: !show_menu,
      currIndex: "",
    });
  },
  // 选中点击的项目
  clickActive(e) {
    let { index } = e.currentTarget.dataset;
    if (this.data.currIndex === index || index === undefined) return false;
    let nowIcon = this.data.menu[index].icon;
    let nowName = this.data.menu[index].name;
    this.setData({
      currIndex: index,
      nowIcon:nowIcon,
      nowName:nowName,
    });
    // console.log(this.data.menu[this.data.currIndex].name);
  },
  // 跳转我的日记页面
  NavigateToDairy : function(){
    wx.navigateTo({
      url: '/pages/dairy/dairy',
    })
  }
});