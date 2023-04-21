
Page({
  /**
   * 页面的初始数据
   * tabs:tab栏的栏目名
   * tabIndex:当前tab所在的index
   */
  data: {
    tabs: ['冥想', '声音', '呼吸'],
    secTabs1:['睡眠','情绪平复','效率','日常','接纳','成长'],
    secTabs2:['自然','音乐','生活','ASMR'],
    tabIndex: 0,
    secIndex1:0,//冥想的二级标签
    secIndex2:0,//声音的二级标签
    "item": [],
    // 一个列表中包含4个列表
    "item1":[],
    isPlay:false
  },
  onLoad(){
    this.get_meditate('冥想','睡眠');
    this.get_sound('声音');
  },
  get_meditate(level0,level1){
    wx.request({
      url: 'http://124.220.28.218:7779/medRequest/getResources',
      data: {
        level0: level0,
        level1: level1
      },
      success:(res)=>{ 
        console.log(res.data)
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
        console.log(res.data)
        this.setData({
          item1:res.data
        })
      }
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
    this.get_meditate(this.data.tabs[this.data.tabIndex],this.data.secTabs1[this.data.secIndex1])
  },
  // 处理点击声音二级tab
  onSecTabClick2(e) {
    let id = e.currentTarget.id;
    this.setData({
      secIndex2: id,
    })
    // this.get_meditate(this.data.tabs[this.data.tabIndex],this.data.secTabs1[this.data.secIndex1])
  },

  change2music(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/meditation/meditation?musicUrl='+e.currentTarget.dataset.url+'&name='+e.currentTarget.dataset.name+'&src='+e.currentTarget.dataset.src,
    })
  },
  change2sound(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/sound/sound?music='+e.currentTarget.dataset.url+'&name='+e.currentTarget.dataset.name,
    })
  }
})

