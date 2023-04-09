// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    //avatarUrl: '../images/cat.jpg', // 图像的本地文件路径
    name:'hello wx',
    items: [], // 滑动栏中的条目数据
    currentBtn: 1, // 当前选中的按钮，默认为按钮1
    totalMeditationCount: 100, // 总计冥想次数的数据
    todayMeditationCount: 10, // 今日冥想次数的数据
    daysOfStreak: 5, // 坚持天数的数据
  },
  onLoad: function() {
    // 生成随机的 ID
    //let userId = this.generateUserId();
    // 更新数据
    this.setData({
      //name: userId,
      //items: ['条目1', '条目2', '条目3'] // 示例的条目数据
      items: [
        {
          image: "pages\index\images\cat.png",
          title: "条目1",
          description: "这是条目1的描述信息",
        },
        {
          image: "pages\index\images\cat.png",
          title: "条目2",
          description: "这是条目2的描述信息",
        },
        {
          image: "pages\index\images\cat.png",
          title: "条目3",
          description: "这是条目3的描述信息",
        }
      ] // 根据需求设置不同的条目数据
    });
  },

  
  // 生成随机的用户 ID
  generateUserId: function() {
    // 这里使用简单的时间戳 + 随机数作为示例，实际情况中应该使用更复杂的方式生成随机 ID
    let timestamp = new Date().getTime();
    let random = Math.floor(Math.random() * 10000);
    return 'user_' + timestamp + '_' + random;
  },

  // btn1 点击事件
  handleBtn1Tap: function() {
    // 按钮1点击事件处理逻辑
    // 更新条目数据
    this.setData({
      items: [
        {
          image: "pages\index\images\cat.png",
          title: "条目1",
          description: "这是条目1的描述信息",
        },
        {
          image: "pages\index\images\cat.png",
          title: "条目2",
          description: "这是条目2的描述信息",
        },
        {
          image: "pages\index\images\cat.png",
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
          image: "pages\index\images\cat.png",
          title: "条目4",
          description: "这是条目4的描述信息",
          },
          {
          image: "pages\index\images\cat.png",
          title: "条目5",
          description: "这是条目5的描述信息",
          },
          {
          image: "pages\index\images\cat.png",
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
