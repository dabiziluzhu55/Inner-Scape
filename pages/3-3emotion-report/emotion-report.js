// pages/motion-report/motion-report.js
import * as echarts from '../../components/ec-canvas/echarts'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },
    dateString: "",// 当前日期的string形式
    spot: ['2023/4/29','2023/4/30'],// 特殊标识的日期
    nowDate : '',// 当前日期
    MoodsRecord : 0,// 共记录心情
    MoodsGenerated : 0,// 共产生心情
    MostMood : '开心',// 产生最多心情
    MostMoodIcon : 'icon_happy',// 产生最多心情对应的icon
    Positive : '38.6',// 正面情绪占比
    Negative : '18.2', // 负面情绪占比
    Normal : '18.2', // 中性程序占比
    moodList : [{
      icon: "icon_happy",
      name: "开心",
      count : 1,
    },
    {
      icon: "icon_excited",
      name: "兴奋",
      count : 2,
    },
    {
      icon: "icon_disappointed",
      name: "失望",
      count : 3,
    },
    {
      icon: "icon_angry",
      name: "生气",
      count : 4,
    },
    {
      icon: "icon_embarrassed",
      name: "尴尬",
      count : 5,
    },
    {
      icon: "icon_sad",
      name: "难过",
      count : 6,
    },
    {
      icon: "icon_grievance",
      name: "委屈",
      count : 7,
    },
    {
      icon: "icon_lonely",
      name: "孤独",
      count : 8,
    },
    {
      icon: "icon_dysphoria",
      name: "烦躁",
      count : 9,
    },
    {
      icon: "icon_nervous",
      name: "紧张",
      count : 10,
    },
    {
      icon: "icon_calm",
      name: "平静",
      count : 11,
    },
    {
      icon: "icon_bored",
      name: "无聊",
      count : 12,
    },
    {
      icon: "icon_helpless",
      name: "无奈",
      count : 13,
    },
    {
      icon: "icon_mourning",
      name: "丧",
      count : 4,
    },
    {
      icon: "icon_other",
      name: "其他",
      count : 15,
    },
    ],
    reasonsList : [
      {text : '假期',
        count : 4, // 次数
      },
      {text : '游戏',
        count : 1, // 次数
      },
      {text : '玩玩玩',
        count : 2, // 次数
      },
      {text : '想玩的嘞',
        count : 2, // 次数
      },
      {text : '假期',
        count : 4, // 次数
      },
      {text : '游戏',
        count : 1, // 次数
      },
      {text : '玩玩玩',
        count : 2, // 次数
      },
      {text : '想玩的嘞',
        count : 2, // 次数
      },
      {text : '想玩的嘞',
        count : 2, // 次数
      },
    ],
    activeReportType: 'month',
  },

  onLoad: function () {
    let nowDate = new Date().toLocaleDateString();
    this.setData({
      nowDate : nowDate,
    })
    // 初始化echarts图表
    this.initChart();
  },
  onMonthReportTap: function() {
    this.setData({
      activeReportType: 'month',
      activeReportContent: '这里是月报的内容。'
    });
  },

  onWeekReportTap: function() {
    this.setData({
      activeReportType: 'week',
      activeReportContent: '这里是周报的内容。'
    });
  },

  // 初始化图表
  initChart: function () {
    // 使用组件方式初始化图表
    this.selectComponent('#mychart').init((canvas, width, height) => {
      // 初始化echarts实例
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      // 设置数据
      const data = [
        { day: '1', value: 0 },
        { day: '2', value: 1 },
        { day: '3', value: 2 },
        { day: '4', value: 1.4 },
        // 更多数据...
      ];

      // 配置图表选项
      const option = {
        xAxis: {
          type: 'category',
          data: data.map(item => item.day),
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 2,
          interval: 1,
          axisLabel: {
            formatter: function (value) {
              switch (value) {
                case 0:
                  return '负面';
                case 1:
                  return '中性';
                case 2:
                  return '正面';
              }
            }
          }
        },
        series: [{
          type: 'line',
          data: data.map(item => item.value),
          smooth: true
        }],
        lineStyle: {
          color: '#000000'
        },
 
      };

      // 使用刚指定的配置项和数据显示图表
      chart.setOption(option);

      // 将图表实例绑定到页面的data中，以便后续调用
      this.chart = chart;

      // 手动触发图表的resize事件，使得图表能够自适应大小
      setTimeout(function () {
        chart.resize();
      }, 100);
    });
  },
  dateChange(e) {
    this.setData({
      dateString: e.detail.dateString
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})