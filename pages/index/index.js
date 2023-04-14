// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    avatarUrl: '', // 图像的本地文件路径
    name:'',
    items: [], // 滑动栏中的条目数据
    imageUrls:['http://175.178.90.196:7778/headshot/images/baiyi.png','http://175.178.90.196:7778/headshot/images/caitou.jpg','http://175.178.90.196:7778/headshot/images/deluke.jpg','http://175.178.90.196:7778/headshot/images/haer.jpg','http://175.178.90.196:7778/headshot/images/mile.jpg','http://175.178.90.196:7778/headshot/images/pusa.jpg','http://175.178.90.196:7778/headshot/images/siwei.jpg','http://175.178.90.196:7778/headshot/images/sufei.jpg','http://175.178.90.196:7778/headshot/images/wuming.jpg'],
    avatarUrlItems:[],
    selectedIndex : -1,// 当前选择的图像
    currentBtn: 1, // 当前选中的按钮，默认为按钮1
    totalMeditationCount: 100, // 总计冥想次数的数据
    todayMeditationCount: 10, // 今日冥想次数的数据
    daysOfStreak: 5, // 坚持天数的数据
    modalHidden : false,
  },
  onLoad: function() {
    // 生成随机的 ID
    let userId = this.generateUserId();
    var imageUrls = this.data.imageUrls;
    var avatarUrlItems = [];
    var promises = [];
  
    // 获取图片并创建 Promise
    for(let i = 0; i < 9; i++){
      let promise = new Promise((resolve, reject) => {
        wx.request({
          url: imageUrls[i],
          responseType: 'arraybuffer',
          success: function(res) {
            // 将 res.data（二进制数组）转换为 base64 编码
            let base64 = wx.arrayBufferToBase64(res.data);
            // 将 base64 编码添加到数组中
            base64 = 'data:image/jpeg;base64,' + base64;
            avatarUrlItems.push({avatarUrl : base64, checked : false});
            resolve();
          },
          fail: function(res) {
            console.error('请求图片失败', res);
            reject();
          }
        });
      });
      promises.push(promise);
    }
  
    // 等待所有请求完成
    Promise.all(promises).then(() => {
      // 更新数据
      this.setData({
        name: userId,
        avatarUrl : '/pages/index/images/cat.jpg',
        // 示例的条目数据
        items: [
          {
            image: "",
            title: "条目1",
            description: "这是条目1的描述信息",
          },
          {
            image: "",
            title: "条目2",
            description: "这是条目2的描述信息",
          },
          {
            image: "",
            title: "条目3",
            description: "这是条目3的描述信息",
          }
        ], // 根据需求设置不同的条目数据
      });
      this.setData({
        avatarUrlItems : avatarUrlItems,
      });
    }).catch(() => {
      // 处理请求失败的情况
    });
  },

  // 生成随机的用户 ID 与加载默认图像
  generateUserId: function() {
    // 这里使用简单的时间戳 + 随机数作为示例，实际情况中应该使用更复杂的方式生成随机 ID
    let timestamp = new Date().getTime();
    let timestampStr = timestamp.toString();
    let timestampShort = timestampStr.substring(0, 5); 
    let random = Math.floor(Math.random() * 10000);
    return 'cat_' + timestampShort + '_' + random;
  },

  imageOnloadError(e){
    console.log("加载默认图")
    console.log(e)
    var img='/pages/index/images/cat.jpg'//图片加载失败时展示的默认图
    this.setData({
    imgurl:img
    })
  },

  // 我的冥想btn点击事件
  handlemingBtnTap: function () {
    console.log("跳转到我的冥想页面")
  },

  // 点击选择头像
  avatarEvent:function () {
    this.setData({
      modalHidden : true,
    })
  },

  // cancelbtn 
  cancelBtnEvent:function () {
    this.setData({
      modalHidden : false,
    })
  },

  // 选择
  onOptionClick : function (e) {
    const index = e.currentTarget.dataset.index;
    const avatarUrlItems = this.data.avatarUrlItems;
    if (index !== this.data.selectedIndex) {
      if (this.data.selectedIndex !== -1) {
        avatarUrlItems[this.data.selectedIndex].checked = false;
      }
      avatarUrlItems[index].checked = true;
      this.setData({
        avatarUrlItems: avatarUrlItems,
        selectedIndex: index,
      });
    }
  },

  // confirmbtn
  onConfirmBtnClick:function () {
    if(this.data.selectedIndex !== -1){
      const selected = this.data.selectedIndex;
      let selectoption = this.data.avatarUrlItems[selected].avatarUrl;
    this.setData({
        avatarUrl : selectoption,
        modalHidden : false,
    })
  }
    else{
      wx.showToast({
        title: '请选择一个头像',
      })
    }
  },

  // btn1 点击事件
  handleBtn1Tap: function() {
    // 按钮1点击事件处理逻辑
    // 更新条目数据
    this.setData({
      items: [
        {
          image: "",
          title: "条目1",
          description: "这是条目1的描述信息",
        },
        {
          image: "",
          title: "条目2",
          description: "这是条目2的描述信息",
        },
        {
          image: "",
          title: "条目3",
          description: "这是条目3的描述信息",
        },
        {
          image: "",
          title: "条目1",
          description: "这是条目1的描述信息",
        },
        {
          image: "",
          title: "条目2",
          description: "这是条目2的描述信息",
        },
        {
          image: "",
          title: "条目3",
          description: "这是条目3的描述信息",
        },
        {
          image: "",
          title: "条目1",
          description: "这是条目1的描述信息",
        },
        {
          image: "",
          title: "条目2",
          description: "这是条目2的描述信息",
        },
        {
          image: "",
          title: "条目3",
          description: "这是条目3的描述信息",
        }
      ] // 根据需求设置不同的条目数据
    });
  },
  handleBtn2Tap: function() {
    // 按钮2点击事件处理逻辑
    // 更新条目数据
    this.setData({
      items: [
        {
          image: "",
          title: "条目4",
          description: "这是条目4的描述信息",
          },
          {
          image: "",
          title: "条目5",
          description: "这是条目5的描述信息",
          },
          {
          image: "",
          title: "条目6",
          description: "这是条目6的描述信息",
          }
          ] // 根据需求设置不同的条目数据
        });
  },
  // 条目点击事件
  handleItemClick: function(event) {
    // 条目点击事件处理逻辑
    // 可以通过 event.currentTarget.dataset 获取当前点击的条目数据
    var index = event.currentTarget.dataset.index;
    var description = this.data.items[index].description;
    // 进行相应的处理
    console.log("点击了条目:", description);
    },
    handleScrollToLower: function() {
    // 滚动到底部事件处理逻辑
    // 可以进行相应的处理
    console.log("滚动到底部");
    },
})
