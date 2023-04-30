// pages/dairy/dairy.js
Page({

  data: {
    // 居中显示项的位置
    centerItem: 0,  
    // 首页轮播图数据
    coverList:[
    {
      id: 0,
      url: "http://175.178.90.196:7778/headshot/images/baiyi.png"
    },
    {
      id: 1,
      url: "http://175.178.90.196:7778/headshot/images/caitou.jpg"
    },
    {
      id: 2,
      url: "http://175.178.90.196:7778/headshot/images/deluke.jpg"
    },
    {
      id: 3,
      url: "http://175.178.90.196:7778/headshot/images/haer.jpg"
    },
    {
      id: 4,
      url: "http://175.178.90.196:7778/headshot/images/mile.jpg"
    }
],
  },

  //轮播图滑动时改变居中项
handleSwiperChange(e) {
  this.setData({
    centerItem: e.detail.current,
  })
},
 
})