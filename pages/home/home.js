
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
    isPlay:false,
    imgUrls:["http://175.178.90.196:7778/sceneryjpg/one.jpg","http://175.178.90.196:7778/sceneryjpg/two.jpg","http://175.178.90.196:7778/sceneryjpg/three.jpg","http://175.178.90.196:7778/sceneryjpg/four.jpg","http://175.178.90.196:7778/sceneryjpg/five.jpg","http://175.178.90.196:7778/sceneryjpg/six.jpg","http://175.178.90.196:7778/sceneryjpg/seven.jpg","http://175.178.90.196:7778/sceneryjpg/eight.jpg","http://175.178.90.196:7778/sceneryjpg/nine.jpg","http://175.178.90.196:7778/sceneryjpg/ten.jpg","http://175.178.90.196:7778/sceneryjpg/el.jpg","http://175.178.90.196:7778/sceneryjpg/tw.jpg",]
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
  },

  change2music(e){
    wx.navigateTo({
      url: '/pages/meditation/meditation?musicUrl='+e.currentTarget.dataset.url+'&name='+e.currentTarget.dataset.name+'&src='+e.currentTarget.dataset.src,
    })
  },
  change2sound(e){
    wx.navigateTo({
      url: '/pages/sound/sound?music='+e.currentTarget.dataset.url+'&name='+e.currentTarget.dataset.name,
    })
  },
// 平静页面跳转
pingjEvent : function () {
  var teachContents = [{text : "1、鼻子吸气4秒，胸部不动，腹部隆起。"},{text : "2、鼻子呼气4秒，胸部不动，腹部回落。"},{text : "3、重复以上两步。"}];

  wx.navigateTo({
  url: '/pages/index/index?timeDisplay='+4+'&animationStart='+1+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+'/image/huxione.jpg', 
});
},

// 放空页面跳转
fangkEvent : function () {
  var teachContents = [{text : "1、鼻子吸气4秒，胸部不动，腹部隆起。"},{text : "2、屏息7秒。"},{text : "3、鼻子呼气8秒，胸部不动，腹部回落。"},{text:"4、重复以上三步。"}];

  wx.navigateTo({
    url: '/pages/index/index?timeDisplay='+4+'&animationStart='+2+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+'/image/huxione.jpg', 
   });
},

// 活力页面跳转
huolEvent : function () {
  var teachContents = [{text : "1、鼻子吸气3秒，胸部不动，腹部凹进。"},{text : "2、屏息3秒。"},{text : "3、鼻子呼气3秒，胸部不动，腹部隆起。"},{text:"4、重复以上三步。"}];

  wx.navigateTo({
    url: '/pages/index/index?timeDisplay='+3+'&animationStart='+3+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+'/image/huxione.jpg', 
   });
},

// 醒脑页面跳转
xingnEvent : function () {
  var teachContents = [{text : "1、鼻子吸气4秒，胸部不动，腹部凹进。"},{text : "2、鼻子呼气4秒，胸部不动，腹部隆起。"},{text : "3、重复以上两步。"}];

  wx.navigateTo({
    url: '/pages/index/index?timeDisplay='+3+'&animationStart='+4+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+'/image/huxione.jpg', 
   });
},

// 放松页面跳转
fangsEvent : function () {
  var teachContents = [{text : "1、鼻子吸气3秒，胸部不动，腹部隆起。"},{text : "2、鼻子呼气6秒，胸部不动，腹部回落。"},{text : "3、重复以上两步。"}];

  wx.navigateTo({
    url: '/pages/index/index?timeDisplay='+3+'&animationStart='+5+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+'/image/huxione.jpg', 
   });
},

// 充能页面跳转
chongnEvent : function () {
  var teachContents = [{text : "1、鼻子轻轻吸气2s，胸部不动，腹部凹进。"},{text : "2、屏息2秒。"},{text : "3、鼻子继续吸气2s，胸部不动，腹部凹进。"},{text : "4、屏息2秒。"},{text : "5、鼻子呼气4s，胸部不动，腹部隆起。"},{text : "6、重复以上五步。"}];

  wx.navigateTo({
    url: '/pages/index/index?timeDisplay='+2+'&animationStart='+6+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+'/image/huxione.jpg', 
   });
},

// 专注页面跳转
zhuanzEvent : function () {
  var teachContents = [{text : "1、鼻子吸气4秒，胸部不动，腹部隆起。"},{text : "2、屏息4秒。"},{text : "3、鼻子呼气4秒，胸部不动，腹部回落。"},{text : "4、重复以上三步。"}];

  wx.navigateTo({
    url: '/pages/index/index?timeDisplay='+4+'&animationStart='+7+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+'/image/huxione.jpg', 
   });
},

// 重启页面跳转
chongqEvent : function () {
  var teachContents = [{text : "1、鼻子吸气2s，胸部隆起肋骨随之向外、向上扩张；同时腹部向内收。"},{text : "2、屏息8秒。"},{text : "3、嘴巴呼气4秒，胸部回落，肋骨随之向内、向下回落；腹部放松。"},{text : "4、屏息2秒。"},{text : "5、重复以上四步。"}];

  wx.navigateTo({
    url: '/pages/index/index?timeDisplay='+2+'&animationStart='+8+'&teachContents='+JSON.stringify(teachContents)+'&teachImg='+'/image/huxione.jpg', 
   });
},

// 舒缓页面跳转
shuhEvent : function () {
},

// 激活页面跳转
jihEvent : function () {
},
})

