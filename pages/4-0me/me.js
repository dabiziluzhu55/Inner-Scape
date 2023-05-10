// me.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    UserId: '', // 用来存储用户唯一的openID
    NickName: '', // 昵称
    avatarUrl: '', // 图像的本地文件路径
    DefaultavatarUrl: 'http://175.178.90.196:7778/photo/cat.jpg', // 默认头像
    items: [], // 正在滑动栏中的条目数据
    needRefresh: false, // 刷新数据
    imageUrls: [{
        avatarUrl: 'http://175.178.90.196:7778/headshot/images/baiyi.png',
        checked: false
      },
      {
        avatarUrl: 'http://175.178.90.196:7778/headshot/images/caitou.jpg',
        checked: false
      },
      {
        avatarUrl: 'http://175.178.90.196:7778/headshot/images/deluke.jpg',
        checked: false
      }, {
        avatarUrl: 'http://175.178.90.196:7778/headshot/images/haer.jpg',
        checked: false
      }, {
        avatarUrl: 'http://175.178.90.196:7778/headshot/images/mile.jpg',
        checked: false
      }, {
        avatarUrl: 'http://175.178.90.196:7778/headshot/images/pusa.jpg',
        checked: false
      }, {
        avatarUrl: 'http://175.178.90.196:7778/headshot/images/siwei.jpg',
        checked: false
      }, {
        avatarUrl: 'http://175.178.90.196:7778/headshot/images/sufei.jpg',
        checked: false
      }, {
        avatarUrl: 'http://175.178.90.196:7778/headshot/images/wuming.jpg',
        checked: false
      }
    ],
    selectedIndex: -1, // 当前选择的图像索引
    nowShotIndex: -1,
    totalTime : 0, // 累积冥想时间
    totalCount : 0,// 累计冥想次数
    todayTime : 0, // 今日冥想时间
    modalHidden: false,
    closeenImg: 'http://175.178.90.196:7778/photo/closeen.png', // 未打开的 
    openenImg: 'http://175.178.90.196:7778/photo/openen.png', // 打开了的
    newInfo: 0, // 新消息数量
  },

  onLoad: function () {
    // 如果还没有UserID则获取openID并设置
    if (this.data.UserId === '') {
      this.getOpenID();
    }
    // 其他数据初始化
    // this.OtherDataInitial();
    // 获取并设置冥想有关数据
    // this.getMingData();
  },

  // 确保返回该页面后刷新该数据
  onShow: function () {
    // 我给别人的评论
    this.ViewReplyToOthers(() => {
      // 给我的评论
      this.ViewMyReply();
    });
  },

  // 获取用户的openID
  getOpenID: function () {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://175.178.90.196:7779/login/testopenid',
            data: {
              code: res.code
            },
            success: (res) => {
              that.setData({
                UserId: res.data,
              }, function () {
                // 判断用户是否存在
                that.UserExist(function (flag) {
                  // console.log('用户存在信息', flag);
                  if (flag === 0) {
                    // 设置昵称
                    that.setID();
                  } else if (flag === 1) {
                    // 根据openID向后端服务器获取该用户的信息
                    that.getUserInfo();
                  }
                });
                that.OtherDataInitial();
                that.getMingData();
              });
              wx.setStorageSync('UserId', res.data);
            }
          })
        } else {
          console.log('获取失败！' + res.errMsg)
        }
      }
    })
  },

  // 用户是否存在
  UserExist: function (callback) {
    var that = this;
    wx.request({
      url: 'http://175.178.90.196:7777/UserExist?userID=' + that.data.UserId,
      success: (res) => {
        callback(res.data.code);
      }
    })
  },

  // 用户注册
  UserRegister: function () {
    var that = this;
    let userID = that.data.UserId;
    let userName = that.data.NickName;
    let headShot = that.data.nowShotIndex;

    wx.request({
      url: 'http://175.178.90.196:7777/Register?userID=' + userID + '&userName=' + userName + '&headshot=' + headShot,
      success: (res) => {
        console.log('用户注册信息', res.data.code);
      }
    })

  },

  // 获取用户信息
  getUserInfo: function () {
    let that = this;
    let userID = that.data.UserId;
    wx.request({
      url: 'http://175.178.90.196:7777/Login?userID=' + userID,
      success: (res) => {
        // console.log("用户个人信息 ：", res.data);
        that.setData({
          NickName: res.data.userName,
          nowShotIndex: res.data.headshot,
        }, function () {
          if (this.data.nowShotIndex === -1) {
            // 默认图像
            this.setData({
              avatarUrl: this.data.DefaultavatarUrl,
            })
          } else {
            // 更改后的图像
            this.setData({
              avatarUrl: this.data.imageUrls[that.data.nowShotIndex].avatarUrl,
            })
          }
        })
      }
    })
  },

  // 随机id的随机生成
  setID: function () {
    // 生成随机的 ID
    var that = this;
    let Id = this.generateUserId();
    this.setData({
      NickName: Id,
    }, function () {
      that.UserRegister();
    });
  },

  // 其他数据初始化
  OtherDataInitial: function () {
    var that = this;
    // 查看新消息条数
    wx.request({
      url: 'http://175.178.90.196:7777/SearchNewInfoNum?userID=' + that.data.UserId,
      success: (res) => {
        // console.log(res.data);
        that.setData({
          newInfo: res.data.newInfo,
        }, function () {
          that.ViewMyReply(); // 获取自己收到的回复
        })
      }
    })
  },

  // 查看自己收到的回复
  ViewMyReply: function () {
    var that = this;
    var leftItems = [];

    wx.request({
      url: 'http://175.178.90.196:7777/ViewMyReply?userID=' + that.data.UserId,
      success: (res) => {
        // 遍历得到的信息
        for (let i = 0; i < res.data.stars.length; i++) {
          let starID = res.data.stars[i].starID; // 星星id 信件标识
          let starContent = res.data.stars[i].starContent; // 信件内容
          let replys = res.data.stars[i].replys; // 信件回复内容
          // 处理replys
          let replysString = JSON.stringify(replys);
          let encodedReplys = encodeURIComponent(replysString);
          let choose = 0;
          let imageUrl = that.data.closeenImg;
          // 处理starContent
          let starContent2String = JSON.stringify(starContent);
          let Cotentlength = starContent2String.length / 2;
          let description = starContent2String.substring(0, Cotentlength) + '......';
          // 单个Item的形式
          leftItems.push({
            starID: starID,
            starContent: starContent,
            choose: choose,
            replys: encodedReplys,
            image: imageUrl,
            title: 'My信件',
            description: description
          });
        }
        that.setData({
          items: leftItems,
        })
      }
    })
  },

  // 查看对他人的回复
  ViewReplyToOthers: function (callback) {
    var that = this;
    var rightItems = [];
    wx.request({
      url: 'http://175.178.90.196:7777/ViewReplyToOthers?userID=' + that.data.UserId,
      success: (res) => {
        for (let i = 0; i < res.data.replys.length; i++) {
          let replyID = res.data.replys[i].replyID;
          let replySay = res.data.replys[i].replySay;
          let starID = res.data.replys[i].starID;
          let starContent = res.data.replys[i].starContent;
          let starHostName = res.data.replys[i].starHostName;
          let choose = 1;
          let image = that.data.openenImg;
          // 处理starContent
          let starContent2String = JSON.stringify(starContent);
          let Cotentlength = starContent2String.length / 2;
          let description = starContent2String.substring(0, Cotentlength) + '......';
          rightItems.push({
            replyID: replyID,
            replySay: replySay,
            starID: starID,
            starContent: starContent,
            starHostName: starHostName,
            choose: choose,
            image: image,
            title: 'Other信件',
            description: description
          });
        }
        that.setData({
          items: rightItems,
        }, function () {
          // data设置完成后才进行回调函数
          callback && callback();
        })
      }
    })
  },

  // 生成随机的用户 ID
  generateUserId: function () {
    // 这里使用简单的时间戳 + 随机数作为示例，实际情况中应该使用更复杂的方式生成随机 ID
    let timestamp = new Date().getTime();
    let timestampStr = timestamp.toString();
    let timestampShort = timestampStr.substring(0, 5);
    let random = Math.floor(Math.random() * 10000);
    return 'cat_' + timestampShort + '_' + random;
  },

  // 加载默认图像
  imageOnloadError(e) {
    console.log("加载默认图")
    console.log(e)
    var img = 'http://175.178.90.196:7778/photo/head.jpg' //图片加载失败时展示的默认图
    this.setData({
      imgurl: img
    })
  },

  // 我的冥想btn点击事件
  handlemingBtnTap: function () {
    console.log("跳转到我的冥想页面")
  },

  // 点击选择头像
  avatarEvent: function () {
    this.setData({
      modalHidden: true,
    })
  },

  // cancelbtn 
  cancelBtnEvent: function () {
    this.setData({
      modalHidden: false,
    })
  },

  // 选择
  onOptionClick: function (e) {
    const index = e.currentTarget.dataset.index;
    const imageUrls = this.data.imageUrls;
    if (index !== this.data.selectedIndex) {
      if (this.data.selectedIndex !== -1) {
        imageUrls[this.data.selectedIndex].checked = false;
      }
      imageUrls[index].checked = true;
      this.setData({
        imageUrls: imageUrls,
        selectedIndex: index,
        nowShotIndex: index,
      });
    }
  },

  // confirmbtn图像确定
  onConfirmBtnClick: function () {
    if (this.data.selectedIndex !== -1) {
      const selected = this.data.selectedIndex;
      let selectoption = this.data.imageUrls[selected].avatarUrl;
      this.setData({
        avatarUrl: selectoption,
        modalHidden: false,
      })
      // 更新数据库的头像
      let userID = this.data.UserId;
      let nowshotIndex = this.data.nowShotIndex;
      wx.request({
        url: 'http://175.178.90.196:7777/ChangeHeadshot?userID=' + userID + '&newHeadshot=' + nowshotIndex,
        success: (res) => {
          if (res.data.code === 0) {
            console.log("图片更新成功");
          } else {
            console.log("图片更新失败");
          }
        }
      })
    } else {
      wx.showToast({
        title: '请选择一个头像哦~',
        icon: 'none'
      });
    }
  },

  // 写下的信 点击事件
  handleBtn1Tap: function () {
    this.ViewMyReply();
  },

  // 为ta解忧点击事件
  handleBtn2Tap: function () {
    // 更新条目数据
    this.ViewReplyToOthers();
  },

  // 条目点击事件
  handleItemClick: function (event) {
    // 条目点击事件处理逻辑
    // 可以通过 event.currentTarget.dataset 获取当前点击的条目数据
    var index = event.currentTarget.dataset.index;
    var choose = this.data.items[index].choose;
    var starContent = this.data.items[index].starContent;
    var starID = this.data.items[index].starID;
    // 进行相应的处理
    // 写下的信
    if (choose === 0) {
      let replys = this.data.items[index].replys;
      wx.navigateTo({
        url: '/pages/4-2write/write?starContent=' + starContent + '&replys=' + replys + '&starID=' + starID,
      });
      let newInfo = this.data.newInfo > 0? this.data.newInfo - 1 : 0;
      this.setData({
        newInfo : newInfo,
      });
    } else { // 为Ta解忧
      let replyID = this.data.items[index].replyID;
      let replySay = this.data.items[index].replySay;
      let starHostName = this.data.items[index].starHostName;
      wx.navigateTo({
        url: '/pages/4-1forothers/forothers?starContent=' + starContent + '&replySay=' + replySay + '&starID=' + starID + '&replyID=' + replyID + '&starHostName=' + starHostName,
      });
    }
  },

  handleScrollToLower: function () {
    // 滚动到底部事件处理逻辑
    console.log("滚动到底部");
  },

  StarLandfall: function (starID, UserID) {
    wx.request({
      url: 'http://175.178.90.196:7777/StarLandfall?starID=' + starID + '&userID=' + UserID,
      success: (res) => {
        console.log(res.data);
        if (res.data.code === 0) {
          console.log('删除信件成功！');
        } else {
          console.log('删除信件失败!');
        }
      }
    })
  },

  // 删除信件事件
  LongPressed: function (e) {
    wx.showActionSheet({
      itemList: ['删除'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 获取点击的item的index
          var index = e.currentTarget.dataset.index;
          var choose = this.data.items[index].choose;
          // 删除
          if (choose === 0) {
            let starID = this.data.items[index].starID;
            let UserId = this.data.UserId;
            console.log(starID, 'starID');
            console.log(UserId, 'userid');
            this.StarLandfall(starID, UserId);
            this.data.items.splice(index, 1);
            this.setData({
              items: this.data.items
            });
          } else {
            wx.showToast({
              title: '不可以删除其他人的信件哦~',
              icon: 'none',
            })
          }
        }
      },
      fail: (res) => {
        console.log(res.errMsg);
      }
    })
  },

  // 更改昵称
  ChangeName: function (userID, newName) {
    wx.request({
      url: 'http://175.178.90.196:7777/ChangeName?userID=' + userID + '&userName=' + newName,

      success: (res) => {
        if (res.data.code === 0) {
          console.log('修改昵称成功！');
        } else {
          console.log('修改昵称失败！');
        }
      }
    })
  },

  ChangeNickName: function () {
    var that = this;
    wx.showModal({
      title: '新的昵称',
      content: '',
      confirmText: '确定',
      cancelText: '取消',
      showCancel: true,
      editable: true,
      success: function (res) {
        if (res.confirm) {
          if (res.content.trim() === '') {
            wx.showToast({
              title: '昵称不可以为空哦~',
              icon: 'none',
            })
          } else {
            // UI界面改变昵称
            that.setData({
              NickName: res.content
            });
            // 数据库层面改变
            let userID = that.data.UserId;
            let newName = res.content;
            that.ChangeName(userID, newName);
          }
        }
      },
      fail: function (res) {
        console.log('fail', res);
      }
    })
  },

  // 红点移动事件
  onRedCircleTouchMove: function() {
    this.setData({
      newInfo: 0
    });
  },

  getMingData : function(){
    var that = this;
    wx.request({
      url: 'http://175.178.90.196:7779/medRequest/totalRecords?openId=test',

      success : (res)=>{
        that.setData({
          totalTime : res.data.totalTime,
          totalCount : res.data.totalCount,
          todayTime : res.data.todayTime,
        })
      }
    })
  }
})